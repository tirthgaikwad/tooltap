const fs = require('fs');
const path = require('path');

const CATEGORIES = [
  'General AI Assistants',
  'Coding and Software Development',
  'App and Website Builders',
  'Image Generation',
  'Image Editing and Enhancement',
  'Video Generation',
  'Video Editing and Repurposing',
  'Voice and Text to Speech',
  'Audio, Music, and Podcasting',
  'Writing and Copywriting',
  'Research, Search, and Knowledge',
  'PDF and Document AI',
  'Presentations and Slides',
  'Meetings, Notes, and Productivity',
  'Marketing, SEO, and Social Media',
  'Sales and Customer Support',
  'Automation and AI Agents',
  'Data Science and Analytics',
  'Machine Learning Platforms and APIs',
  'Open Source Models and Local AI',
  'Design, UI, and Branding',
  '3D, Architecture, and Games',
  'Education and Learning',
  'Recruitment, Resume, and Career',
  'Business, Legal, and Finance',
];

function normalizeSlug(value) {
  return (value || '')
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function generate() {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || process.env.VITE_SITE_URL || 'https://tooltap.vercel.app').replace(/\/+$/, '');
  const now = new Date().toISOString().split('T')[0];

  // Static Pages
  const staticPages = [
    { loc: `${siteUrl}/`, changefreq: 'weekly', priority: '1.0' },
    { loc: `${siteUrl}/categories`, changefreq: 'weekly', priority: '0.9' },
    { loc: `${siteUrl}/compare`, changefreq: 'weekly', priority: '0.8' },
    { loc: `${siteUrl}/collections`, changefreq: 'weekly', priority: '0.8' },
    { loc: `${siteUrl}/about`, changefreq: 'weekly', priority: '0.8' },
    { loc: `${siteUrl}/privacy`, changefreq: 'weekly', priority: '0.8' },
    { loc: `${siteUrl}/terms`, changefreq: 'weekly', priority: '0.8' },
    { loc: `${siteUrl}/documentation`, changefreq: 'weekly', priority: '0.8' },
    { loc: `${siteUrl}/how-to-use`, changefreq: 'weekly', priority: '0.8' },
  ];

  // Category Pages (25 categories)
  const categoryPages = CATEGORIES.map((cat) => ({
    loc: `${siteUrl}/category/${normalizeSlug(cat)}`,
    changefreq: 'weekly',
    priority: '0.9',
  }));

  // Tool Pages (500+ verified tools)
  const toolsJsonPath = path.resolve(__dirname, '../src/data/tools.json');
  const tools = JSON.parse(fs.readFileSync(toolsJsonPath, 'utf8'));
  const toolPages = tools.map((t) => ({
    loc: `${siteUrl}/tool/${normalizeSlug(t.name)}`,
    changefreq: 'monthly',
    priority: '0.7',
  }));

  const allUrls = [...staticPages, ...categoryPages, ...toolPages];

  const xmlEntries = allUrls
    .map(
      (item) => `  <url>
    <loc>${item.loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
    )
    .join('\n');

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>
`;

  const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /dashboard
Disallow: /api/
Disallow: /saved-tools
Disallow: /saved
Disallow: /bookmarks

Sitemap: ${siteUrl}/sitemap.xml
`;

  const publicDir = path.resolve(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf8');
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt, 'utf8');

  console.log(`Generated public/sitemap.xml with ${allUrls.length} URLs.`);
  console.log('Generated public/robots.txt successfully.');
}

generate();

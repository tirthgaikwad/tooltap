import { lazy, Suspense } from 'react';
import type { ReactNode } from 'react';
import ErrorBoundary from '@/components/common/ErrorBoundary';

const HomePage = lazy(() => import('./pages/HomePage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const CategoriesPage = lazy(() => import('./pages/CategoriesPage'));
const CategoryDetailPage = lazy(() => import('./pages/CategoryDetailPage'));
const ComparePage = lazy(() => import('./pages/ComparePage'));
const BookmarksPage = lazy(() => import('./pages/BookmarksPage'));
const CollectionsPage = lazy(() => import('./pages/CollectionsPage'));
const HowToUsePage = lazy(() => import('./pages/HowToUsePage'));
const DocumentationPage = lazy(() => import('./pages/DocumentationPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ToolDetailPage = lazy(() => import('./pages/ToolDetailPage'));

export interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
  public?: boolean;
}

const wrap = (el: ReactNode) => (
  <ErrorBoundary>
    <Suspense fallback={<div className="min-h-screen bg-background" />}>{el}</Suspense>
  </ErrorBoundary>
);

export const routes: RouteConfig[] = [
  { name: 'Home', path: '/', element: wrap(<HomePage />), public: true },
  { name: 'Search', path: '/search', element: wrap(<SearchPage />), public: true },
  { name: 'Categories', path: '/categories', element: wrap(<CategoriesPage />), public: true },
  { name: 'Category', path: '/categories/:slug', element: wrap(<CategoryDetailPage />), public: true },
  { name: 'CategoryAlt', path: '/categories/detail/:categorySlug', element: wrap(<CategoryDetailPage />), public: true },
  { name: 'Collections', path: '/collections', element: wrap(<CollectionsPage />), public: true },
  { name: 'HowToUse', path: '/how-to-use', element: wrap(<HowToUsePage />), public: true },
  { name: 'Documentation', path: '/docs', element: wrap(<DocumentationPage />), public: true },
  { name: 'Compare', path: '/compare', element: wrap(<ComparePage />), public: true },
  { name: 'Bookmarks', path: '/bookmarks', element: wrap(<BookmarksPage />), public: true },
  { name: 'About', path: '/about', element: wrap(<AboutPage />), public: true },
  { name: 'ToolDetail', path: '/tool/:toolSlug', element: wrap(<ToolDetailPage />), public: true },
];

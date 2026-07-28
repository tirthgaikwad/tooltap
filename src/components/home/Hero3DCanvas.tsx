import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Hero3DCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check device capabilities & reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 600;
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 10);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile, // Disable MSAA on mobile for max GPU speed
      powerPreference: 'high-performance',
      precision: isMobile ? 'mediump' : 'highp',
    });
    renderer.setSize(width, height);
    // Cap pixel ratio to 1.5 on desktop, 1.0 on mobile to avoid high DPI shading bottlenecks
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.0 : 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0x121216, 2.2);
    scene.add(ambientLight);

    const amberLight = new THREE.PointLight(0xF2994A, 4.5, 30);
    amberLight.position.set(5, 5, 5);
    scene.add(amberLight);

    const orangeLight = new THREE.PointLight(0xE05A47, 3.5, 30);
    orangeLight.position.set(-5, -5, 3);
    scene.add(orangeLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.7);
    rimLight.position.set(0, 10, 5);
    scene.add(rimLight);

    // 5. Hero 3D Objects Group
    const group = new THREE.Group();
    scene.add(group);

    // Optimized Torus Knot Geometry
    const torusKnotGeo = new THREE.TorusKnotGeometry(2.0, 0.52, 72, 14);

    // Wireframe Outer Mesh
    const torusWireMaterial = new THREE.MeshStandardMaterial({
      color: 0xF2994A,
      emissive: 0xF2994A,
      emissiveIntensity: 0.45,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
      roughness: 0.2,
      metalness: 0.8,
    });

    const torusWireMesh = new THREE.Mesh(torusKnotGeo, torusWireMaterial);
    group.add(torusWireMesh);

    // Fast, ultra-smooth Glassmorphic inner mesh using MeshStandardMaterial
    // (Avoids physical transmission passes which cause major frame drops/lag)
    const torusInnerMaterial = new THREE.MeshStandardMaterial({
      color: 0x1E1E24,
      emissive: 0xE05A47,
      emissiveIntensity: 0.3,
      roughness: 0.25,
      metalness: 0.5,
      transparent: true,
      opacity: 0.65,
    });

    const torusInnerMesh = new THREE.Mesh(torusKnotGeo, torusInnerMaterial);
    torusInnerMesh.scale.set(0.98, 0.98, 0.98);
    group.add(torusInnerMesh);

    // Floating secondary shapes (Icosahedrons / Octahedrons)
    const floatingObjects: { mesh: THREE.Mesh; rotSpeedX: number; rotSpeedY: number; floatOffset: number }[] = [];
    const shapeGeo1 = new THREE.IcosahedronGeometry(0.5, 0);
    const shapeGeo2 = new THREE.OctahedronGeometry(0.6, 0);

    const amberMat = new THREE.MeshStandardMaterial({
      color: 0xF2994A,
      emissive: 0xF2994A,
      emissiveIntensity: 0.3,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });

    const orangeMat = new THREE.MeshStandardMaterial({
      color: 0xE05A47,
      emissive: 0xE05A47,
      emissiveIntensity: 0.3,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });

    const positions = [
      { x: -5.5, y: 2.5, z: -2, geo: shapeGeo1, mat: amberMat },
      { x: 5.8, y: -2.2, z: -1, geo: shapeGeo2, mat: orangeMat },
      { x: -4.8, y: -3.0, z: -3, geo: shapeGeo2, mat: orangeMat },
      { x: 5.2, y: 3.2, z: -2, geo: shapeGeo1, mat: amberMat },
      { x: 0, y: 3.8, z: -4, geo: shapeGeo1, mat: amberMat },
    ];

    positions.forEach((pos, idx) => {
      const mesh = new THREE.Mesh(pos.geo, pos.mat);
      mesh.position.set(pos.x, pos.y, pos.z);
      group.add(mesh);
      floatingObjects.push({
        mesh,
        rotSpeedX: (Math.random() - 0.5) * 0.015,
        rotSpeedY: (Math.random() - 0.5) * 0.015,
        floatOffset: idx * 1.2,
      });
    });

    // Ambient floating particles
    const particleCount = isMobile ? 60 : 140;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colorAmber = new THREE.Color(0xF2994A);
    const colorOrange = new THREE.Color(0xE05A47);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 24;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 16;

      const mixColor = Math.random() > 0.4 ? colorAmber : colorOrange;
      particleColors[i * 3] = mixColor.r;
      particleColors[i * 3 + 1] = mixColor.g;
      particleColors[i * 3 + 2] = mixColor.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: isMobile ? 0.06 : 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Smooth lerp mouse tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      if (isMobile || prefersReducedMotion) return;
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      targetMouseX = x * 2;
      targetMouseY = y * 2;
    };

    if (!isMobile && !prefersReducedMotion) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || window.innerWidth;
      const newH = container.clientHeight || 600;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.0 : 1.5));
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Render loop state & IntersectionObserver for auto-pause when scrolled offscreen
    let animationFrameId: number | null = null;
    let isVisible = true;
    const clock = new THREE.Clock();

    const animate = () => {
      if (!isVisible) return;

      if (prefersReducedMotion) {
        renderer.render(scene, camera);
        return;
      }

      const delta = Math.min(clock.getDelta(), 0.1); // Clamp delta to prevent huge jumps after tab switches
      const elapsedTime = clock.getElapsedTime();

      // Exponential smooth lerp for ultra-smooth cursor interaction
      const lerpFactor = 1 - Math.exp(-10 * delta);
      currentMouseX += (targetMouseX - currentMouseX) * lerpFactor;
      currentMouseY += (targetMouseY - currentMouseY) * lerpFactor;

      // Smooth rotation with frame-rate independent delta
      group.rotation.x = elapsedTime * (isMobile ? 0.08 : 0.12) + currentMouseY * 0.25;
      group.rotation.y = elapsedTime * (isMobile ? 0.1 : 0.16) + currentMouseX * 0.35;

      // Camera slight tilt offset
      camera.position.x = currentMouseX * 0.8;
      camera.position.y = -currentMouseY * 0.8;
      camera.lookAt(scene.position);

      // Particle system subtle rotation
      particleSystem.rotation.y = elapsedTime * 0.025;
      particleSystem.rotation.x = elapsedTime * 0.015;

      // Animate secondary floating shapes
      floatingObjects.forEach((obj) => {
        obj.mesh.rotation.x += obj.rotSpeedX * delta * 60;
        obj.mesh.rotation.y += obj.rotSpeedY * delta * 60;
        obj.mesh.position.y += Math.sin(elapsedTime * 1.5 + obj.floatOffset) * 0.0025;
      });

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    // Pause rendering when canvas is not visible to save 100% GPU resources when user scrolls
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            clock.start();
            if (!animationFrameId) {
              animate();
            }
          } else {
            if (animationFrameId) {
              cancelAnimationFrame(animationFrameId);
              animationFrameId = null;
            }
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(container);

    // Initial trigger
    animate();

    // Cleanup
    return () => {
      observer.disconnect();
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      // Dispose 3D geometries and materials
      torusKnotGeo.dispose();
      torusWireMaterial.dispose();
      torusInnerMaterial.dispose();
      shapeGeo1.dispose();
      shapeGeo2.dispose();
      amberMat.dispose();
      orangeMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-85"
      style={{ touchAction: 'none' }}
    />
  );
}

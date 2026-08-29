"use client";

import { useEffect, useRef, type KeyboardEvent, type PointerEvent } from "react";
import * as THREE from "three";
import styles from "./InteractiveGlobe.module.css";

const NORTHEAST = { latitude: 24.817, longitude: 93.9368 };
const HALF_PI = Math.PI / 2;
const Y_AXIS = new THREE.Vector3(0, 1, 0);
const X_AXIS = new THREE.Vector3(1, 0, 0);
const FRONT = new THREE.Vector3(0, 0, 1);

const clamp = (value: number, minimum: number, maximum: number) => Math.min(maximum, Math.max(minimum, value));

function pointOnEarth(latitude: number, longitude: number, radius = 1) {
  const latitudeRadians = THREE.MathUtils.degToRad(latitude);
  const longitudeRadians = THREE.MathUtils.degToRad(longitude);

  return new THREE.Vector3(
    Math.cos(latitudeRadians) * Math.cos(longitudeRadians) * radius,
    Math.sin(latitudeRadians) * radius,
    -Math.cos(latitudeRadians) * Math.sin(longitudeRadians) * radius,
  );
}

function createMarkerTexture() {
  const marker = document.createElement("canvas");
  marker.width = 128;
  marker.height = 128;
  const context = marker.getContext("2d");
  if (!context) return null;

  const glow = context.createRadialGradient(64, 64, 4, 64, 64, 55);
  glow.addColorStop(0, "rgba(232, 255, 152, 1)");
  glow.addColorStop(0.16, "rgba(214, 255, 63, .98)");
  glow.addColorStop(0.4, "rgba(214, 255, 63, .32)");
  glow.addColorStop(1, "rgba(214, 255, 63, 0)");
  context.fillStyle = glow;
  context.fillRect(0, 0, 128, 128);
  context.beginPath();
  context.arc(64, 64, 15, 0, Math.PI * 2);
  context.strokeStyle = "rgba(246, 255, 219, .95)";
  context.lineWidth = 3;
  context.stroke();
  context.beginPath();
  context.arc(64, 64, 5, 0, Math.PI * 2);
  context.fillStyle = "#d6ff3f";
  context.fill();

  const texture = new THREE.CanvasTexture(marker);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function InteractiveGlobe() {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const yawRef = useRef(0);
  const pitchRef = useRef(0);
  const targetYawRef = useRef(0);
  const targetPitchRef = useRef(0);
  const draggingRef = useRef(false);
  const pointerRef = useRef({ id: -1, x: 0, y: 0, yaw: 0, pitch: 0 });

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.z = 3.65;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.96;
    renderer.setClearColor(0x000000, 0);

    const earthGroup = new THREE.Group();
    scene.add(earthGroup);

    const earthGeometry = new THREE.SphereGeometry(1, 96, 64);
    const earthMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.84,
      metalness: 0.02,
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    earthGroup.add(earth);

    const atmosphereGeometry = new THREE.SphereGeometry(1.075, 72, 48);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      depthWrite: false,
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float rim = pow(max(0.0, 0.72 - dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.35);
          vec3 atmosphere = mix(vec3(0.20, 0.56, 0.78), vec3(0.33, 0.88, 0.75), 0.25);
          gl_FragColor = vec4(atmosphere, rim * 0.72);
        }
      `,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    earthGroup.add(atmosphere);

    const markerTexture = createMarkerTexture();
    const markerMaterial = new THREE.SpriteMaterial({
      map: markerTexture ?? undefined,
      color: 0xffffff,
      transparent: true,
      depthTest: true,
      depthWrite: false,
      toneMapped: false,
    });
    const marker = new THREE.Sprite(markerMaterial);
    marker.position.copy(pointOnEarth(NORTHEAST.latitude, NORTHEAST.longitude, 1.025));
    marker.scale.setScalar(0.16);
    earthGroup.add(marker);

    scene.add(new THREE.HemisphereLight(0xcfeaff, 0x06100d, 1.28));
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.25);
    keyLight.position.set(-3.5, 2.7, 4.5);
    scene.add(keyLight);
    const jadeFill = new THREE.DirectionalLight(0x53e0be, 0.42);
    jadeFill.position.set(3, -1.6, 2);
    scene.add(jadeFill);

    const home = new THREE.Quaternion().setFromUnitVectors(
      pointOnEarth(NORTHEAST.latitude, NORTHEAST.longitude).normalize(),
      FRONT,
    );

    const yaw = new THREE.Quaternion();
    const pitch = new THREE.Quaternion();
    const orientation = new THREE.Quaternion();
    let frame = 0;
    let cancelled = false;
    let lastFrame = performance.now();
    let drawnYaw = Number.NaN;
    let drawnPitch = Number.NaN;
    let forceRender = true;

    const applyOrientation = () => {
      yaw.setFromAxisAngle(Y_AXIS, yawRef.current);
      pitch.setFromAxisAngle(X_AXIS, pitchRef.current);
      orientation.copy(pitch).multiply(yaw).multiply(home);
      earthGroup.quaternion.copy(orientation);
    };

    const resize = () => {
      const size = Math.max(1, Math.round(host.getBoundingClientRect().width));
      const pixelRatio = Math.min(window.devicePixelRatio || 1, size < 420 ? 1.5 : 2);
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(size, size, false);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
      forceRender = true;
    };

    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();
    applyOrientation();

    const earthTextureUrl = host.getBoundingClientRect().width < 420
      ? "/earth-blue-marble-mobile.webp"
      : "/earth-blue-marble.webp";
    const earthTexture = new THREE.TextureLoader().load(
      earthTextureUrl,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
        earthMaterial.map = texture;
        earthMaterial.bumpMap = texture;
        earthMaterial.bumpScale = 0.012;
        earthMaterial.needsUpdate = true;
        forceRender = true;
        canvas.classList.add(styles.ready);
      },
      undefined,
      () => canvas.classList.add(styles.ready),
    );
    earthTexture.colorSpace = THREE.SRGBColorSpace;

    const render = (now: number) => {
      const elapsed = Math.min(48, now - lastFrame);
      lastFrame = now;
      const easing = 1 - Math.pow(0.0008, elapsed / 1000);
      if (!draggingRef.current) {
        yawRef.current += (targetYawRef.current - yawRef.current) * easing;
        pitchRef.current += (targetPitchRef.current - pitchRef.current) * easing;
      }

      const moved = Math.abs(drawnYaw - yawRef.current) > 0.00001 || Math.abs(drawnPitch - pitchRef.current) > 0.00001;
      if (moved || forceRender) {
        applyOrientation();
        renderer.render(scene, camera);
        drawnYaw = yawRef.current;
        drawnPitch = pitchRef.current;
        forceRender = false;
      }

      if (!cancelled) frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.classList.remove(styles.ready);
      earthTexture.dispose();
      markerTexture?.dispose();
      markerMaterial.dispose();
      earthGeometry.dispose();
      earthMaterial.dispose();
      atmosphereGeometry.dispose();
      atmosphereMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  const beginDrag = (event: PointerEvent<HTMLCanvasElement>) => {
    draggingRef.current = true;
    pointerRef.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      yaw: yawRef.current,
      pitch: pitchRef.current,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const drag = (event: PointerEvent<HTMLCanvasElement>) => {
    const pointer = pointerRef.current;
    if (!draggingRef.current || pointer.id !== event.pointerId) return;
    const nextYaw = pointer.yaw + (event.clientX - pointer.x) * 0.007;
    const nextPitch = clamp(pointer.pitch + (event.clientY - pointer.y) * 0.006, -HALF_PI + 0.3, HALF_PI - 0.3);
    yawRef.current = targetYawRef.current = nextYaw;
    pitchRef.current = targetPitchRef.current = nextPitch;
  };

  const endDrag = (event: PointerEvent<HTMLCanvasElement>) => {
    if (pointerRef.current.id !== event.pointerId) return;
    draggingRef.current = false;
    pointerRef.current.id = -1;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const rotateWithKeyboard = (event: KeyboardEvent<HTMLCanvasElement>) => {
    const step = event.shiftKey ? 0.22 : 0.09;
    let handled = true;
    if (event.key === "ArrowLeft") targetYawRef.current -= step;
    else if (event.key === "ArrowRight") targetYawRef.current += step;
    else if (event.key === "ArrowUp") targetPitchRef.current = clamp(targetPitchRef.current - step, -HALF_PI + 0.3, HALF_PI - 0.3);
    else if (event.key === "ArrowDown") targetPitchRef.current = clamp(targetPitchRef.current + step, -HALF_PI + 0.3, HALF_PI - 0.3);
    else if (event.key === "Home") recenter();
    else handled = false;
    if (handled) event.preventDefault();
  };

  const recenter = () => {
    targetYawRef.current = 0;
    targetPitchRef.current = 0;
  };

  return (
    <div className={styles.shell} role="group" aria-label="Interactive Earth centered on Northeast India">
      <div className={styles.halo} aria-hidden="true" />
      <div className={styles.globe} ref={hostRef}>
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          aria-label="Realistic Earth with Northeast India marked. Use the arrow keys to rotate and Home to recenter. NASA/GSFC Blue Marble imagery."
          onPointerDown={beginDrag}
          onPointerMove={drag}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={rotateWithKeyboard}
          tabIndex={0}
        />
      </div>
      <div className={styles.location} aria-hidden="true"><i /> Northeast India <span>24.8170° N · 93.9368° E</span></div>
      <button className={styles.recenter} type="button" onClick={recenter} aria-label="Recenter Earth on Northeast India">
        <i aria-hidden="true" /> Recenter NE
      </button>
    </div>
  );
}

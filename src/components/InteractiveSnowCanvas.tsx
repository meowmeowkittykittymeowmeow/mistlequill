import { useEffect, useRef } from 'react';

interface InteractiveSnowCanvasProps {
  enabled: boolean;
  density: 'gentle' | 'rich';
}

interface Snowflake {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  wobblePhase: number;
  wobbleSpeed: number;
  isCrystal: boolean;
  rotation: number;
  rotSpeed: number;
  tint: string;
}

export function InteractiveSnowCanvas({ enabled, density }: InteractiveSnowCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef({ x: -9999, y: -9999, vx: 0, vy: 0, active: false });

  useEffect(() => {
    if (!enabled) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    // Soft cool winter-silver & slate-blue tints so flakes are clearly visible on warm cream paper
    const tints = [
      'rgba(182, 200, 216, 0.92)',
      'rgba(160, 182, 202, 0.86)',
      'rgba(210, 222, 232, 0.95)',
      'rgba(192, 186, 174, 0.78)',
    ];

    const createFlake = (randomY = false): Snowflake => {
      const layer = Math.random();
      const radius = layer < 0.45 ? 2.2 + Math.random() * 1.6 : 3.4 + Math.random() * 2.6;
      return {
        x: Math.random() * width,
        y: randomY ? Math.random() * height : -15 - Math.random() * 60,
        vx: (Math.random() - 0.5) * 0.14,
        // Slow, calm meditative drift for low visual distraction
        vy: 0.22 + layer * 0.34,
        radius,
        opacity: 0.52 + layer * 0.34,
        wobblePhase: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.005 + Math.random() * 0.008,
        isCrystal: radius > 3.6 && Math.random() > 0.4,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.005,
        tint: tints[Math.floor(Math.random() * tints.length)],
      };
    };

    // More visible flakes while keeping speed slow and calm
    const targetCount = density === 'rich' ? 110 : 58;
    const flakes: Snowflake[] = Array.from({ length: targetCount }, () => createFlake(true));

    let lastMouseX = -9999;
    let lastMouseY = -9999;

    const handlePointerMove = (e: PointerEvent) => {
      if (lastMouseX === -9999) {
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
      }
      const dx = e.clientX - lastMouseX;
      const dy = e.clientY - lastMouseY;
      pointerRef.current.x = e.clientX;
      pointerRef.current.y = e.clientY;
      pointerRef.current.vx = Math.max(-8, Math.min(8, dx * 0.2));
      pointerRef.current.vy = Math.max(-8, Math.min(8, dy * 0.2));
      pointerRef.current.active = true;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    let animId = 0;

    const drawCrystal = (f: Snowflake) => {
      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.rotate(f.rotation);
      ctx.strokeStyle = 'rgba(130, 155, 178, 0.78)';
      ctx.fillStyle = '#FFFFFF';
      ctx.lineWidth = 1.15;
      const r = f.radius * 1.25;
      ctx.beginPath();
      for (let i = 0; i < 3; i++) {
        const angle = (i * Math.PI) / 3;
        const cos = Math.cos(angle) * r;
        const sin = Math.sin(angle) * r;
        ctx.moveTo(-cos, -sin);
        ctx.lineTo(cos, sin);
      }
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, f.radius * 0.34, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      pointerRef.current.vx *= 0.92;
      pointerRef.current.vy *= 0.92;

      const px = pointerRef.current.x;
      const py = pointerRef.current.y;
      const pvx = pointerRef.current.vx;
      const pvy = pointerRef.current.vy;

      for (let i = 0; i < flakes.length; i++) {
        const f = flakes[i];
        f.wobblePhase += f.wobbleSpeed;
        f.rotation += f.rotSpeed;

        if (pointerRef.current.active) {
          const dx = f.x - px;
          const dy = f.y - py;
          const distSq = dx * dx + dy * dy;
          const influenceRadius = 110;
          if (distSq < influenceRadius * influenceRadius && distSq > 1) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / influenceRadius) * 0.22;
            f.vx += (dx / dist) * force * 0.25 + pvx * force * 0.04;
            f.vy += (dy / dist) * force * 0.15 + pvy * force * 0.03;
          }
        }

        f.vx *= 0.97;
        const naturalVy = 0.24 + (f.radius / 6) * 0.3;
        f.vy += (naturalVy - f.vy) * 0.03;

        f.x += f.vx + Math.sin(f.wobblePhase) * 0.22;
        f.y += f.vy;

        if (f.y > height + 16) {
          f.y = -12;
          f.x = Math.random() * width;
          f.vx = (Math.random() - 0.5) * 0.14;
        }
        if (f.x > width + 16) f.x = -12;
        if (f.x < -16) f.x = width + 12;

        ctx.globalAlpha = f.opacity;
        if (f.isCrystal) {
          drawCrystal(f);
        } else {
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
          ctx.fillStyle = f.tint;
          ctx.shadowColor = 'rgba(110, 132, 154, 0.45)';
          ctx.shadowBlur = 4;
          ctx.fill();
          ctx.shadowBlur = 0;
          // Crisp bright center highlight
          ctx.beginPath();
          ctx.arc(f.x - f.radius * 0.2, f.y - f.radius * 0.2, f.radius * 0.45, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, [enabled, density]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-40"
    />
  );
}

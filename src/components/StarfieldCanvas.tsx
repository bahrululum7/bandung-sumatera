import React, { useEffect, useRef } from 'react';

interface StarfieldCanvasProps {
  scrollProgress: number; // 0 to 1
}

interface Star {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  active: boolean;
}

export const StarfieldCanvas: React.FC<StarfieldCanvasProps> = ({ scrollProgress }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      initStars();
    };

    window.addEventListener('resize', handleResize);

    // Star generation
    const starCount = 140;
    let stars: Star[] = [];

    const starColors = [
      'rgba(240, 244, 255, ',
      'rgba(215, 228, 255, ',
      'rgba(255, 235, 210, ',
      'rgba(254, 215, 226, ',
    ];

    const initStars = () => {
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.8 + 0.6,
          baseAlpha: Math.random() * 0.6 + 0.25,
          twinkleSpeed: Math.random() * 0.03 + 0.01,
          twinklePhase: Math.random() * Math.PI * 2,
          color: starColors[Math.floor(Math.random() * starColors.length)],
        });
      }
    };

    initStars();

    // Shooting stars
    const shootingStars: ShootingStar[] = [];
    let lastShootingStarTime = 0;

    const spawnShootingStar = () => {
      shootingStars.push({
        x: Math.random() * width * 0.7 + width * 0.15,
        y: Math.random() * (height * 0.4),
        length: Math.random() * 80 + 50,
        speed: Math.random() * 8 + 6,
        angle: (Math.PI / 4) + (Math.random() * 0.2 - 0.1),
        alpha: 1,
        active: true,
      });
    };

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Deep celestial atmospheric gradient
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      // Night side is deeper blue/navy, morning side warms slightly at bottom
      const climaxWarmth = Math.max(0, (scrollProgress - 0.5) * 2);
      
      bgGrad.addColorStop(0, '#040711');
      bgGrad.addColorStop(0.5, '#070b18');
      bgGrad.addColorStop(1, climaxWarmth > 0.4 ? '#180f1d' : '#080d1a');

      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Subtle celestial nebulous clouds
      const nebulaGrad = ctx.createRadialGradient(
        width * 0.5, height * 0.4, 10,
        width * 0.5, height * 0.5, width * 0.6
      );
      nebulaGrad.addColorStop(0, `rgba(147, 112, 219, ${0.08 + climaxWarmth * 0.12})`);
      nebulaGrad.addColorStop(0.5, `rgba(59, 130, 246, ${0.04 + climaxWarmth * 0.05})`);
      nebulaGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = nebulaGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw subtle constellation lines between nearby stars in the upper sky
      ctx.beginPath();
      ctx.strokeStyle = `rgba(226, 232, 240, ${0.08 + scrollProgress * 0.12})`;
      ctx.lineWidth = 0.6;
      for (let i = 0; i < Math.min(stars.length, 35); i += 3) {
        const s1 = stars[i];
        const s2 = stars[(i + 1) % stars.length];
        const dist = Math.hypot(s1.x - s2.x, s1.y - s2.y);
        if (dist < 140) {
          ctx.moveTo(s1.x, s1.y);
          ctx.lineTo(s2.x, s2.y);
        }
      }
      ctx.stroke();

      // Render Stars with twinkling
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.twinklePhase += s.twinkleSpeed;
        const alpha = Math.max(0.1, s.baseAlpha + Math.sin(s.twinklePhase) * 0.35);

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `${s.color}${alpha})`;
        ctx.fill();

        // Soft halo on larger stars
        if (s.size > 1.4) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `${s.color}${alpha * 0.25})`;
          ctx.fill();
        }
      }

      // Check shooting star spawn every ~6 seconds or more frequent at climax
      if (Date.now() - lastShootingStarTime > (scrollProgress > 0.7 ? 3500 : 7000)) {
        spawnShootingStar();
        lastShootingStarTime = Date.now();
      }

      // Draw shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        if (!ss.active) continue;

        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.alpha -= 0.015;

        if (ss.alpha <= 0 || ss.x > width || ss.y > height) {
          ss.active = false;
          shootingStars.splice(i, 1);
          continue;
        }

        const tailX = ss.x - Math.cos(ss.angle) * ss.length;
        const tailY = ss.y - Math.sin(ss.angle) * ss.length;

        const starGrad = ctx.createLinearGradient(ss.x, ss.y, tailX, tailY);
        starGrad.addColorStop(0, `rgba(255, 255, 255, ${ss.alpha})`);
        starGrad.addColorStop(0.3, `rgba(254, 215, 226, ${ss.alpha * 0.8})`);
        starGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = starGrad;
        ctx.lineWidth = 1.6;
        ctx.stroke();

        // Small spark head
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${ss.alpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [scrollProgress]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

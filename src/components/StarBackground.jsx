import { useEffect, useRef } from "react";

export const StarBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse parallax target and current lerped values
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / width - 0.5) * 30;
      targetMouseY = (e.clientY / height - 0.5) * 30;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Handle high-DPI displays and resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener("resize", handleResize);

    // Star model with distinct Dark Mode & Light Mode (Grey) Color Palettes
    let stars = [];
    const initStars = () => {
      const count = Math.min(220, Math.floor((width * height) / 7500));
      stars = [];
      for (let i = 0; i < count; i++) {
        // Dark mode colors: ethereal white, soft lavender, pale cyan
        const darkColor =
          Math.random() > 0.75
            ? "rgba(167, 139, 250, "
            : Math.random() > 0.5
            ? "rgba(147, 197, 253, "
            : "rgba(255, 255, 255, ";

        // Light mode colors: sleek slate/charcoal/silver greys
        const lightColor =
          Math.random() > 0.6
            ? "rgba(71, 85, 105, " // slate-600
            : Math.random() > 0.3
            ? "rgba(100, 116, 139, " // slate-500
            : "rgba(148, 163, 184, "; // slate-400

        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.6 + 0.6,
          baseAlpha: Math.random() * 0.65 + 0.25,
          twinkleSpeed: Math.random() * 0.035 + 0.01,
          phase: Math.random() * Math.PI * 2,
          layer: Math.random() * 0.85 + 0.15, // for depth parallax
          darkColor,
          lightColor,
        });
      }
    };

    initStars();

    // Meteor model - Faster, more frequent & multiple concurrent shooting stars
    let meteors = [];
    const spawnMeteor = (offsetMultiplier = 1) => {
      const startX = Math.random() * (width * 1.25) - width * 0.1 * offsetMultiplier;
      const startY = Math.random() * (height * 0.4);
      const length = Math.random() * 130 + 90;
      const speed = Math.random() * 9 + 9; // fast & dynamic
      const angle = (215 * Math.PI) / 180; // ~215 degrees down-left

      meteors.push({
        x: startX,
        y: startY,
        dx: Math.cos(angle) * speed,
        dy: -Math.sin(angle) * speed,
        length,
        life: 1,
        decay: Math.random() * 0.016 + 0.012,
        size: Math.random() * 2.2 + 1.2,
      });
    };

    // Frequent meteor spawn timer (spawns 1 to 2 meteors every 800ms - 1500ms)
    let lastMeteorSpawn = Date.now();
    let meteorInterval = Math.random() * 600 + 800;

    // Animation Loop
    const render = () => {
      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Check dark mode
      const isDark = document.documentElement.classList.contains("dark");

      // 1. Draw Twinkling Stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.phase += star.twinkleSpeed;
        const currentAlpha =
          star.baseAlpha + Math.sin(star.phase) * (star.baseAlpha * 0.5);

        // In light mode: use grey stars with crisp alpha
        const displayAlpha = isDark ? currentAlpha : Math.max(0.18, currentAlpha * 0.7);
        const starColor = isDark ? star.darkColor : star.lightColor;

        // Apply depth parallax offset
        const drawX = star.x + mouseX * star.layer;
        const drawY = star.y + mouseY * star.layer;

        ctx.beginPath();
        ctx.arc(drawX, drawY, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = starColor + Math.max(0.1, displayAlpha) + ")";
        ctx.fill();

        // Extra halo for brightest stars
        if (star.radius > 1.4 && displayAlpha > 0.5) {
          ctx.beginPath();
          ctx.arc(drawX, drawY, star.radius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = starColor + displayAlpha * 0.18 + ")";
          ctx.fill();
        }
      }

      // 2. High-frequency Meteor Spawning
      const now = Date.now();
      if (now - lastMeteorSpawn > meteorInterval) {
        // Sometimes spawn a double shooting star!
        spawnMeteor(1);
        if (Math.random() > 0.45) {
          setTimeout(() => spawnMeteor(1.2), 150);
        }
        lastMeteorSpawn = now;
        meteorInterval = Math.random() * 700 + 800; // Frequent: every 0.8s to 1.5s
      }

      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.dx;
        m.y += m.dy;
        m.life -= m.decay;

        if (m.life <= 0 || m.x < -120 || m.y > height + 120) {
          meteors.splice(i, 1);
          continue;
        }

        // Calculate tail position
        const tailX = m.x - (m.dx / Math.hypot(m.dx, m.dy)) * m.length;
        const tailY = m.y - (m.dy / Math.hypot(m.dx, m.dy)) * m.length;

        // Radiant meteor gradient: Vibrant cosmic in Dark Mode, Sleek Grey in Light Mode
        const gradient = ctx.createLinearGradient(m.x, m.y, tailX, tailY);

        const headColor = isDark
          ? `rgba(255, 255, 255, ${m.life})`
          : `rgba(71, 85, 105, ${m.life * 0.95})`; // Sleek slate grey in light mode

        const midColor = isDark
          ? `rgba(167, 139, 250, ${m.life * 0.75})`
          : `rgba(148, 163, 184, ${m.life * 0.75})`; // Silver grey in light mode

        const tailColor = isDark
          ? `rgba(139, 92, 246, 0)`
          : `rgba(148, 163, 184, 0)`; // Fading grey

        gradient.addColorStop(0, headColor);
        gradient.addColorStop(0.35, midColor);
        gradient.addColorStop(1, tailColor);

        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = m.size;
        ctx.lineCap = "round";
        ctx.stroke();

        // Meteor glowing head
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = headColor;
        ctx.shadowColor = isDark
          ? "rgba(167, 139, 250, 0.8)"
          : "rgba(100, 116, 139, 0.6)"; // Grey shadow in light mode
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 will-change-transform"
      style={{ width: "100%", height: "100%" }}
    />
  );
};
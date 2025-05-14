"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export const CanvasRevealEffect = ({
  animationSpeed = 0.4,
  opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
  colors = [[0, 255, 255]],
  containerClassName,
  dotSize = 3,
  showGradient = true,
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = container.clientWidth * 2;
      canvas.height = container.clientHeight * 2;
      canvas.style.width = `${container.clientWidth}px`;
      canvas.style.height = `${container.clientHeight}px`;
      ctx.scale(2, 2);
    };

    // Initialize canvas
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Animation variables
    let animationFrameId;
    let startTime = Date.now();

    // Draw a dot
    const drawDot = (x, y, opacity, color) => {
      ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${opacity})`;
      ctx.beginPath();
      ctx.arc(x, y, dotSize / 2, 0, Math.PI * 2);
      ctx.fill();
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const elapsedTime = (Date.now() - startTime) / 1000;
      const spacing = 20;

      for (let x = 0; x < canvas.width / 2; x += spacing) {
        for (let y = 0; y < canvas.height / 2; y += spacing) {
          const distance = Math.sqrt(
            Math.pow(x - canvas.width / 4, 2) + Math.pow(y - canvas.height / 4, 2)
          );
          const delay = distance * 0.01;
          const time = elapsedTime - delay;
          
          if (time > 0) {
            const fadeInDuration = 0.5;
            let opacity = Math.min(time / fadeInDuration, 1);
            opacity *= opacities[Math.floor(Math.random() * opacities.length)];
            
            const colorIndex = Math.floor(Math.random() * colors.length);
            drawDot(x, y, opacity, colors[colorIndex]);
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [colors, opacities, dotSize, animationSpeed]);

  return (
    <div className={cn("h-full relative bg-black w-full", containerClassName)}>
      <div ref={containerRef} className="h-full w-full">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      </div>
      {showGradient && (
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50" />
      )}
    </div>
  );
}; 
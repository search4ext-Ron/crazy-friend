import { useEffect, useRef } from 'react';
import './VoiceVisualizer.css';

interface VoiceVisualizerProps {
  isRecording: boolean;
}

export default function VoiceVisualizer({ isRecording }: VoiceVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!isRecording) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bars = 20;
    const barWidth = canvas.width / bars;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#dc2626';

      for (let i = 0; i < bars; i++) {
        const barHeight = Math.random() * canvas.height * 0.8 + canvas.height * 0.1;
        const x = i * barWidth;
        ctx.fillRect(x, canvas.height - barHeight, barWidth - 2, barHeight);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRecording]);

  if (!isRecording) return null;

  return (
    <div className="voice-visualizer">
      <canvas ref={canvasRef} width={400} height={60} />
    </div>
  );
}


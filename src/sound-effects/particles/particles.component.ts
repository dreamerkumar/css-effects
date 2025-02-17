import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from '../../app/shared/back-button.component';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  hue: number;
  alpha: number;
}

@Component({
  selector: 'app-particles',
  standalone: true,
  imports: [CommonModule, BackButtonComponent],
  template: `
    <app-back-button [text]="'Back to Sound Effects'" path="/sound-effects"></app-back-button>
    <div class="container">
      <h1>Audio Particles Effect</h1>
      <p class="description">Sound-reactive particle animations</p>
      <div class="demo">
        <div class="controls">
          <input type="file" accept="audio/*" (change)="onFileSelected($event)" #fileInput>
          <button (click)="togglePlay()">{{ isPlaying ? 'Pause' : 'Play' }}</button>
          <select (change)="changeMode($event)">
            <option value="fountain">Fountain</option>
            <option value="explosion">Explosion</option>
            <option value="vortex">Vortex</option>
            <option value="wave">Wave</option>
          </select>
        </div>
        <div class="particles-container">
          <canvas #particlesCanvas></canvas>
          <div class="overlay" *ngIf="!audioSource">
            <p>Select an audio file to begin</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 2rem;
      text-align: center;
    }

    .description {
      margin: 1rem 0 2rem;
      color: #666;
    }

    .demo {
      padding: 2rem;
      background: #1a1a1a;
      border-radius: 8px;
    }

    .controls {
      margin-bottom: 2rem;
      display: flex;
      gap: 1rem;
      justify-content: center;
      align-items: center;
    }

    button, select {
      padding: 0.5rem 1.5rem;
      background: #7c4dff;
      border: none;
      border-radius: 4px;
      color: white;
      cursor: pointer;
      transition: background 0.3s;
    }

    button:hover, select:hover {
      background: #6c3fff;
    }

    select {
      background: #5c00d2;
    }

    .particles-container {
      position: relative;
      width: 100%;
      height: 300px;
      background: #000;
      border-radius: 8px;
      overflow: hidden;
    }

    canvas {
      width: 100%;
      height: 100%;
    }

    .overlay {
      position: absolute;
      inset: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(0,0,0,0.7);
      color: white;
    }
  `]
})
export class ParticlesComponent implements AfterViewInit, OnDestroy {
  @ViewChild('particlesCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
public audioSource: MediaElementAudioSourceNode | null = null;
  private audio: HTMLAudioElement | null = null;
  private animationFrame: number = 0;
  private particles: Particle[] = [];
  private mode: 'fountain' | 'explosion' | 'vortex' | 'wave' = 'fountain';
  isPlaying: boolean = false;

  ngAfterViewInit() {
    this.initCanvas();
  }

  ngOnDestroy() {
    this.stopAnimation();
    this.audioContext?.close();
  }

  private initCanvas() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      this.setupAudio(url);
    }
  }

  changeMode(event: Event) {
    this.mode = (event.target as HTMLSelectElement).value as any;
    this.particles = [];
  }

  private setupAudio(url: string) {
    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
    }

    this.audio = new Audio(url);
    this.audio.addEventListener('ended', () => {
      this.isPlaying = false;
    });

    if (!this.audioContext) {
      this.audioContext = new AudioContext();
    }

    if (this.audioSource) {
      this.audioSource.disconnect();
    }

    this.audioSource = this.audioContext.createMediaElementSource(this.audio);
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 256;

    this.audioSource.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);

    this.startAnimation();
  }

  togglePlay() {
    if (!this.audio) return;

    if (this.isPlaying) {
      this.audio.pause();
      this.stopAnimation();
    } else {
      this.audio.play();
      this.startAnimation();
    }
    this.isPlaying = !this.isPlaying;
  }

  private startAnimation() {
    if (!this.analyser) return;

    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d')!;
    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      this.animationFrame = requestAnimationFrame(draw);
      
      this.analyser!.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b) / bufferLength;
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create new particles based on audio intensity
      if (average > 50) {
        this.createParticles(canvas, average);
      }

      // Update and draw existing particles
      this.updateParticles(canvas, average);
      this.drawParticles(ctx);
    };

    draw();
  }

  private createParticles(canvas: HTMLCanvasElement, intensity: number) {
    const count = Math.floor(intensity / 20);
    
    for (let i = 0; i < count; i++) {
      const particle = this.createParticle(canvas, intensity);
      this.particles.push(particle);
    }

    // Limit particle count
    if (this.particles.length > 1000) {
      this.particles = this.particles.slice(-1000);
    }
  }

  private createParticle(canvas: HTMLCanvasElement, intensity: number): Particle {
    const baseParticle = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      size: Math.random() * 5 + 2,
      speedX: 0,
      speedY: 0,
      hue: Math.random() * 360,
      alpha: 1
    };

    switch (this.mode) {
      case 'fountain':
        return {
          ...baseParticle,
          y: canvas.height,
          speedX: (Math.random() - 0.5) * intensity / 10,
          speedY: -Math.random() * intensity / 5
        };
      
      case 'explosion':
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * intensity / 10;
        return {
          ...baseParticle,
          speedX: Math.cos(angle) * speed,
          speedY: Math.sin(angle) * speed
        };
      
      case 'vortex':
        return {
          ...baseParticle,
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2
        };
      
      case 'wave':
        return {
          ...baseParticle,
          x: Math.random() * canvas.width,
          y: canvas.height / 2,
          speedX: (Math.random() - 0.5) * 2,
          speedY: 0
        };
      
      default:
        return baseParticle;
    }
  }

  private updateParticles(canvas: HTMLCanvasElement, intensity: number) {
    this.particles = this.particles.filter(particle => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      particle.alpha -= 0.01;

      switch (this.mode) {
        case 'fountain':
          particle.speedY += 0.2; // Gravity
          break;
        
        case 'vortex':
          const dx = canvas.width / 2 - particle.x;
          const dy = canvas.height / 2 - particle.y;
          const angle = Math.atan2(dy, dx);
          particle.speedX += Math.cos(angle) * 0.1;
          particle.speedY += Math.sin(angle) * 0.1;
          break;
        
        case 'wave':
          particle.y = canvas.height / 2 + 
            Math.sin(particle.x * 0.02 + Date.now() * 0.002) * 
            (intensity / 2);
          break;
      }

      return particle.alpha > 0;
    });
  }

  private drawParticles(ctx: CanvasRenderingContext2D) {
    this.particles.forEach(particle => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${particle.hue}, 100%, 50%, ${particle.alpha})`;
      ctx.fill();
    });
  }

  private stopAnimation() {
    cancelAnimationFrame(this.animationFrame);
  }
} 
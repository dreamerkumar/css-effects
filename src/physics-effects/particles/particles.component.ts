import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

interface Attractor {
  x: number;
  y: number;
  strength: number;
  radius: number;
}

@Component({
  selector: 'app-particles',
  standalone: true,
  template: `
    <div class="container">
      <h1>Physics Particles Effect</h1>
      <p class="description">Particle system with physics-based behaviors</p>
      <div class="demo">
        <div class="controls">
          <select (change)="changeMode($event)">
            <option value="fountain">Fountain</option>
            <option value="vortex">Vortex</option>
            <option value="explosion">Explosion</option>
            <option value="attractor">Attractor</option>
          </select>
          <button (click)="togglePause()">{{ isPaused ? 'Resume' : 'Pause' }}</button>
          <button (click)="reset()">Reset</button>
        </div>
        <div class="physics-container">
          <canvas #physicsCanvas (mousemove)="onMouseMove($event)"></canvas>
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

    .physics-container {
      position: relative;
      width: 100%;
      height: 400px;
      background: #000;
      border-radius: 8px;
      overflow: hidden;
    }

    canvas {
      width: 100%;
      height: 100%;
    }
  `]
})
export class ParticlesComponent implements AfterViewInit, OnDestroy {
  @ViewChild('physicsCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private attractors: Attractor[] = [];
  private animationFrame: number = 0;
  private mode: 'fountain' | 'vortex' | 'explosion' | 'attractor' = 'fountain';
  private mousePos = { x: 0, y: 0 };
  isPaused = false;

  ngAfterViewInit() {
    this.initCanvas();
    this.startAnimation();
  }

  ngOnDestroy() {
    this.stopAnimation();
  }

  private initCanvas() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    this.ctx = canvas.getContext('2d')!;
  }

  onMouseMove(event: MouseEvent) {
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    this.mousePos.x = event.clientX - rect.left;
    this.mousePos.y = event.clientY - rect.top;
  }

  changeMode(event: Event) {
    this.mode = (event.target as HTMLSelectElement).value as typeof this.mode;
    this.reset();
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    if (!this.isPaused) {
      this.startAnimation();
    }
  }

  reset() {
    this.particles = [];
    this.attractors = [];
    if (this.mode === 'attractor') {
      this.setupAttractors();
    }
  }

  private setupAttractors() {
    const canvas = this.canvasRef.nativeElement;
    for (let i = 0; i < 3; i++) {
      this.attractors.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        strength: (Math.random() - 0.5) * 2,
        radius: Math.random() * 100 + 50
      });
    }
  }

  private createParticle(): Particle {
    const canvas = this.canvasRef.nativeElement;
    const baseParticle = {
      life: 1,
      maxLife: Math.random() * 100 + 100,
      size: Math.random() * 4 + 2,
      color: `hsl(${Math.random() * 360}, 70%, 50%)`
    };

    switch (this.mode) {
      case 'fountain':
        return {
          ...baseParticle,
          x: canvas.width / 2,
          y: canvas.height,
          vx: (Math.random() - 0.5) * 5,
          vy: -Math.random() * 10 - 5
        };

      case 'vortex':
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 100 + 50;
        return {
          ...baseParticle,
          x: canvas.width / 2 + Math.cos(angle) * radius,
          y: canvas.height / 2 + Math.sin(angle) * radius,
          vx: -Math.sin(angle) * 2,
          vy: Math.cos(angle) * 2
        };

      case 'explosion':
        const speed = Math.random() * 10;
        const explosionAngle = Math.random() * Math.PI * 2;
        return {
          ...baseParticle,
          x: canvas.width / 2,
          y: canvas.height / 2,
          vx: Math.cos(explosionAngle) * speed,
          vy: Math.sin(explosionAngle) * speed
        };

      case 'attractor':
        return {
          ...baseParticle,
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2
        };

      default:
        return {
          ...baseParticle,
          x: 0,
          y: 0,
          vx: 0,
          vy: 0
        };
    }
  }

  private startAnimation() {
    const canvas = this.canvasRef.nativeElement;

    const animate = () => {
      if (this.isPaused) return;
      
      this.animationFrame = requestAnimationFrame(animate);
      
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      this.ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create new particles
      if (this.particles.length < 1000) {
        for (let i = 0; i < 5; i++) {
          this.particles.push(this.createParticle());
        }
      }

      // Update and draw particles
      this.particles = this.particles.filter(particle => {
        particle.life++;
        
        // Apply physics based on mode
        switch (this.mode) {
          case 'fountain':
            particle.vy += 0.2; // gravity
            break;

          case 'vortex':
            const dx = canvas.width / 2 - particle.x;
            const dy = canvas.height / 2 - particle.y;
            const angle = Math.atan2(dy, dx);
            particle.vx += Math.cos(angle) * 0.1;
            particle.vy += Math.sin(angle) * 0.1;
            break;

          case 'attractor':
            this.attractors.forEach(attractor => {
              const dx = attractor.x - particle.x;
              const dy = attractor.y - particle.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              if (distance < attractor.radius) {
                const force = (attractor.radius - distance) * attractor.strength / attractor.radius;
                particle.vx += (dx / distance) * force;
                particle.vy += (dy / distance) * force;
              }
            });
            break;
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Apply damping
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Draw particle
        const alpha = 1 - particle.life / particle.maxLife;
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fillStyle = particle.color.replace(')', `, ${alpha})`).replace('hsl', 'hsla');
        this.ctx.fill();

        // Keep particle alive
        return particle.life < particle.maxLife;
      });

      // Draw attractors
      if (this.mode === 'attractor') {
        this.attractors.forEach(attractor => {
          this.ctx.beginPath();
          this.ctx.arc(attractor.x, attractor.y, 5, 0, Math.PI * 2);
          this.ctx.fillStyle = attractor.strength > 0 ? '#7c4dff' : '#ff4081';
          this.ctx.fill();

          this.ctx.beginPath();
          this.ctx.arc(attractor.x, attractor.y, attractor.radius, 0, Math.PI * 2);
          this.ctx.strokeStyle = `${attractor.strength > 0 ? '#7c4dff' : '#ff4081'}44`;
          this.ctx.stroke();
        });
      }
    };

    animate();
  }

  private stopAnimation() {
    cancelAnimationFrame(this.animationFrame);
  }
} 
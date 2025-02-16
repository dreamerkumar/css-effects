import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-particles',
  standalone: true,
  template: `
    <div class="container">
      <h1>Particles Background Effect</h1>
      <p class="description">Interactive particle system with mouse tracking</p>
      <div class="demo">
        <canvas #particleCanvas></canvas>
        <div class="content">
          <h2>Interactive Particles</h2>
          <p>Move your mouse to interact with the particles</p>
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
      position: relative;
      height: 500px;
      background: #1a1a1a;
      border-radius: 8px;
      overflow: hidden;
    }

    canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .content {
      position: relative;
      z-index: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: white;
    }

    h2 {
      margin: 0 0 1rem;
      font-size: 2rem;
    }

    p {
      margin: 0;
      opacity: 0.8;
    }
  `]
})
export class ParticlesComponent implements AfterViewInit, OnDestroy {
  @ViewChild('particleCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private mouse = { x: 0, y: 0 };
  private animationFrame: number = 0;

  ngAfterViewInit() {
    this.initCanvas();
    this.createParticles();
    this.addEventListeners();
    this.animate();
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationFrame);
    this.removeEventListeners();
  }

  private initCanvas() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resizeCanvas();
  }

  private resizeCanvas() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  private createParticles() {
    const canvas = this.canvasRef.nativeElement;
    for (let i = 0; i < 100; i++) {
      this.particles.push(new Particle(
        Math.random() * canvas.width,
        Math.random() * canvas.height
      ));
    }
  }

  private addEventListeners() {
    window.addEventListener('resize', this.handleResize);
    this.canvasRef.nativeElement.addEventListener('mousemove', this.handleMouseMove);
  }

  private removeEventListeners() {
    window.removeEventListener('resize', this.handleResize);
    this.canvasRef.nativeElement.removeEventListener('mousemove', this.handleMouseMove);
  }

  private handleResize = () => {
    this.resizeCanvas();
  }

  private handleMouseMove = (event: MouseEvent) => {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    this.mouse.x = event.clientX - rect.left;
    this.mouse.y = event.clientY - rect.top;
  }

  private animate = () => {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.particles.forEach(particle => {
      particle.update(this.mouse);
      particle.draw(this.ctx);
    });

    this.animationFrame = requestAnimationFrame(this.animate);
  }
}

class Particle {
  private vx: number = (Math.random() - 0.5) * 2;
  private vy: number = (Math.random() - 0.5) * 2;
  private size: number = Math.random() * 3 + 1;
  private originalX: number;
  private originalY: number;

  constructor(
    private x: number,
    private y: number
  ) {
    this.originalX = x;
    this.originalY = y;
  }

  update(mouse: { x: number; y: number }) {
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 100) {
      const force = (100 - distance) / 100;
      this.vx -= dx * force * 0.02;
      this.vy -= dy * force * 0.02;
    }

    this.x += this.vx;
    this.y += this.vy;

    // Return to original position
    this.vx += (this.originalX - this.x) * 0.05;
    this.vy += (this.originalY - this.y) * 0.05;

    // Friction
    this.vx *= 0.95;
    this.vy *= 0.95;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
} 
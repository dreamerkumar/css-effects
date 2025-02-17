import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from '../../app/shared/back-button.component';

@Component({
  selector: 'app-trail',
  standalone: true,
  imports: [CommonModule, BackButtonComponent],
  template: `
    <app-back-button [text]="'Back to Cursor Effects'" path="/cursor-effects"></app-back-button>
    <div class="container">
      <h1>Cursor Trail Effect</h1>
      <p class="description">Cursor with trailing particles</p>
      <div class="demo">
        <canvas #trailCanvas></canvas>
        <div class="content">
          <h2>Move Your Mouse</h2>
          <p>Watch the trailing particles follow</p>
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
      cursor: none;
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
      pointer-events: none;
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
export class TrailComponent implements AfterViewInit, OnDestroy {
  @ViewChild('trailCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private mouse = { x: 0, y: 0 };
  private animationFrame: number = 0;

  ngAfterViewInit() {
    this.initCanvas();
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
    this.addParticle();
  }

  private addParticle() {
    this.particles.push(new Particle(
      this.mouse.x,
      this.mouse.y,
      Math.random() * 2 + 2,
      `hsl(${Math.random() * 360}, 50%, 50%)`
    ));
  }

  private animate = () => {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.fillStyle = 'rgba(26,26,26,0.1)';
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);

    this.particles.forEach((particle, index) => {
      if (particle.alpha <= 0) {
        this.particles.splice(index, 1);
      } else {
        particle.update();
        particle.draw(this.ctx);
      }
    });

    this.animationFrame = requestAnimationFrame(this.animate);
  }
}

class Particle {
  public alpha: number = 1;
  private vx: number = (Math.random() - 0.5) * 2;
  private vy: number = (Math.random() - 0.5) * 2;

  constructor(
    private x: number,
    private y: number,
    private size: number,
    private color: string
  ) {}

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 0.02;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
} 
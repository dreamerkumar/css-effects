import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spotlight',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>Spotlight Cursor Effect</h1>
      <p class="description">Cursor creates a spotlight effect</p>
      <div class="demo">
        <canvas #spotlightCanvas></canvas>
        <div class="content">
          <div class="card" *ngFor="let i of [1,2,3,4]">
            <h3>Card {{i}}</h3>
            <p>Move cursor to illuminate</p>
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
      pointer-events: none;
    }

    .content {
      position: relative;
      z-index: 1;
      height: 100%;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
      padding: 2rem;
    }

    .card {
      background: rgba(255,255,255,0.1);
      border-radius: 8px;
      padding: 2rem;
      color: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    h3 {
      margin: 0 0 1rem;
      font-size: 1.5rem;
    }

    p {
      margin: 0;
      opacity: 0.8;
    }
  `]
})
export class SpotlightComponent implements AfterViewInit, OnDestroy {
  @ViewChild('spotlightCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
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
    this.canvasRef.nativeElement.parentElement?.addEventListener('mousemove', this.handleMouseMove);
  }

  private removeEventListeners() {
    window.removeEventListener('resize', this.handleResize);
    this.canvasRef.nativeElement.parentElement?.removeEventListener('mousemove', this.handleMouseMove);
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
    
    // Clear canvas
    this.ctx.fillStyle = 'rgba(26,26,26,0.98)';
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Create spotlight gradient
    const gradient = this.ctx.createRadialGradient(
      this.mouse.x, this.mouse.y, 0,
      this.mouse.x, this.mouse.y, 150
    );
    gradient.addColorStop(0, 'rgba(26,26,26,0)');
    gradient.addColorStop(1, 'rgba(26,26,26,0.98)');

    // Draw spotlight
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);

    this.animationFrame = requestAnimationFrame(this.animate);
  }
} 
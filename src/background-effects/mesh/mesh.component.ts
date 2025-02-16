import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-mesh',
  standalone: true,
  template: `
    <div class="container">
      <h1>Mesh Background Effect</h1>
      <p class="description">Interactive geometric mesh patterns</p>
      <div class="demo">
        <canvas #meshCanvas></canvas>
        <div class="content">
          <h2>Mesh Network</h2>
          <p>Move your mouse to interact</p>
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
      text-shadow: 0 2px 4px rgba(0,0,0,0.2);
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
export class MeshComponent implements AfterViewInit, OnDestroy {
  @ViewChild('meshCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private points: Point[] = [];
  private mouse = { x: 0, y: 0 };
  private animationFrame: number = 0;

  ngAfterViewInit() {
    this.initCanvas();
    this.createPoints();
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

  private createPoints() {
    const canvas = this.canvasRef.nativeElement;
    const spacing = 50;
    const rows = Math.ceil(canvas.height / spacing);
    const cols = Math.ceil(canvas.width / spacing);

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        this.points.push(new Point(
          x * spacing,
          y * spacing,
          spacing
        ));
      }
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
    this.points = [];
    this.createPoints();
  }

  private handleMouseMove = (event: MouseEvent) => {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    this.mouse.x = event.clientX - rect.left;
    this.mouse.y = event.clientY - rect.top;
  }

  private animate = () => {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.fillStyle = 'rgba(26,26,26,0.1)';
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);

    this.points.forEach(point => {
      point.update(this.mouse);
      point.draw(this.ctx);
      this.drawConnections(point);
    });

    this.animationFrame = requestAnimationFrame(this.animate);
  }

  private drawConnections(point: Point) {
    this.points.forEach(otherPoint => {
      const distance = Math.hypot(point.x - otherPoint.x, point.y - otherPoint.y);
      if (distance < 100) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = `rgba(255,255,255,${1 - distance/100})`;
        this.ctx.lineWidth = 1;
        this.ctx.moveTo(point.x, point.y);
        this.ctx.lineTo(otherPoint.x, otherPoint.y);
        this.ctx.stroke();
      }
    });
  }
}

class Point {
  private originalX: number;
  private originalY: number;
  private vx: number = 0;
  private vy: number = 0;

  constructor(
    public x: number,
    public y: number,
    private spacing: number
  ) {
    this.originalX = x;
    this.originalY = y;
  }

  update(mouse: { x: number; y: number }) {
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.hypot(dx, dy);
    
    if (distance < 100) {
      const force = (100 - distance) / 100;
      this.vx -= dx * force * 0.02;
      this.vy -= dy * force * 0.02;
    }

    // Return to original position
    this.vx += (this.originalX - this.x) * 0.05;
    this.vy += (this.originalY - this.y) * 0.05;

    // Apply velocity with friction
    this.vx *= 0.95;
    this.vy *= 0.95;

    // Update position
    this.x += this.vx;
    this.y += this.vy;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fill();
  }
} 
import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-waves',
  standalone: true,
  template: `
    <div class="container">
      <h1>Waves Background Effect</h1>
      <p class="description">Animated wave patterns using canvas</p>
      <div class="demo">
        <canvas #waveCanvas></canvas>
        <div class="content">
          <h2>Wave Animation</h2>
          <p>Smooth flowing waves</p>
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
      background: linear-gradient(45deg, #00b4db, #0083b0);
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
export class WavesComponent implements AfterViewInit, OnDestroy {
  @ViewChild('waveCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private waves: Wave[] = [];
  private animationFrame: number = 0;

  ngAfterViewInit() {
    this.initCanvas();
    this.createWaves();
    this.animate();
    window.addEventListener('resize', this.handleResize);
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationFrame);
    window.removeEventListener('resize', this.handleResize);
  }

  private initCanvas() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resizeCanvas();
  }

  private handleResize = () => {
    this.resizeCanvas();
    this.createWaves();
  }

  private resizeCanvas() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  private createWaves() {
    const canvas = this.canvasRef.nativeElement;
    this.waves = [];
    
    // Create multiple waves with different properties
    this.waves.push(new Wave(canvas.width, canvas.height, 0.01, 50, 'rgba(255,255,255,0.2)'));
    this.waves.push(new Wave(canvas.width, canvas.height, 0.02, 70, 'rgba(255,255,255,0.3)'));
    this.waves.push(new Wave(canvas.width, canvas.height, 0.015, 90, 'rgba(255,255,255,0.1)'));
  }

  private animate = () => {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.waves.forEach(wave => {
      wave.update();
      wave.draw(this.ctx);
    });

    this.animationFrame = requestAnimationFrame(this.animate);
  }
}

class Wave {
  private points: { x: number; y: number }[] = [];
  private angle: number = 0;

  constructor(
    private width: number,
    private height: number,
    private speed: number,
    private amplitude: number,
    private color: string
  ) {
    this.init();
  }

  private init() {
    const segments = Math.ceil(this.width / 50);
    for (let i = 0; i <= segments; i++) {
      const x = (i / segments) * this.width;
      this.points.push({ x, y: 0 });
    }
  }

  update() {
    this.angle += this.speed;
    const centerY = this.height / 2;
    
    this.points.forEach((point, i) => {
      const x = (i / (this.points.length - 1)) * this.width;
      point.x = x;
      point.y = centerY + Math.sin(this.angle + x * 0.02) * this.amplitude;
    });
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.moveTo(this.points[0].x, this.points[0].y);
    
    for (let i = 1; i < this.points.length - 2; i++) {
      const xc = (this.points[i].x + this.points[i + 1].x) / 2;
      const yc = (this.points[i].y + this.points[i + 1].y) / 2;
      ctx.quadraticCurveTo(this.points[i].x, this.points[i].y, xc, yc);
    }
    
    ctx.quadraticCurveTo(
      this.points[this.points.length - 2].x,
      this.points[this.points.length - 2].y,
      this.points[this.points.length - 1].x,
      this.points[this.points.length - 1].y
    );

    ctx.lineTo(this.width, this.height);
    ctx.lineTo(0, this.height);
    ctx.closePath();
    
    ctx.fillStyle = this.color;
    ctx.fill();
  }
} 
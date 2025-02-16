import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

interface RopePoint {
  x: number;
  y: number;
  oldX: number;
  oldY: number;
  fixed: boolean;
}

interface RopeSegment {
  p1: number;
  p2: number;
  length: number;
}

@Component({
  selector: 'app-rope',
  standalone: true,
  template: `
    <div class="container">
      <h1>Rope Physics Effect</h1>
      <p class="description">Rope and chain physics using verlet integration</p>
      <div class="demo">
        <div class="controls">
          <button (click)="addRope()">Add Rope</button>
          <button (click)="addChain()">Add Chain</button>
          <button (click)="reset()">Reset</button>
          <select (change)="changeIterations($event)">
            <option value="1">Low Quality</option>
            <option value="3" selected>Medium Quality</option>
            <option value="5">High Quality</option>
          </select>
        </div>
        <div class="physics-container">
          <canvas #physicsCanvas></canvas>
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
export class RopeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('physicsCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private points: RopePoint[] = [];
  private segments: RopeSegment[] = [];
  private animationFrame: number = 0;
  private gravity = 0.5;
  private iterations = 3;
  private mousePos = { x: 0, y: 0 };
  private selectedPoint: number | null = null;

  ngAfterViewInit() {
    this.initCanvas();
    this.addRope(); // Add initial rope
    this.startAnimation();
    this.setupMouseEvents();
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

  private setupMouseEvents() {
    const canvas = this.canvasRef.nativeElement;

    canvas.addEventListener('mousedown', (e) => {
      const rect = canvas.getBoundingClientRect();
      this.mousePos.x = e.clientX - rect.left;
      this.mousePos.y = e.clientY - rect.top;
      
      this.selectedPoint = this.points.findIndex(p => {
        const dx = p.x - this.mousePos.x;
        const dy = p.y - this.mousePos.y;
        return Math.sqrt(dx * dx + dy * dy) < 20;
      });
    });

    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      this.mousePos.x = e.clientX - rect.left;
      this.mousePos.y = e.clientY - rect.top;
    });

    canvas.addEventListener('mouseup', () => {
      this.selectedPoint = null;
    });
  }

  addRope() {
    const canvas = this.canvasRef.nativeElement;
    const segments = 20;
    const segmentLength = 20;
    const startX = canvas.width / 4;
    const startY = canvas.height / 4;

    // Add points
    for (let i = 0; i < segments; i++) {
      this.points.push({
        x: startX + i * segmentLength,
        y: startY,
        oldX: startX + i * segmentLength,
        oldY: startY,
        fixed: i === 0 // First point is fixed
      });
    }

    // Add segments
    for (let i = 0; i < segments - 1; i++) {
      this.segments.push({
        p1: this.points.length - segments + i,
        p2: this.points.length - segments + i + 1,
        length: segmentLength
      });
    }
  }

  addChain() {
    const canvas = this.canvasRef.nativeElement;
    const links = 10;
    const linkLength = 30;
    const startX = canvas.width * 3/4;
    const startY = canvas.height / 4;

    // Add points for chain (two points per link)
    for (let i = 0; i < links * 2; i++) {
      const offset = i % 2 === 0 ? -10 : 10;
      this.points.push({
        x: startX + Math.floor(i/2) * linkLength,
        y: startY + offset,
        oldX: startX + Math.floor(i/2) * linkLength,
        oldY: startY + offset,
        fixed: i === 0 // First point is fixed
      });
    }

    // Add segments for chain
    const startIndex = this.points.length - links * 2;
    for (let i = 0; i < links * 2 - 1; i++) {
      this.segments.push({
        p1: startIndex + i,
        p2: startIndex + i + 1,
        length: i % 2 === 0 ? 20 : linkLength
      });
    }
  }

  reset() {
    this.points = [];
    this.segments = [];
    this.addRope();
  }

  changeIterations(event: Event) {
    this.iterations = +(event.target as HTMLSelectElement).value;
  }

  private startAnimation() {
    const canvas = this.canvasRef.nativeElement;

    const animate = () => {
      this.animationFrame = requestAnimationFrame(animate);
      
      this.ctx.fillStyle = '#000';
      this.ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update points
      this.points.forEach((point, i) => {
        if (i === this.selectedPoint) {
          point.x = this.mousePos.x;
          point.y = this.mousePos.y;
          point.oldX = this.mousePos.x;
          point.oldY = this.mousePos.y;
          return;
        }
        
        if (!point.fixed) {
          const vx = point.x - point.oldX;
          const vy = point.y - point.oldY;
          
          point.oldX = point.x;
          point.oldY = point.y;
          
          point.x += vx;
          point.y += vy;
          point.y += this.gravity;
        }
      });

      // Solve constraints
      for (let i = 0; i < this.iterations; i++) {
        this.segments.forEach(segment => {
          const p1 = this.points[segment.p1];
          const p2 = this.points[segment.p2];
          
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const difference = segment.length - distance;
          const percent = difference / distance / 2;
          const offsetX = dx * percent;
          const offsetY = dy * percent;

          if (!p1.fixed) {
            p1.x -= offsetX;
            p1.y -= offsetY;
          }
          if (!p2.fixed) {
            p2.x += offsetX;
            p2.y += offsetY;
          }
        });
      }

      // Draw segments
      this.ctx.strokeStyle = '#7c4dff';
      this.ctx.lineWidth = 2;
      this.segments.forEach(segment => {
        const p1 = this.points[segment.p1];
        const p2 = this.points[segment.p2];
        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.stroke();
      });

      // Draw points
      this.points.forEach(point => {
        this.ctx.beginPath();
        this.ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
        this.ctx.fillStyle = point.fixed ? '#ff4081' : '#7c4dff';
        this.ctx.fill();
      });
    };

    animate();
  }

  private stopAnimation() {
    cancelAnimationFrame(this.animationFrame);
  }
} 
import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

interface SpringPoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  fixed: boolean;
}

interface Spring {
  p1: number;
  p2: number;
  length: number;
  stiffness: number;
}

@Component({
  selector: 'app-spring',
  standalone: true,
  template: `
    <div class="container">
      <h1>Spring Physics Effect</h1>
      <p class="description">Spring-based physics animations and constraints</p>
      <div class="demo">
        <div class="controls">
          <button (click)="addChain()">Add Chain</button>
          <button (click)="addWeb()">Add Web</button>
          <button (click)="reset()">Reset</button>
          <select (change)="changeStiffness($event)">
            <option value="0.01">Soft</option>
            <option value="0.03">Medium</option>
            <option value="0.05">Stiff</option>
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
export class SpringComponent implements AfterViewInit, OnDestroy {
  @ViewChild('physicsCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private points: SpringPoint[] = [];
  private springs: Spring[] = [];
  private animationFrame: number = 0;
  private gravity = 0.5;
  private damping = 0.98;
  private stiffness = 0.03;
  private mousePos = { x: 0, y: 0 };
  private selectedPoint: number | null = null;

  ngAfterViewInit() {
    this.initCanvas();
    this.addChain(); // Add initial chain
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
      
      // Find closest point
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

  addChain() {
    const canvas = this.canvasRef.nativeElement;
    const segments = 10;
    const startX = canvas.width / 4;
    const startY = canvas.height / 4;
    const segmentLength = 30;

    // Add points
    for (let i = 0; i < segments; i++) {
      this.points.push({
        x: startX + i * segmentLength,
        y: startY,
        vx: 0,
        vy: 0,
        fixed: i === 0 // First point is fixed
      });
    }

    // Add springs
    for (let i = 0; i < segments - 1; i++) {
      this.springs.push({
        p1: this.points.length - segments + i,
        p2: this.points.length - segments + i + 1,
        length: segmentLength,
        stiffness: this.stiffness
      });
    }
  }

  addWeb() {
    const canvas = this.canvasRef.nativeElement;
    const rows = 5;
    const cols = 5;
    const spacing = 40;
    const startX = canvas.width / 2 - (cols * spacing) / 2;
    const startY = canvas.height / 3;

    // Add points
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        this.points.push({
          x: startX + j * spacing,
          y: startY + i * spacing,
          vx: 0,
          vy: 0,
          fixed: i === 0 && (j === 0 || j === cols - 1) // Top corners are fixed
        });
      }
    }

    // Add springs
    const startIndex = this.points.length - rows * cols;
    
    // Horizontal springs
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols - 1; j++) {
        this.springs.push({
          p1: startIndex + i * cols + j,
          p2: startIndex + i * cols + j + 1,
          length: spacing,
          stiffness: this.stiffness
        });
      }
    }

    // Vertical springs
    for (let i = 0; i < rows - 1; i++) {
      for (let j = 0; j < cols; j++) {
        this.springs.push({
          p1: startIndex + i * cols + j,
          p2: startIndex + (i + 1) * cols + j,
          length: spacing,
          stiffness: this.stiffness
        });
      }
    }
  }

  reset() {
    this.points = [];
    this.springs = [];
    this.addChain();
  }

  changeStiffness(event: Event) {
    this.stiffness = +(event.target as HTMLSelectElement).value;
    this.springs.forEach(spring => spring.stiffness = this.stiffness);
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
          point.vx = 0;
          point.vy = 0;
          return;
        }
        
        if (!point.fixed) {
          point.vy += this.gravity;
          point.vx *= this.damping;
          point.vy *= this.damping;
          point.x += point.vx;
          point.y += point.vy;
        }
      });

      // Update springs
      this.springs.forEach(spring => {
        const p1 = this.points[spring.p1];
        const p2 = this.points[spring.p2];
        
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const force = (distance - spring.length) * spring.stiffness;
        
        const fx = (dx / distance) * force;
        const fy = (dy / distance) * force;

        if (!p1.fixed) {
          p1.vx += fx;
          p1.vy += fy;
        }
        if (!p2.fixed) {
          p2.vx -= fx;
          p2.vy -= fy;
        }
      });

      // Draw springs
      this.ctx.strokeStyle = '#7c4dff';
      this.ctx.lineWidth = 2;
      this.springs.forEach(spring => {
        const p1 = this.points[spring.p1];
        const p2 = this.points[spring.p2];
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
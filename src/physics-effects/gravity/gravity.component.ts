import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

interface PhysicsObject {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  mass: number;
}

@Component({
  selector: 'app-gravity',
  standalone: true,
  template: `
    <div class="container">
      <h1>Gravity Physics Effect</h1>
      <p class="description">Objects falling with realistic gravity and bounce</p>
      <div class="demo">
        <div class="controls">
          <button (click)="addBall()">Add Ball</button>
          <button (click)="reset()">Reset</button>
          <select (change)="changeGravity($event)">
            <option value="earth">Earth Gravity</option>
            <option value="moon">Moon Gravity</option>
            <option value="mars">Mars Gravity</option>
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
export class GravityComponent implements AfterViewInit, OnDestroy {
  @ViewChild('physicsCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private objects: PhysicsObject[] = [];
  private animationFrame: number = 0;
  private gravity = 9.81; // m/s²
  private restitution = 0.7; // bounce factor
  private scale = 100; // pixels per meter

  ngAfterViewInit() {
    this.initCanvas();
    this.addBall(); // Add initial ball
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

  addBall() {
    const canvas = this.canvasRef.nativeElement;
    const radius = Math.random() * 20 + 10;
    const ball: PhysicsObject = {
      x: Math.random() * (canvas.width - radius * 2) + radius,
      y: radius,
      vx: (Math.random() - 0.5) * 5,
      vy: 0,
      radius,
      color: `hsl(${Math.random() * 360}, 70%, 50%)`,
      mass: radius / 10
    };
    this.objects.push(ball);
  }

  reset() {
    this.objects = [];
    this.addBall();
  }

  changeGravity(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    switch(value) {
      case 'moon':
        this.gravity = 1.62;
        break;
      case 'mars':
        this.gravity = 3.72;
        break;
      default:
        this.gravity = 9.81;
    }
  }

  private startAnimation() {
    const canvas = this.canvasRef.nativeElement;

    const animate = () => {
      this.animationFrame = requestAnimationFrame(animate);
      
      this.ctx.fillStyle = '#000';
      this.ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw each object
      this.objects.forEach(obj => {
        // Apply gravity
        obj.vy += this.gravity / this.scale;
        
        // Update position
        obj.x += obj.vx;
        obj.y += obj.vy;

        // Check wall collisions
        if (obj.x - obj.radius < 0) {
          obj.x = obj.radius;
          obj.vx = -obj.vx * this.restitution;
        }
        if (obj.x + obj.radius > canvas.width) {
          obj.x = canvas.width - obj.radius;
          obj.vx = -obj.vx * this.restitution;
        }
        if (obj.y - obj.radius < 0) {
          obj.y = obj.radius;
          obj.vy = -obj.vy * this.restitution;
        }
        if (obj.y + obj.radius > canvas.height) {
          obj.y = canvas.height - obj.radius;
          obj.vy = -obj.vy * this.restitution;
        }

        // Check ball collisions
        this.objects.forEach(other => {
          if (obj === other) return;

          const dx = other.x - obj.x;
          const dy = other.y - obj.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < obj.radius + other.radius) {
            // Collision detected - calculate new velocities
            const angle = Math.atan2(dy, dx);
            const sin = Math.sin(angle);
            const cos = Math.cos(angle);

            // Rotate velocities
            const vx1 = obj.vx * cos + obj.vy * sin;
            const vy1 = obj.vy * cos - obj.vx * sin;
            const vx2 = other.vx * cos + other.vy * sin;
            const vy2 = other.vy * cos - other.vx * sin;

            // Calculate new velocities
            const m1 = obj.mass;
            const m2 = other.mass;
            const u1 = vx1 * (m1 - m2) / (m1 + m2) + vx2 * 2 * m2 / (m1 + m2);
            const u2 = vx2 * (m2 - m1) / (m1 + m2) + vx1 * 2 * m1 / (m1 + m2);

            // Rotate back
            obj.vx = u1 * cos - vy1 * sin;
            obj.vy = vy1 * cos + u1 * sin;
            other.vx = u2 * cos - vy2 * sin;
            other.vy = vy2 * cos + u2 * sin;

            // Move balls apart
            const overlap = (obj.radius + other.radius - distance) / 2;
            obj.x -= overlap * cos;
            obj.y -= overlap * sin;
            other.x += overlap * cos;
            other.y += overlap * sin;
          }
        });

        // Draw the ball
        this.ctx.beginPath();
        this.ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = obj.color;
        this.ctx.fill();
      });
    };

    animate();
  }

  private stopAnimation() {
    cancelAnimationFrame(this.animationFrame);
  }
} 
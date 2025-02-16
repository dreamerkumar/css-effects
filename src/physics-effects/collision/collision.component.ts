import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

interface PhysicsObject {
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  rotation: number;
  angularVel: number;
  color: string;
  shape: 'rectangle' | 'polygon';
  vertices?: { x: number; y: number; }[];
}

@Component({
  selector: 'app-collision',
  standalone: true,
  template: `
    <div class="container">
      <h1>Collision Physics Effect</h1>
      <p class="description">Complex collision interactions and responses</p>
      <div class="demo">
        <div class="controls">
          <button (click)="addRectangle()">Add Rectangle</button>
          <button (click)="addPolygon()">Add Polygon</button>
          <button (click)="reset()">Reset</button>
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
    }

    button {
      padding: 0.5rem 1.5rem;
      background: #7c4dff;
      border: none;
      border-radius: 4px;
      color: white;
      cursor: pointer;
      transition: background 0.3s;
    }

    button:hover {
      background: #6c3fff;
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
export class CollisionComponent implements AfterViewInit, OnDestroy {
  @ViewChild('physicsCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private objects: PhysicsObject[] = [];
  private animationFrame: number = 0;
  private restitution = 0.7;

  ngAfterViewInit() {
    this.initCanvas();
    this.addRectangle(); // Add initial object
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

  addRectangle() {
    const canvas = this.canvasRef.nativeElement;
    const width = Math.random() * 40 + 20;
    const height = Math.random() * 40 + 20;
    
    const rect: PhysicsObject = {
      x: Math.random() * (canvas.width - width),
      y: Math.random() * (canvas.height - height),
      vx: (Math.random() - 0.5) * 5,
      vy: (Math.random() - 0.5) * 5,
      width,
      height,
      rotation: Math.random() * Math.PI * 2,
      angularVel: (Math.random() - 0.5) * 0.1,
      color: `hsl(${Math.random() * 360}, 70%, 50%)`,
      shape: 'rectangle'
    };
    
    this.objects.push(rect);
  }

  addPolygon() {
    const canvas = this.canvasRef.nativeElement;
    const sides = Math.floor(Math.random() * 3) + 3; // 3 to 5 sides
    const radius = Math.random() * 20 + 20;
    const vertices = [];
    
    for (let i = 0; i < sides; i++) {
      const angle = (i / sides) * Math.PI * 2;
      vertices.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius
      });
    }
    
    const polygon: PhysicsObject = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 5,
      vy: (Math.random() - 0.5) * 5,
      width: radius * 2,
      height: radius * 2,
      rotation: Math.random() * Math.PI * 2,
      angularVel: (Math.random() - 0.5) * 0.1,
      color: `hsl(${Math.random() * 360}, 70%, 50%)`,
      shape: 'polygon',
      vertices
    };
    
    this.objects.push(polygon);
  }

  reset() {
    this.objects = [];
    this.addRectangle();
  }

  private startAnimation() {
    const canvas = this.canvasRef.nativeElement;

    const animate = () => {
      this.animationFrame = requestAnimationFrame(animate);
      
      this.ctx.fillStyle = '#000';
      this.ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw each object
      this.objects.forEach(obj => {
        // Update position
        obj.x += obj.vx;
        obj.y += obj.vy;
        obj.rotation += obj.angularVel;

        // Check wall collisions
        if (obj.x < 0 || obj.x + obj.width > canvas.width) {
          obj.vx = -obj.vx * this.restitution;
          obj.x = obj.x < 0 ? 0 : canvas.width - obj.width;
        }
        if (obj.y < 0 || obj.y + obj.height > canvas.height) {
          obj.vy = -obj.vy * this.restitution;
          obj.y = obj.y < 0 ? 0 : canvas.height - obj.height;
        }

        // Draw the object
        this.ctx.save();
        this.ctx.translate(obj.x + obj.width/2, obj.y + obj.height/2);
        this.ctx.rotate(obj.rotation);
        this.ctx.fillStyle = obj.color;

        if (obj.shape === 'rectangle') {
          this.ctx.fillRect(-obj.width/2, -obj.height/2, obj.width, obj.height);
        } else if (obj.shape === 'polygon' && obj.vertices) {
          this.ctx.beginPath();
          this.ctx.moveTo(obj.vertices[0].x, obj.vertices[0].y);
          for (let i = 1; i < obj.vertices.length; i++) {
            this.ctx.lineTo(obj.vertices[i].x, obj.vertices[i].y);
          }
          this.ctx.closePath();
          this.ctx.fill();
        }

        this.ctx.restore();
      });

      // Check object collisions
      for (let i = 0; i < this.objects.length; i++) {
        for (let j = i + 1; j < this.objects.length; j++) {
          const obj1 = this.objects[i];
          const obj2 = this.objects[j];

          if (this.checkCollision(obj1, obj2)) {
            // Simple collision response
            const dx = obj2.x - obj1.x;
            const dy = obj2.y - obj1.y;
            const angle = Math.atan2(dy, dx);

            // Exchange velocities
            const tempVx = obj1.vx;
            const tempVy = obj1.vy;
            obj1.vx = obj2.vx * this.restitution;
            obj1.vy = obj2.vy * this.restitution;
            obj2.vx = tempVx * this.restitution;
            obj2.vy = tempVy * this.restitution;

            // Exchange angular velocities
            const tempAngular = obj1.angularVel;
            obj1.angularVel = obj2.angularVel;
            obj2.angularVel = tempAngular;
          }
        }
      }
    };

    animate();
  }

  private checkCollision(obj1: PhysicsObject, obj2: PhysicsObject): boolean {
    // Simple AABB collision check
    return !(obj1.x + obj1.width < obj2.x || 
            obj2.x + obj2.width < obj1.x || 
            obj1.y + obj1.height < obj2.y ||
            obj2.y + obj2.height < obj1.y);
  }

  private stopAnimation() {
    cancelAnimationFrame(this.animationFrame);
  }
} 
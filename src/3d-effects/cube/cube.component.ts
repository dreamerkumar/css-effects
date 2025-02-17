import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from '../../app/shared/back-button.component';

@Component({
  selector: 'app-cube',
  standalone: true,
  imports: [CommonModule, BackButtonComponent],
  template: `
    <app-back-button [text]="'Back to 3D Effects'" path="/3d-effects"></app-back-button>
    <div class="container">
      <h1>3D Cube Effect</h1>
      <p class="description">Interactive 3D cube with CSS transforms</p>
      <div class="demo">
        <div class="controls">
          <button (click)="toggleAutoRotate()">
            {{ isAutoRotating ? 'Stop Rotation' : 'Auto Rotate' }}
          </button>
          <select (change)="changeRotationAxis($event)">
            <option value="all">All Axes</option>
            <option value="x">X Axis</option>
            <option value="y">Y Axis</option>
            <option value="z">Z Axis</option>
          </select>
        </div>
        <div class="scene" 
             #scene
             (mousedown)="startRotation($event)"
             (mousemove)="rotate($event)"
             (mouseup)="stopRotation()"
             (mouseleave)="stopRotation()">
          <div class="cube" [style.transform]="cubeTransform">
            <div class="face front">Front</div>
            <div class="face back">Back</div>
            <div class="face right">Right</div>
            <div class="face left">Left</div>
            <div class="face top">Top</div>
            <div class="face bottom">Bottom</div>
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

    .scene {
      width: 200px;
      height: 200px;
      margin: 0 auto;
      perspective: 600px;
      cursor: grab;
    }

    .scene:active {
      cursor: grabbing;
    }

    .cube {
      width: 100%;
      height: 100%;
      position: relative;
      transform-style: preserve-3d;
      transition: transform 0.1s;
    }

    .face {
      position: absolute;
      width: 200px;
      height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      font-weight: bold;
      color: white;
      border: 2px solid #7c4dff;
      background: rgba(124, 77, 255, 0.2);
      backface-visibility: visible;
    }

    .front  { transform: rotateY(0deg) translateZ(100px); }
    .back   { transform: rotateY(180deg) translateZ(100px); }
    .right  { transform: rotateY(90deg) translateZ(100px); }
    .left   { transform: rotateY(-90deg) translateZ(100px); }
    .top    { transform: rotateX(90deg) translateZ(100px); }
    .bottom { transform: rotateX(-90deg) translateZ(100px); }
  `]
})
export class CubeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('scene') scene!: ElementRef<HTMLDivElement>;

  private rotationX = 0;
  private rotationY = 0;
  private lastMouseX = 0;
  private lastMouseY = 0;
  private isMouseDown = false;
  private animationFrame: number = 0;
  private autoRotationAngle = 0;
  
  isAutoRotating = false;
  rotationAxis: 'all' | 'x' | 'y' | 'z' = 'all';
  cubeTransform = 'rotateX(0deg) rotateY(0deg)';

  ngAfterViewInit() {
    this.startAutoRotation();
  }

  ngOnDestroy() {
    this.stopAutoRotation();
  }

  startRotation(event: MouseEvent) {
    this.isMouseDown = true;
    this.lastMouseX = event.clientX;
    this.lastMouseY = event.clientY;
    this.stopAutoRotation();
  }

  rotate(event: MouseEvent) {
    if (!this.isMouseDown) return;

    const deltaX = event.clientX - this.lastMouseX;
    const deltaY = event.clientY - this.lastMouseY;

    switch (this.rotationAxis) {
      case 'x':
        this.rotationX += deltaY * 0.5;
        break;
      case 'y':
        this.rotationY += deltaX * 0.5;
        break;
      case 'z':
        this.rotationX += deltaY * 0.5;
        this.rotationY += deltaX * 0.5;
        break;
      default:
        this.rotationX += deltaY * 0.5;
        this.rotationY += deltaX * 0.5;
    }

    this.updateCubeTransform();
    
    this.lastMouseX = event.clientX;
    this.lastMouseY = event.clientY;
  }

  stopRotation() {
    this.isMouseDown = false;
    if (this.isAutoRotating) {
      this.startAutoRotation();
    }
  }

  toggleAutoRotate() {
    this.isAutoRotating = !this.isAutoRotating;
    if (this.isAutoRotating) {
      this.startAutoRotation();
    } else {
      this.stopAutoRotation();
    }
  }

  changeRotationAxis(event: Event) {
    this.rotationAxis = (event.target as HTMLSelectElement).value as typeof this.rotationAxis;
  }

  private startAutoRotation() {
    const animate = () => {
      this.animationFrame = requestAnimationFrame(animate);
      this.autoRotationAngle += 0.5;

      switch (this.rotationAxis) {
        case 'x':
          this.rotationX = this.autoRotationAngle;
          break;
        case 'y':
          this.rotationY = this.autoRotationAngle;
          break;
        case 'z':
          this.rotationX = this.autoRotationAngle;
          this.rotationY = this.autoRotationAngle;
          break;
        default:
          this.rotationX = Math.sin(this.autoRotationAngle * Math.PI / 180) * 30;
          this.rotationY = this.autoRotationAngle;
      }

      this.updateCubeTransform();
    };

    animate();
  }

  private stopAutoRotation() {
    cancelAnimationFrame(this.animationFrame);
  }

  private updateCubeTransform() {
    this.cubeTransform = `rotateX(${this.rotationX}deg) rotateY(${this.rotationY}deg)`;
  }
} 
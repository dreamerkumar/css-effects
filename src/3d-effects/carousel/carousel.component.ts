import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CarouselItem {
  title: string;
  color: string;
  transform: string;
}

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>3D Carousel Effect</h1>
      <p class="description">Rotating 3D carousel with perspective transforms</p>
      <div class="demo">
        <div class="controls">
          <button (click)="toggleAutoRotate()">
            {{ isAutoRotating ? 'Stop Rotation' : 'Auto Rotate' }}
          </button>
          <button (click)="previous()">Previous</button>
          <button (click)="next()">Next</button>
        </div>
        <div class="scene" 
             #scene
             (mousedown)="startRotation($event)"
             (mousemove)="rotate($event)"
             (mouseup)="stopRotation()"
             (mouseleave)="stopRotation()">
          <div class="carousel" [style.transform]="carouselTransform">
            <div class="item" 
                 *ngFor="let item of items"
                 [style.transform]="item.transform"
                 [style.background]="item.color">
              {{ item.title }}
            </div>
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

    .scene {
      width: 300px;
      height: 300px;
      margin: 0 auto;
      perspective: 1000px;
      cursor: grab;
    }

    .scene:active {
      cursor: grabbing;
    }

    .carousel {
      width: 100%;
      height: 100%;
      position: relative;
      transform-style: preserve-3d;
      transition: transform 0.5s;
    }

    .item {
      position: absolute;
      width: 200px;
      height: 200px;
      left: 50px;
      top: 50px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      font-weight: bold;
      color: white;
      transition: transform 0.5s;
      backface-visibility: hidden;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    }
  `]
})
export class CarouselComponent implements AfterViewInit, OnDestroy {
  @ViewChild('scene') scene!: ElementRef<HTMLDivElement>;

  items: CarouselItem[] = [
    { title: '1', color: '#7c4dff', transform: '' },
    { title: '2', color: '#ff4081', transform: '' },
    { title: '3', color: '#ffd740', transform: '' },
    { title: '4', color: '#00e5ff', transform: '' },
    { title: '5', color: '#00e676', transform: '' },
    { title: '6', color: '#ff6e40', transform: '' }
  ];

  private rotationY = 0;
  private lastMouseX = 0;
  private isMouseDown = false;
  private animationFrame: number = 0;
  private readonly radius = 300;
  
  isAutoRotating = false;
  carouselTransform = 'rotateY(0deg)';

  ngAfterViewInit() {
    this.updateItemPositions();
    this.startAutoRotation();
  }

  ngOnDestroy() {
    this.stopAutoRotation();
  }

  startRotation(event: MouseEvent) {
    this.isMouseDown = true;
    this.lastMouseX = event.clientX;
    this.stopAutoRotation();
  }

  rotate(event: MouseEvent) {
    if (!this.isMouseDown) return;

    const deltaX = event.clientX - this.lastMouseX;
    this.rotationY += deltaX * 0.5;
    this.updateCarouselTransform();
    
    this.lastMouseX = event.clientX;
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

  next() {
    this.rotationY -= 360 / this.items.length;
    this.updateCarouselTransform();
  }

  previous() {
    this.rotationY += 360 / this.items.length;
    this.updateCarouselTransform();
  }

  private updateItemPositions() {
    const angleStep = 360 / this.items.length;
    this.items.forEach((item, index) => {
      const angle = angleStep * index;
      item.transform = `rotateY(${angle}deg) translateZ(${this.radius}px)`;
    });
  }

  private startAutoRotation() {
    const animate = () => {
      this.animationFrame = requestAnimationFrame(animate);
      this.rotationY -= 0.5;
      this.updateCarouselTransform();
    };

    animate();
  }

  private stopAutoRotation() {
    cancelAnimationFrame(this.animationFrame);
  }

  private updateCarouselTransform() {
    this.carouselTransform = `rotateY(${this.rotationY}deg)`;
  }
} 
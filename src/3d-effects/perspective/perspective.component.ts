import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perspective',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>3D Perspective Effect</h1>
      <p class="description">Dynamic perspective transformations</p>
      <div class="demo">
        <div class="controls">
          <div class="control-group">
            <label>Perspective:</label>
            <input type="range" 
                   [value]="perspective" 
                   (input)="updatePerspective($event)"
                   min="200" max="2000" step="100">
            <span>{{ perspective }}px</span>
          </div>
          <div class="control-group">
            <label>Rotation X:</label>
            <input type="range" 
                   [value]="rotationX" 
                   (input)="updateRotationX($event)"
                   min="-180" max="180" step="5">
            <span>{{ rotationX }}°</span>
          </div>
          <div class="control-group">
            <label>Rotation Y:</label>
            <input type="range" 
                   [value]="rotationY" 
                   (input)="updateRotationY($event)"
                   min="-180" max="180" step="5">
            <span>{{ rotationY }}°</span>
          </div>
        </div>
        <div class="perspective-container" 
             [style.perspective]="perspective + 'px'"
             #container
             (mousemove)="onMouseMove($event)"
             (mouseleave)="resetTransform()">
          <div class="scene" [style.transform]="sceneTransform">
            <div class="cube front">Front</div>
            <div class="cube back">Back</div>
            <div class="cube left">Left</div>
            <div class="cube right">Right</div>
            <div class="cube top">Top</div>
            <div class="cube bottom">Bottom</div>
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
      flex-direction: column;
      gap: 1rem;
      align-items: center;
    }

    .control-group {
      display: flex;
      align-items: center;
      gap: 1rem;
      color: white;
    }

    input[type="range"] {
      width: 200px;
      accent-color: #7c4dff;
    }

    .perspective-container {
      width: 400px;
      height: 400px;
      margin: 0 auto;
      perspective-origin: 50% 50%;
      cursor: move;
    }

    .scene {
      width: 200px;
      height: 200px;
      margin: 100px auto;
      position: relative;
      transform-style: preserve-3d;
      transition: transform 0.3s ease-out;
    }

    .cube {
      position: absolute;
      width: 200px;
      height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: bold;
      color: white;
      background: rgba(124, 77, 255, 0.3);
      border: 2px solid #7c4dff;
      backface-visibility: visible;
      transition: transform 0.3s;
    }

    .front  { transform: translateZ(100px); }
    .back   { transform: translateZ(-100px) rotateY(180deg); }
    .right  { transform: rotateY(90deg) translateZ(100px); }
    .left   { transform: rotateY(-90deg) translateZ(100px); }
    .top    { transform: rotateX(90deg) translateZ(100px); }
    .bottom { transform: rotateX(-90deg) translateZ(100px); }
  `]
})
export class PerspectiveComponent implements AfterViewInit {
  @ViewChild('container') container!: ElementRef<HTMLDivElement>;

  perspective = 1000;
  rotationX = 0;
  rotationY = 0;
  sceneTransform = 'rotateX(0deg) rotateY(0deg)';

  private isMouseTracking = false;
  private containerRect!: DOMRect;

  ngAfterViewInit() {
    this.updateContainerRect();
    window.addEventListener('resize', this.updateContainerRect.bind(this));
  }

  updateContainerRect() {
    this.containerRect = this.container.nativeElement.getBoundingClientRect();
  }

  updatePerspective(event: Event) {
    this.perspective = +(event.target as HTMLInputElement).value;
  }

  updateRotationX(event: Event) {
    this.rotationX = +(event.target as HTMLInputElement).value;
    this.updateTransform();
  }

  updateRotationY(event: Event) {
    this.rotationY = +(event.target as HTMLInputElement).value;
    this.updateTransform();
  }

  onMouseMove(event: MouseEvent) {
    const rect = this.containerRect;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const rotateY = ((event.clientX - centerX) / (rect.width / 2)) * 30;
    const rotateX = ((centerY - event.clientY) / (rect.height / 2)) * 30;

    this.rotationX = rotateX;
    this.rotationY = rotateY;
    this.updateTransform();
  }

  resetTransform() {
    this.rotationX = 0;
    this.rotationY = 0;
    this.updateTransform();
  }

  private updateTransform() {
    this.sceneTransform = `rotateX(${this.rotationX}deg) rotateY(${this.rotationY}deg)`;
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.updateContainerRect.bind(this));
  }
} 
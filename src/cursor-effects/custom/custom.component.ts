import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from '../../app/shared/back-button.component';

@Component({
  selector: 'app-custom',
  standalone: true,
  imports: [CommonModule, BackButtonComponent],
  template: `
    <app-back-button [text]="'Back to Cursor Effects'" path="/cursor-effects"></app-back-button>
    <div class="container">
      <h1>Custom Cursor Effect</h1>
      <p class="description">Custom cursor shapes and animations</p>
      <div class="demo">
        <div class="cursor-dot" #cursorDot></div>
        <div class="cursor-circle" #cursorCircle></div>
        <div class="content">
          <div class="grid">
            <button class="hover-target" *ngFor="let i of [1,2,3,4]">
              <h3>Button {{i}}</h3>
              <p>Hover to see effect</p>
            </button>
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

    .cursor-dot {
      width: 8px;
      height: 8px;
      background: white;
      border-radius: 50%;
      position: fixed;
      pointer-events: none;
      z-index: 3;
      transition: transform 0.1s;
    }

    .cursor-circle {
      width: 40px;
      height: 40px;
      border: 2px solid rgba(255,255,255,0.5);
      border-radius: 50%;
      position: fixed;
      pointer-events: none;
      z-index: 2;
      transition: transform 0.15s ease-out;
    }

    .content {
      position: relative;
      z-index: 1;
      height: 100%;
      padding: 2rem;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    .hover-target {
      padding: 2rem;
      background: rgba(255,255,255,0.1);
      border: none;
      border-radius: 8px;
      color: white;
      cursor: none;
      transition: background-color 0.3s;
    }

    .hover-target:hover {
      background: rgba(255,255,255,0.2);
    }

    .hover-target:hover ~ .cursor-circle {
      transform: scale(1.5);
      background: rgba(255,255,255,0.1);
      border-color: transparent;
    }

    h3 {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
    }

    p {
      margin: 0;
      opacity: 0.8;
    }
  `]
})
export class CustomComponent implements AfterViewInit, OnDestroy {
  @ViewChild('cursorDot') dotRef!: ElementRef<HTMLDivElement>;
  @ViewChild('cursorCircle') circleRef!: ElementRef<HTMLDivElement>;
  private mouse = { x: 0, y: 0 };
  private animationFrame: number = 0;

  ngAfterViewInit() {
    this.addEventListeners();
    this.animate();
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationFrame);
    this.removeEventListeners();
  }

  private addEventListeners() {
    document.addEventListener('mousemove', this.handleMouseMove);
    document.querySelectorAll('.hover-target').forEach(target => {
      target.addEventListener('mouseenter', this.handleTargetHover);
      target.addEventListener('mouseleave', this.handleTargetLeave);
    });
  }

  private removeEventListeners() {
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.querySelectorAll('.hover-target').forEach(target => {
      target.removeEventListener('mouseenter', this.handleTargetHover);
      target.removeEventListener('mouseleave', this.handleTargetLeave);
    });
  }

  private handleMouseMove = (event: MouseEvent) => {
    this.mouse.x = event.clientX;
    this.mouse.y = event.clientY;
  }

  private handleTargetHover = () => {
    this.dotRef.nativeElement.style.transform = 'scale(2)';
    this.circleRef.nativeElement.style.transform = 'scale(1.5)';
  }

  private handleTargetLeave = () => {
    this.dotRef.nativeElement.style.transform = 'scale(1)';
    this.circleRef.nativeElement.style.transform = 'scale(1)';
  }

  private animate = () => {
    const dot = this.dotRef.nativeElement;
    const circle = this.circleRef.nativeElement;

    // Smooth cursor movement
    const dotX = this.lerp(dot.offsetLeft, this.mouse.x - 4, 0.5);
    const dotY = this.lerp(dot.offsetTop, this.mouse.y - 4, 0.5);
    const circleX = this.lerp(circle.offsetLeft, this.mouse.x - 20, 0.15);
    const circleY = this.lerp(circle.offsetTop, this.mouse.y - 20, 0.15);

    dot.style.left = `${dotX}px`;
    dot.style.top = `${dotY}px`;
    circle.style.left = `${circleX}px`;
    circle.style.top = `${circleY}px`;

    this.animationFrame = requestAnimationFrame(this.animate);
  }

  private lerp(start: number, end: number, factor: number): number {
    return start + (end - start) * factor;
  }
} 
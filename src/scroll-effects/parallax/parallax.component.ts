import { Component, ElementRef, HostListener, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from '../../app/shared/back-button.component';

@Component({
  selector: 'app-parallax',
  standalone: true,
  imports: [CommonModule, BackButtonComponent],
  template: `
    <app-back-button [text]="'Back to Scroll Effects'" path="/scroll-effects"></app-back-button>
    <div class="container">
      <h1>Parallax Scroll Effect</h1>
      <p class="description">Elements that move at different speeds while scrolling</p>
      <div class="content">
        <div class="parallax-section">
          <div class="layer layer-1" #parallaxElement data-speed="0.2">
            <div class="circle"></div>
          </div>
          <div class="layer layer-2" #parallaxElement data-speed="0.4">
            <div class="square"></div>
          </div>
          <div class="layer layer-3" #parallaxElement data-speed="0.6">
            <div class="triangle"></div>
          </div>
          <div class="text-content">
            <h2>Parallax Layers</h2>
            <p>Each shape moves at a different speed</p>
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

    .content {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      overflow: hidden;
    }

    .parallax-section {
      height: 400vh;
      position: relative;
    }

    .layer {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      will-change: transform;
    }

    .circle {
      width: 100px;
      height: 100px;
      background: #7000ff;
      border-radius: 50%;
    }

    .square {
      width: 100px;
      height: 100px;
      background: #ff3e3e;
      transform: rotate(45deg);
    }

    .triangle {
      width: 0;
      height: 0;
      border-left: 50px solid transparent;
      border-right: 50px solid transparent;
      border-bottom: 100px solid #00c853;
    }

    .layer-1 { z-index: 1; }
    .layer-2 { z-index: 2; }
    .layer-3 { z-index: 3; }

    .text-content {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 4;
      color: white;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }

    h2 {
      margin: 0 0 1rem;
      font-size: 2.5rem;
    }

    p {
      margin: 0;
      font-size: 1.2rem;
      opacity: 0.8;
    }
  `]
})
export class ParallaxComponent implements AfterViewInit {
  @ViewChildren('parallaxElement') parallaxElements!: QueryList<ElementRef>;

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.updateParallax();
  }

  ngAfterViewInit() {
    this.updateParallax();
  }

  private updateParallax() {
    const scrolled = window.pageYOffset;
    this.parallaxElements.forEach(element => {
      const speed = element.nativeElement.getAttribute('data-speed');
      const yPos = -(scrolled * speed);
      element.nativeElement.style.transform = `translate(-50%, calc(-50% + ${yPos}px))`;
    });
  }
} 
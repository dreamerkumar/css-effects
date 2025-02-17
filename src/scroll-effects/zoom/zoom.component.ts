import { Component, ElementRef, HostListener, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from '../../app/shared/back-button.component';

@Component({
  selector: 'app-zoom',
  standalone: true,
  imports: [CommonModule, BackButtonComponent],
  template: `
    <app-back-button [text]="'Back to Scroll Effects'" path="/scroll-effects"></app-back-button>
    <div class="container">
      <h1>Zoom Scroll Effect</h1>
      <p class="description">Elements that zoom in as you scroll</p>
      <div class="content">
        <div class="zoom-section zoom-in" #zoomElement>
          <h2>Zoom In</h2>
          <p>This section zooms in from a smaller size.</p>
        </div>
        <div class="zoom-section zoom-out" #zoomElement>
          <h2>Zoom Out</h2>
          <p>This section zooms out from a larger size.</p>
        </div>
        <div class="zoom-section zoom-rotate" #zoomElement>
          <h2>Zoom Rotate</h2>
          <p>This section zooms in with rotation.</p>
        </div>
        <div class="zoom-section zoom-blur" #zoomElement>
          <h2>Zoom Blur</h2>
          <p>This section zooms in with a blur effect.</p>
        </div>
        <div class="zoom-section zoom-fade" #zoomElement>
          <h2>Zoom Fade</h2>
          <p>This section zooms in while fading.</p>
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
    }

    .zoom-section {
      margin: 100vh 0;
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      opacity: 0;
      transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .zoom-in {
      transform: scale(0.5);
    }

    .zoom-out {
      transform: scale(1.5);
    }

    .zoom-rotate {
      transform: scale(0.5) rotate(-15deg);
    }

    .zoom-blur {
      transform: scale(0.5);
      filter: blur(10px);
    }

    .zoom-fade {
      transform: scale(0.8);
      opacity: 0;
    }

    .zoom-section.visible {
      opacity: 1;
      transform: scale(1) rotate(0deg);
      filter: blur(0);
    }

    h2 {
      margin: 0 0 1rem;
      color: #333;
    }

    p {
      margin: 0;
      color: #666;
      line-height: 1.6;
    }
  `]
})
export class ZoomComponent implements AfterViewInit {
  @ViewChildren('zoomElement') zoomElements!: QueryList<ElementRef>;

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.checkZoomElements();
  }

  ngAfterViewInit() {
    setTimeout(() => this.checkZoomElements(), 0);
  }

  private checkZoomElements() {
    const zoomElements = this.zoomElements.toArray();
    zoomElements.forEach(element => {
      const rect = element.nativeElement.getBoundingClientRect();
      const isVisible = rect.top <= window.innerHeight * 0.8;
      if (isVisible) {
        element.nativeElement.classList.add('visible');
      }
    });
  }
} 
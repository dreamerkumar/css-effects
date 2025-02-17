import { Component, ElementRef, HostListener, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from '../../app/shared/back-button.component';

@Component({
  selector: 'app-slide',
  standalone: true,
  imports: [CommonModule, BackButtonComponent],
  template: `
    <app-back-button [text]="'Back to Scroll Effects'" path="/scroll-effects"></app-back-button>
    <div class="container">
      <h1>Slide Scroll Effect</h1>
      <p class="description">Elements that slide in from different directions</p>
      <div class="content">
        <div class="slide-section slide-left" #slideElement>
          <h2>Slide Left</h2>
          <p>This section slides in from the left side.</p>
        </div>
        <div class="slide-section slide-right" #slideElement>
          <h2>Slide Right</h2>
          <p>This section slides in from the right side.</p>
        </div>
        <div class="slide-section slide-up" #slideElement>
          <h2>Slide Up</h2>
          <p>This section slides up from the bottom.</p>
        </div>
        <div class="slide-section slide-down" #slideElement>
          <h2>Slide Down</h2>
          <p>This section slides down from the top.</p>
        </div>
        <div class="slide-section slide-diagonal" #slideElement>
          <h2>Slide Diagonal</h2>
          <p>This section slides in diagonally.</p>
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

    .slide-section {
      margin: 100vh 0;
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      opacity: 0;
      transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .slide-left {
      transform: translateX(-100px);
    }

    .slide-right {
      transform: translateX(100px);
    }

    .slide-up {
      transform: translateY(100px);
    }

    .slide-down {
      transform: translateY(-100px);
    }

    .slide-diagonal {
      transform: translate(-100px, 100px);
    }

    .slide-section.visible {
      opacity: 1;
      transform: translate(0, 0);
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
export class SlideComponent implements AfterViewInit {
  @ViewChildren('slideElement') slideElements!: QueryList<ElementRef>;

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.checkSlideElements();
  }

  ngAfterViewInit() {
    setTimeout(() => this.checkSlideElements(), 0);
  }

  private checkSlideElements() {
    const slideElements = this.slideElements.toArray();
    slideElements.forEach(element => {
      const rect = element.nativeElement.getBoundingClientRect();
      const isVisible = rect.top <= window.innerHeight * 0.8;
      if (isVisible) {
        element.nativeElement.classList.add('visible');
      }
    });
  }
} 
import { Component, ElementRef, HostListener, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from '../../app/shared/back-button.component';

@Component({
  selector: 'app-fade',
  standalone: true,
  imports: [CommonModule, BackButtonComponent],
  template: `
    <app-back-button [text]="'Back to Scroll Effects'" path="/scroll-effects"></app-back-button>
    <div class="container">
      <h1>Fade Scroll Effect</h1>
      <p class="description">Elements that fade in as you scroll</p>
      <div class="content">
        <div class="fade-section" #fadeElement>
          <h2>Section 1</h2>
          <p>Scroll down to see more sections fade in smoothly.</p>
        </div>
        <div class="fade-section" #fadeElement>
          <h2>Section 2</h2>
          <p>Each section fades in when it enters the viewport.</p>
        </div>
        <div class="fade-section" #fadeElement>
          <h2>Section 3</h2>
          <p>The fade animation is triggered by scroll position.</p>
        </div>
        <div class="fade-section fade-up" #fadeElement>
          <h2>Section 4</h2>
          <p>This section fades in and slides up.</p>
        </div>
        <div class="fade-section fade-scale" #fadeElement>
          <h2>Section 5</h2>
          <p>This section fades in and scales up.</p>
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

    .fade-section {
      margin: 100vh 0;
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .fade-section.visible {
      opacity: 1;
      transform: translateY(0);
    }

    .fade-up {
      transform: translateY(40px);
    }

    .fade-scale {
      transform: scale(0.9);
    }

    .fade-scale.visible {
      transform: scale(1);
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
export class FadeComponent implements AfterViewInit {
  @ViewChildren('fadeElement') fadeElements!: QueryList<ElementRef>;

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.checkFadeElements();
  }

  ngAfterViewInit() {
    setTimeout(() => this.checkFadeElements(), 0);
  }

  private checkFadeElements() {
    const fadeElements = this.fadeElements.toArray();
    fadeElements.forEach(element => {
      const rect = element.nativeElement.getBoundingClientRect();
      const isVisible = rect.top <= window.innerHeight * 0.8;
      if (isVisible) {
        element.nativeElement.classList.add('visible');
      }
    });
  }
} 
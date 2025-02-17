import { Component, ElementRef, HostListener, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from '../../app/shared/back-button.component';

@Component({
  selector: 'app-sticky',
  standalone: true,
  imports: [CommonModule, BackButtonComponent],
  template: `
    <app-back-button [text]="'Back to Scroll Effects'" path="/scroll-effects"></app-back-button>
    <div class="container">
      <h1>Sticky Scroll Effect</h1>
      <p class="description">Elements that stick to viewport while scrolling</p>
      <div class="content">
        <div class="sticky-section">
          <div class="sticky-element" #stickyElement>
            <div class="progress-bar" [style.width.%]="progress"></div>
            <div class="sticky-content">
              <h2>Sticky Progress</h2>
              <p>Scroll to see the progress bar fill</p>
            </div>
          </div>
          <div class="scroll-content">
            <div class="panel" *ngFor="let i of [1,2,3,4]">
              <h3>Section {{i}}</h3>
              <p>This content scrolls beneath the sticky header. The progress bar indicates how far you've scrolled.</p>
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

    .content {
      max-width: 800px;
      margin: 0 auto;
    }

    .sticky-section {
      position: relative;
      padding-top: 100px;
    }

    .sticky-element {
      position: sticky;
      top: 0;
      background: white;
      padding: 2rem;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      z-index: 10;
    }

    .progress-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 4px;
      background: #7000ff;
      transition: width 0.1s ease;
    }

    .sticky-content {
      text-align: left;
    }

    .scroll-content {
      padding: 2rem 0;
    }

    .panel {
      margin: 2rem 0;
      padding: 3rem;
      background: #f8f9fa;
      border-radius: 8px;
      text-align: left;
    }

    h2 {
      margin: 0 0 1rem;
      color: #333;
    }

    h3 {
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
export class StickyComponent implements AfterViewInit {
  progress = 0;

  @ViewChildren('stickyElement') stickyElements!: QueryList<ElementRef>;

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.updateProgress();
  }

  ngAfterViewInit() {
    this.updateProgress();
  }

  private updateProgress() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrolled = window.pageYOffset;
    
    // Calculate progress percentage
    this.progress = (scrolled / (documentHeight - windowHeight)) * 100;
  }
} 
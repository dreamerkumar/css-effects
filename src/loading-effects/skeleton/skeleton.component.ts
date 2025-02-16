import { Component } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  template: `
    <div class="container">
      <h1>Skeleton Loading Effect</h1>
      <p class="description">Content placeholder with shimmer animation</p>
      <div class="demo">
        <div class="card">
          <div class="skeleton-image"></div>
          <div class="skeleton-content">
            <div class="skeleton-title"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text last"></div>
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
      padding: 4rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .card {
      width: 300px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      overflow: hidden;
    }

    .skeleton-image {
      width: 100%;
      height: 200px;
      background: #e2e5e7;
      position: relative;
      overflow: hidden;
    }

    .skeleton-content {
      padding: 1.5rem;
    }

    .skeleton-title {
      width: 85%;
      height: 20px;
      background: #e2e5e7;
      margin-bottom: 1rem;
      border-radius: 4px;
      position: relative;
      overflow: hidden;
    }

    .skeleton-text {
      width: 100%;
      height: 10px;
      background: #e2e5e7;
      margin-bottom: 0.5rem;
      border-radius: 4px;
      position: relative;
      overflow: hidden;
    }

    .skeleton-text.last {
      width: 60%;
    }

    .skeleton-image::after,
    .skeleton-title::after,
    .skeleton-text::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      animation: shimmer 2s infinite;
      background: linear-gradient(
        90deg,
        rgba(255,255,255,0) 0%,
        rgba(255,255,255,0.5) 50%,
        rgba(255,255,255,0) 100%
      );
      transform: translateX(-100%);
    }

    @keyframes shimmer {
      100% {
        transform: translateX(100%);
      }
    }
  `]
})
export class SkeletonComponent {} 
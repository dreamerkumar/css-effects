import { Component } from '@angular/core';

@Component({
  selector: 'app-blur',
  standalone: true,
  template: `
    <div class="container">
      <h1>Blur Filter Effect</h1>
      <p class="description">Dynamic blur transitions</p>
      <div class="demo">
        <div class="blur-grid">
          <div class="blur-box hover-blur">
            <img src="https://picsum.photos/400/300?random=1" alt="Random image 1">
            <div class="content">
              <h3>Hover Blur</h3>
              <p>Hover to focus</p>
            </div>
          </div>
          <div class="blur-box background-blur">
            <img src="https://picsum.photos/400/300?random=2" alt="Random image 2">
            <div class="content">
              <h3>Background Blur</h3>
              <p>Hover to reveal</p>
            </div>
          </div>
          <div class="blur-box partial-blur">
            <img src="https://picsum.photos/400/300?random=3" alt="Random image 3">
            <div class="content">
              <h3>Partial Blur</h3>
              <p>Hover to clear</p>
            </div>
          </div>
          <div class="blur-box radial-blur">
            <img src="https://picsum.photos/400/300?random=4" alt="Random image 4">
            <div class="content">
              <h3>Radial Blur</h3>
              <p>Hover to focus center</p>
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
      background: #f8f9fa;
      border-radius: 8px;
    }

    .blur-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    .blur-box {
      position: relative;
      border-radius: 8px;
      overflow: hidden;
      cursor: pointer;
      aspect-ratio: 4/3;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: filter 0.3s ease;
    }

    .content {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: white;
      background: rgba(0,0,0,0.4);
      transition: opacity 0.3s ease;
    }

    /* Hover Blur Effect */
    .hover-blur img {
      filter: blur(5px);
    }

    .hover-blur:hover img {
      filter: blur(0);
    }

    /* Background Blur Effect */
    .background-blur .content {
      backdrop-filter: blur(10px);
      background: rgba(0,0,0,0.2);
      opacity: 0;
    }

    .background-blur:hover .content {
      opacity: 1;
    }

    /* Partial Blur Effect */
    .partial-blur img {
      filter: blur(5px);
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    }

    .partial-blur::after {
      content: '';
      position: absolute;
      inset: 0;
      background: inherit;
      filter: blur(0);
      clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
      transition: clip-path 0.3s ease;
    }

    .partial-blur:hover::after {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    }

    /* Radial Blur Effect */
    .radial-blur img {
      filter: blur(5px);
    }

    .radial-blur::after {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(
        circle at center,
        transparent 0%,
        rgba(0,0,0,0.8) 100%
      );
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .radial-blur:hover img {
      filter: blur(0);
    }

    .radial-blur:hover::after {
      opacity: 1;
    }

    h3 {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    }

    p {
      margin: 0;
      opacity: 0.8;
      text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
    }
  `]
})
export class BlurComponent {} 
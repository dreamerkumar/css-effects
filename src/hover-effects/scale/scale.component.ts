import { Component } from '@angular/core';

@Component({
  selector: 'app-scale',
  standalone: true,
  template: `
    <div class="container">
      <h1>Scale Hover Effect</h1>
      <p class="description">Elements that smoothly scale up on hover</p>
      <div class="demo">
        <div class="grid">
          <div class="card">
            <img src="https://picsum.photos/300/200" alt="Random image">
            <div class="content">
              <h3>Hover Me</h3>
              <p>Smooth scale transition</p>
            </div>
          </div>
          <div class="card scale-up">
            <img src="https://picsum.photos/300/201" alt="Random image">
            <div class="content">
              <h3>Scale Up</h3>
              <p>Larger scale effect</p>
            </div>
          </div>
          <div class="card scale-rotate">
            <img src="https://picsum.photos/300/202" alt="Random image">
            <div class="content">
              <h3>Scale & Rotate</h3>
              <p>Combined effects</p>
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
      padding: 4rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      max-width: 1000px;
    }

    .card {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
    }

    img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .content {
      padding: 1.5rem;
    }

    h3 {
      margin: 0 0 0.5rem;
      color: #333;
    }

    p {
      margin: 0;
      color: #666;
    }

    .card:hover {
      transform: scale(1.05);
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
    }

    .scale-up:hover {
      transform: scale(1.1);
    }

    .scale-rotate:hover {
      transform: scale(1.05) rotate(2deg);
    }

    .card:hover img {
      transform: scale(1.1);
    }
  `]
})
export class ScaleComponent {} 
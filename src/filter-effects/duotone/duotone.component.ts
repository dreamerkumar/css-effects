import { Component } from '@angular/core';

@Component({
  selector: 'app-duotone',
  standalone: true,
  template: `
    <div class="container">
      <h1>Duotone Filter Effect</h1>
      <p class="description">Two-color filter transformations</p>
      <div class="demo">
        <div class="duotone-grid">
          <div class="duotone-box purple-yellow">
            <img src="https://picsum.photos/400/300?random=1" alt="Random image 1">
            <div class="content">
              <h3>Purple & Yellow</h3>
              <p>Hover to transform</p>
            </div>
          </div>
          <div class="duotone-box blue-red">
            <img src="https://picsum.photos/400/300?random=2" alt="Random image 2">
            <div class="content">
              <h3>Blue & Red</h3>
              <p>Hover to transform</p>
            </div>
          </div>
          <div class="duotone-box green-pink">
            <img src="https://picsum.photos/400/300?random=3" alt="Random image 3">
            <div class="content">
              <h3>Green & Pink</h3>
              <p>Hover to transform</p>
            </div>
          </div>
          <div class="duotone-box orange-blue">
            <img src="https://picsum.photos/400/300?random=4" alt="Random image 4">
            <div class="content">
              <h3>Orange & Blue</h3>
              <p>Hover to transform</p>
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

    .duotone-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    .duotone-box {
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
      filter: grayscale(100%) contrast(1.2);
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
      transition: opacity 0.3s;
    }

    .duotone-box:hover .content {
      opacity: 0;
    }

    /* Purple & Yellow Duotone */
    .purple-yellow img {
      mix-blend-mode: hard-light;
      filter: grayscale(100%) contrast(1.2);
    }

    .purple-yellow::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(45deg, #7c4dff, #ffd700);
      mix-blend-mode: screen;
      opacity: 0;
      transition: opacity 0.3s;
    }

    .purple-yellow:hover::before {
      opacity: 1;
    }

    /* Blue & Red Duotone */
    .blue-red img {
      mix-blend-mode: hard-light;
      filter: grayscale(100%) contrast(1.2);
    }

    .blue-red::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(45deg, #00b4db, #ff3366);
      mix-blend-mode: screen;
      opacity: 0;
      transition: opacity 0.3s;
    }

    .blue-red:hover::before {
      opacity: 1;
    }

    /* Green & Pink Duotone */
    .green-pink img {
      mix-blend-mode: hard-light;
      filter: grayscale(100%) contrast(1.2);
    }

    .green-pink::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(45deg, #00c853, #ff4081);
      mix-blend-mode: screen;
      opacity: 0;
      transition: opacity 0.3s;
    }

    .green-pink:hover::before {
      opacity: 1;
    }

    /* Orange & Blue Duotone */
    .orange-blue img {
      mix-blend-mode: hard-light;
      filter: grayscale(100%) contrast(1.2);
    }

    .orange-blue::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(45deg, #ff9800, #2196f3);
      mix-blend-mode: screen;
      opacity: 0;
      transition: opacity 0.3s;
    }

    .orange-blue:hover::before {
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
export class DuotoneComponent {} 
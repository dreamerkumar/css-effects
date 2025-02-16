import { Component } from '@angular/core';

@Component({
  selector: 'app-glassmorphism',
  standalone: true,
  template: `
    <div class="container">
      <h1>Glassmorphism Card Effect</h1>
      <p class="description">Modern frosted glass effect with blur and transparency</p>
      <div class="demo">
        <div class="background">
          <div class="shape"></div>
          <div class="shape"></div>
        </div>
        <div class="card">
          <h2>Glass Card</h2>
          <p>Frosted glass effect with backdrop blur</p>
          <button>Learn More</button>
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
      position: relative;
      min-height: 300px;
      background: #161623;
      border-radius: 8px;
      overflow: hidden;
    }

    .background {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }

    .shape {
      position: absolute;
      filter: blur(50px);
      border-radius: 50%;
    }

    .shape:nth-child(1) {
      width: 200px;
      height: 200px;
      top: -50px;
      right: -60px;
      background: #ff359b;
    }

    .shape:nth-child(2) {
      width: 150px;
      height: 150px;
      bottom: -30px;
      left: -40px;
      background: #17d9e3;
    }

    .card {
      position: relative;
      width: 300px;
      padding: 2rem;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border-radius: 16px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      color: white;
      letter-spacing: 0.5px;
    }

    h2 {
      margin: 0 0 1rem;
      font-size: 1.5rem;
      font-weight: 500;
    }

    p {
      margin: 0 0 1.5rem;
      font-size: 1rem;
      opacity: 0.8;
    }

    button {
      background: rgba(255, 255, 255, 0.2);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.2);
      padding: 0.5rem 1.5rem;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    button:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  `]
})
export class GlassmorphismComponent {} 
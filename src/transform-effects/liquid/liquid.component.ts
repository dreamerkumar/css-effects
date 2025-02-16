import { Component } from '@angular/core';

@Component({
  selector: 'app-liquid',
  standalone: true,
  template: `
    <div class="container">
      <h1>Liquid Transform Effect</h1>
      <p class="description">Fluid-like shape transformations</p>
      <div class="demo">
        <div class="liquid-grid">
          <div class="liquid-box blob">
            <div class="content">
              <h3>Liquid Blob</h3>
              <p>Hover to animate</p>
            </div>
          </div>
          <div class="liquid-box wave">
            <div class="content">
              <h3>Wave Motion</h3>
              <p>Hover to animate</p>
            </div>
          </div>
          <div class="liquid-box droplet">
            <div class="content">
              <h3>Droplet</h3>
              <p>Hover to animate</p>
            </div>
          </div>
          <div class="liquid-box splash">
            <div class="content">
              <h3>Splash</h3>
              <p>Hover to animate</p>
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

    .liquid-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    .liquid-box {
      height: 300px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      position: relative;
      cursor: pointer;
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      background: linear-gradient(135deg, #00b4db, #0083b0);
    }

    .content {
      position: relative;
      z-index: 1;
    }

    .blob {
      border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
      animation: blob 8s linear infinite;
      transform-origin: center;
    }

    .blob:hover {
      animation: blob 3s linear infinite;
    }

    .wave {
      border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
      animation: wave 8s linear infinite;
    }

    .wave:hover {
      animation: wave 3s linear infinite;
    }

    .droplet {
      border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
      animation: droplet 8s linear infinite;
    }

    .droplet:hover {
      animation: droplet 3s linear infinite;
    }

    .splash {
      border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
      animation: splash 8s linear infinite;
    }

    .splash:hover {
      animation: splash 3s linear infinite;
    }

    @keyframes blob {
      0% { border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%; }
      25% { border-radius: 45% 55% 65% 35% / 50% 50% 50% 50%; }
      50% { border-radius: 50% 50% 55% 45% / 45% 45% 55% 55%; }
      75% { border-radius: 55% 45% 45% 55% / 40% 60% 40% 60%; }
      100% { border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%; }
    }

    @keyframes wave {
      0% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
      25% { border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%; }
      50% { border-radius: 30% 70% 70% 30% / 70% 70% 30% 30%; }
      75% { border-radius: 70% 30% 30% 70% / 30% 30% 70% 70%; }
      100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
    }

    @keyframes droplet {
      0% { border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%; }
      25% { border-radius: 45% 55% 55% 45% / 65% 65% 35% 35%; }
      50% { border-radius: 40% 60% 60% 40% / 70% 70% 30% 30%; }
      75% { border-radius: 45% 55% 55% 45% / 65% 65% 35% 35%; }
      100% { border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%; }
    }

    @keyframes splash {
      0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
      25% { border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%; }
      50% { border-radius: 40% 60% 70% 30% / 40% 70% 30% 60%; }
      75% { border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%; }
      100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
    }

    h3 {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
    }

    p {
      margin: 0;
      opacity: 0.8;
    }
  `]
})
export class LiquidComponent {} 
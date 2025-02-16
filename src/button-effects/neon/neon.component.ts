import { Component } from '@angular/core';

@Component({
  selector: 'app-neon',
  standalone: true,
  template: `
    <div class="container">
      <h1>Neon Button Effect</h1>
      <p class="description">Button with glowing neon effect and hover animation</p>
      <div class="demo">
        <button class="neon-button">
          Glow
        </button>
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
      background: #1a1a1a;
      border-radius: 8px;
    }

    .neon-button {
      font-size: 1.1rem;
      display: inline-block;
      cursor: pointer;
      text-decoration: none;
      color: #00ff9f;
      border: #00ff9f 2px solid;
      padding: 1rem 2rem;
      border-radius: 4px;
      background: transparent;
      position: relative;
      text-transform: uppercase;
      letter-spacing: 4px;
      transition: all 0.3s ease;
    }

    .neon-button::before {
      content: '';
      position: absolute;
      background: #00ff9f;
      top: 120%;
      left: 0;
      width: 100%;
      height: 100%;
      transform: perspective(1.5em) rotateX(40deg) scale(1, 0.35);
      filter: blur(2em);
      opacity: 0;
      transition: all 0.3s ease;
    }

    .neon-button:hover {
      color: #1a1a1a;
      background: #00ff9f;
      box-shadow: 0 0 2em 0.5em #00ff9f;
    }

    .neon-button:hover::before {
      opacity: 0.4;
    }

    .neon-button:active {
      box-shadow: 0 0 0.5em 0.25em #00ff9f;
      transform: scale(0.98);
    }
  `]
})
export class NeonComponent {} 
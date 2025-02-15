import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shatter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>Shatter Transform Effect</h1>
      <p class="description">Elements breaking apart and reassembling</p>
      <div class="demo">
        <div class="shatter-grid">
          <div class="shatter-box pieces">
            <div class="piece" *ngFor="let i of [1,2,3,4,5,6,7,8,9]"></div>
            <div class="content">
              <h3>Pieces</h3>
              <p>Hover to shatter</p>
            </div>
          </div>
          <div class="shatter-box explosion">
            <div class="fragment" *ngFor="let i of [1,2,3,4,5,6,7,8]"></div>
            <div class="content">
              <h3>Explosion</h3>
              <p>Hover to break</p>
            </div>
          </div>
          <div class="shatter-box dissolve">
            <div class="particle" *ngFor="let i of [1,2,3,4,5,6,7,8,9,10]"></div>
            <div class="content">
              <h3>Dissolve</h3>
              <p>Hover to dissolve</p>
            </div>
          </div>
          <div class="shatter-box glitch">
            <div class="glitch-slice" *ngFor="let i of [1,2,3,4,5]"></div>
            <div class="content">
              <h3>Glitch</h3>
              <p>Hover to split</p>
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

    .shatter-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    .shatter-box {
      height: 300px;
      position: relative;
      background: linear-gradient(135deg, #7c4dff, #5c00d2);
      border-radius: 8px;
      cursor: pointer;
      overflow: hidden;
    }

    .content {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: white;
      z-index: 1;
      transition: opacity 0.3s;
    }

    .shatter-box:hover .content {
      opacity: 0;
    }

    /* Pieces Effect */
    .piece {
      position: absolute;
      width: 33.33%;
      height: 33.33%;
      background: inherit;
      transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .pieces .piece:nth-child(1) { top: 0; left: 0; }
    .pieces .piece:nth-child(2) { top: 0; left: 33.33%; }
    .pieces .piece:nth-child(3) { top: 0; left: 66.66%; }
    .pieces .piece:nth-child(4) { top: 33.33%; left: 0; }
    .pieces .piece:nth-child(5) { top: 33.33%; left: 33.33%; }
    .pieces .piece:nth-child(6) { top: 33.33%; left: 66.66%; }
    .pieces .piece:nth-child(7) { top: 66.66%; left: 0; }
    .pieces .piece:nth-child(8) { top: 66.66%; left: 33.33%; }
    .pieces .piece:nth-child(9) { top: 66.66%; left: 66.66%; }

    .pieces:hover .piece:nth-child(1) { transform: translate(-100%, -100%) rotate(-20deg); }
    .pieces:hover .piece:nth-child(2) { transform: translateY(-100%) rotate(15deg); }
    .pieces:hover .piece:nth-child(3) { transform: translate(100%, -100%) rotate(25deg); }
    .pieces:hover .piece:nth-child(4) { transform: translateX(-100%) rotate(-15deg); }
    .pieces:hover .piece:nth-child(5) { transform: scale(0) rotate(45deg); }
    .pieces:hover .piece:nth-child(6) { transform: translateX(100%) rotate(15deg); }
    .pieces:hover .piece:nth-child(7) { transform: translate(-100%, 100%) rotate(25deg); }
    .pieces:hover .piece:nth-child(8) { transform: translateY(100%) rotate(-15deg); }
    .pieces:hover .piece:nth-child(9) { transform: translate(100%, 100%) rotate(-25deg); }

    /* Explosion Effect */
    .fragment {
      position: absolute;
      width: 25%;
      height: 25%;
      background: inherit;
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    }

    .explosion .fragment:nth-child(1) { top: 0; left: 0; }
    .explosion .fragment:nth-child(2) { top: 0; left: 50%; }
    .explosion .fragment:nth-child(3) { top: 25%; left: 25%; }
    .explosion .fragment:nth-child(4) { top: 25%; left: 75%; }
    .explosion .fragment:nth-child(5) { top: 50%; left: 0; }
    .explosion .fragment:nth-child(6) { top: 50%; left: 50%; }
    .explosion .fragment:nth-child(7) { top: 75%; left: 25%; }
    .explosion .fragment:nth-child(8) { top: 75%; left: 75%; }

    .explosion:hover .fragment {
      transform: scale(2) rotate(45deg);
      opacity: 0;
    }

    /* Dissolve Effect */
    .particle {
      position: absolute;
      width: 10%;
      height: 10%;
      background: inherit;
      border-radius: 50%;
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .dissolve .particle {
      transform: scale(0);
      opacity: 0;
    }

    .dissolve:hover .particle {
      transform: scale(1) translate(var(--x, 0), var(--y, 0));
      opacity: 1;
    }

    /* Glitch Effect */
    .glitch-slice {
      position: absolute;
      width: 100%;
      height: 20%;
      background: inherit;
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .glitch .glitch-slice:nth-child(1) { top: 0; }
    .glitch .glitch-slice:nth-child(2) { top: 20%; }
    .glitch .glitch-slice:nth-child(3) { top: 40%; }
    .glitch .glitch-slice:nth-child(4) { top: 60%; }
    .glitch .glitch-slice:nth-child(5) { top: 80%; }

    .glitch:hover .glitch-slice:nth-child(odd) {
      transform: translateX(-10%) skewY(5deg);
    }

    .glitch:hover .glitch-slice:nth-child(even) {
      transform: translateX(10%) skewY(-5deg);
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
export class ShatterComponent {
  constructor() {
    // Set random positions for dissolve particles
    setTimeout(() => {
      const particles = document.querySelectorAll('.dissolve .particle');
      particles.forEach(particle => {
        const x = (Math.random() - 0.5) * 200;
        const y = (Math.random() - 0.5) * 200;
        (particle as HTMLElement).style.setProperty('--x', `${x}%`);
        (particle as HTMLElement).style.setProperty('--y', `${y}%`);
      });
    });
  }
} 
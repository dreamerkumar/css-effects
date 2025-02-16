import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patterns',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>SVG Patterns Effect</h1>
      <p class="description">Dynamic SVG pattern generation and animation</p>
      <div class="demo">
        <div class="controls">
          <select (change)="changePattern($event)">
            <option value="dots">Dots</option>
            <option value="lines">Lines</option>
            <option value="grid">Grid</option>
            <option value="waves">Waves</option>
            <option value="animated">Animated</option>
          </select>
        </div>
        <div class="svg-container">
          <svg viewBox="0 0 300 300">
            <defs>
              <!-- Dots Pattern -->
              <pattern id="dots" 
                      width="20" height="20" 
                      patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="3" fill="#7c4dff"/>
              </pattern>

              <!-- Lines Pattern -->
              <pattern id="lines" 
                      width="20" height="20" 
                      patternUnits="userSpaceOnUse"
                      patternTransform="rotate(45)">
                <line x1="0" y1="10" x2="20" y2="10" 
                      stroke="#7c4dff" stroke-width="2"/>
              </pattern>

              <!-- Grid Pattern -->
              <pattern id="grid" 
                      width="30" height="30" 
                      patternUnits="userSpaceOnUse">
                <rect width="30" height="30" fill="none" 
                      stroke="#7c4dff" stroke-width="1"/>
                <circle cx="15" cy="15" r="5" fill="#7c4dff"/>
              </pattern>

              <!-- Waves Pattern -->
              <pattern id="waves" 
                      width="60" height="30" 
                      patternUnits="userSpaceOnUse">
                <path d="M0,15 Q15,0 30,15 Q45,30 60,15" 
                      fill="none" stroke="#7c4dff" stroke-width="2"/>
              </pattern>

              <!-- Animated Pattern -->
              <pattern id="animated" 
                      width="50" height="50" 
                      patternUnits="userSpaceOnUse">
                <rect width="50" height="50" fill="none" 
                      stroke="#7c4dff" stroke-width="1">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 25 25"
                    to="360 25 25"
                    dur="10s"
                    repeatCount="indefinite"/>
                </rect>
                <circle cx="25" cy="25" r="10" fill="#7c4dff">
                  <animate
                    attributeName="r"
                    values="10;15;10"
                    dur="2s"
                    repeatCount="indefinite"/>
                </circle>
              </pattern>
            </defs>

            <!-- Pattern Demo Shapes -->
            <g [attr.fill]="'url(#' + currentPattern + ')'">
              <rect x="50" y="50" width="200" height="100" rx="10"/>
              <circle cx="150" cy="200" r="50"/>
              <path d="M100,250 L200,250 L150,300 Z"/>
            </g>
          </svg>
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
      background: #1a1a1a;
      border-radius: 8px;
    }

    .controls {
      margin-bottom: 2rem;
      display: flex;
      gap: 1rem;
      justify-content: center;
      align-items: center;
    }

    select {
      padding: 0.5rem 1.5rem;
      background: #7c4dff;
      border: none;
      border-radius: 4px;
      color: white;
      cursor: pointer;
      transition: background 0.3s;
    }

    select:hover {
      background: #6c3fff;
    }

    .svg-container {
      width: 100%;
      max-width: 400px;
      margin: 0 auto;
      background: #000;
      border-radius: 8px;
      padding: 2rem;
    }

    svg {
      width: 100%;
      height: auto;
    }
  `]
})
export class PatternsComponent {
  currentPattern = 'dots';

  changePattern(event: Event) {
    this.currentPattern = (event.target as HTMLSelectElement).value;
  }
} 
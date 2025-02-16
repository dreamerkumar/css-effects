import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-animation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>SVG Animation Effect</h1>
      <p class="description">Complex SVG animations using SMIL and CSS</p>
      <div class="demo">
        <div class="controls">
          <select (change)="changeAnimation($event)">
            <option value="transform">Transform</option>
            <option value="motion">Motion Path</option>
            <option value="morph">Shape Morph</option>
            <option value="dash">Dash Array</option>
            <option value="combined">Combined</option>
          </select>
        </div>
        <div class="svg-container">
          <svg viewBox="0 0 300 300">
            <!-- Transform Animation -->
            <g *ngIf="currentAnimation === 'transform'">
              <rect x="100" y="100" width="100" height="100" fill="#7c4dff">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 150 150"
                  to="360 150 150"
                  dur="3s"
                  repeatCount="indefinite"/>
                <animate
                  attributeName="opacity"
                  values="1;0.5;1"
                  dur="3s"
                  repeatCount="indefinite"/>
              </rect>
            </g>

            <!-- Motion Path Animation -->
            <g *ngIf="currentAnimation === 'motion'">
              <path
                d="M50,150 C50,50 250,50 250,150 C250,250 50,250 50,150"
                fill="none"
                stroke="#333"
                stroke-width="2"/>
              <circle r="20" fill="#7c4dff">
                <animateMotion
                  dur="3s"
                  repeatCount="indefinite"
                  path="M50,150 C50,50 250,50 250,150 C250,250 50,250 50,150"/>
              </circle>
            </g>

            <!-- Shape Morph Animation -->
            <g *ngIf="currentAnimation === 'morph'">
              <path [attr.d]="currentPath" fill="#7c4dff">
                <animate
                  attributeName="d"
                  dur="3s"
                  repeatCount="indefinite"
                  values="M100,100 L200,100 L200,200 L100,200 Z;
                         M150,50 L250,150 L150,250 L50,150 Z;
                         M100,100 L200,100 L200,200 L100,200 Z"/>
              </path>
            </g>

            <!-- Dash Array Animation -->
            <g *ngIf="currentAnimation === 'dash'">
              <path
                d="M50,150 C50,50 250,50 250,150 C250,250 50,250 50,150"
                fill="none"
                stroke="#7c4dff"
                stroke-width="4"
                stroke-dasharray="20"
                stroke-linecap="round">
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="200"
                  dur="2s"
                  repeatCount="indefinite"/>
              </path>
            </g>

            <!-- Combined Animations -->
            <g *ngIf="currentAnimation === 'combined'">
              <circle cx="150" cy="150" r="50" fill="#7c4dff">
                <animate
                  attributeName="r"
                  values="50;60;50"
                  dur="2s"
                  repeatCount="indefinite"/>
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 150 150"
                  to="360 150 150"
                  dur="4s"
                  repeatCount="indefinite"/>
              </circle>
              <circle cx="150" cy="150" r="70" 
                      fill="none" 
                      stroke="#ff4081" 
                      stroke-width="2"
                      stroke-dasharray="10">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="360 150 150"
                  to="0 150 150"
                  dur="4s"
                  repeatCount="indefinite"/>
              </circle>
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
export class AnimationComponent {
  currentAnimation = 'transform';
  currentPath = 'M100,100 L200,100 L200,200 L100,200 Z';

  changeAnimation(event: Event) {
    this.currentAnimation = (event.target as HTMLSelectElement).value;
  }
} 
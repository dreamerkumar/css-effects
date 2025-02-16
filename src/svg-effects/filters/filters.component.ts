import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>SVG Filters Effect</h1>
      <p class="description">Advanced SVG filter effects and combinations</p>
      <div class="demo">
        <div class="controls">
          <select (change)="changeFilter($event)">
            <option value="turbulence">Turbulence</option>
            <option value="morphology">Morphology</option>
            <option value="displacement">Displacement</option>
            <option value="lighting">Lighting</option>
            <option value="composite">Composite</option>
          </select>
        </div>
        <div class="svg-container">
          <svg viewBox="0 0 300 300">
            <!-- Define filters -->
            <defs>
              <!-- Turbulence filter -->
              <filter id="turbulence" x="-50%" y="-50%" width="200%" height="200%">
                <feTurbulence 
                  type="fractalNoise" 
                  baseFrequency="0.01" 
                  numOctaves="3" 
                  result="noise">
                  <animate 
                    attributeName="baseFrequency" 
                    dur="30s" 
                    values="0.01;0.02;0.01" 
                    repeatCount="indefinite"/>
                </feTurbulence>
                <feDisplacementMap 
                  in="SourceGraphic" 
                  in2="noise" 
                  scale="50"/>
              </filter>

              <!-- Morphology filter -->
              <filter id="morphology">
                <feMorphology 
                  operator="dilate" 
                  radius="2" 
                  result="dilate"/>
                <feMorphology 
                  in="dilate" 
                  operator="erode" 
                  radius="1"/>
                <feGaussianBlur stdDeviation="1"/>
                <feFlood flood-color="#7c4dff" flood-opacity="0.5"/>
                <feComposite operator="in" in2="SourceGraphic"/>
                <feComposite operator="over" in2="SourceGraphic"/>
              </filter>

              <!-- Displacement filter -->
              <filter id="displacement">
                <feTurbulence 
                  type="turbulence" 
                  baseFrequency="0.05" 
                  numOctaves="2" 
                  result="turbulence"/>
                <feDisplacementMap 
                  in="SourceGraphic" 
                  in2="turbulence" 
                  scale="20" 
                  xChannelSelector="R" 
                  yChannelSelector="G"/>
              </filter>

              <!-- Lighting filter -->
              <filter id="lighting">
                <feDiffuseLighting 
                  result="light" 
                  surfaceScale="5" 
                  diffuseConstant="2" 
                  lighting-color="#7c4dff">
                  <fePointLight x="150" y="60" z="20">
                    <animate 
                      attributeName="x" 
                      from="0" 
                      to="300" 
                      dur="4s" 
                      repeatCount="indefinite"/>
                  </fePointLight>
                </feDiffuseLighting>
                <feComposite 
                  in="SourceGraphic" 
                  in2="light" 
                  operator="arithmetic" 
                  k1="1" k2="0" k3="0" k4="0"/>
              </filter>

              <!-- Composite filter -->
              <filter id="composite">
                <feGaussianBlur stdDeviation="5" result="blur"/>
                <feColorMatrix 
                  in="blur" 
                  type="matrix" 
                  values="1 0 0 0 0
                          0 1 0 0 0
                          0 0 1 0 0
                          0 0 0 18 -7" 
                  result="glow"/>
                <feComposite 
                  in="SourceGraphic" 
                  in2="glow" 
                  operator="over"/>
              </filter>
            </defs>

            <!-- Sample shapes with filters -->
            <g [attr.filter]="currentFilter">
              <circle cx="150" cy="150" r="50" fill="#7c4dff"/>
              <rect x="120" y="120" width="60" height="60" fill="#ff4081"/>
              <path d="M150,80 L190,140 L110,140 Z" fill="#ffd740"/>
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
export class FiltersComponent {
  currentFilter = 'url(#turbulence)';

  changeFilter(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.currentFilter = `url(#${value})`;
  }
} 
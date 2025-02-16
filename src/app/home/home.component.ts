import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface EffectSection {
  title: string;
  path: string;
  description: string;
  gradient: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>CSS Effects Gallery</h1>
      <p class="description">Explore our collection of beautiful CSS effects and animations</p>
      
      <div class="card-grid">
        <div class="card" *ngFor="let section of sections" (click)="navigateToSection(section.path)">
          <div class="card-content" [style.background]="section.gradient">
            <h2>{{section.title}}</h2>
            <p>{{section.description}}</p>
            <div class="shine"></div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
      min-height: 100vh;
      background: #f8f9fa;
    }

    h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
      text-align: center;
      color: #333;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 2px;
    }

    .description {
      text-align: center;
      color: #666;
      margin-bottom: 4rem;
      font-size: 1.2rem;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 2.5rem;
      padding: 1rem;
    }

    .card {
      position: relative;
      border-radius: 20px;
      overflow: hidden;
      cursor: pointer;
      transition: all 0.5s cubic-bezier(0.23, 1, 0.320, 1);
      background: white;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }

    .card-content {
      position: relative;
      height: 250px;
      padding: 2.5rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: white;
      text-align: center;
      z-index: 1;
    }

    .shine {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        45deg,
        transparent 0%,
        rgba(255, 255, 255, 0.2) 50%,
        transparent 100%
      );
      transition: transform 0.5s cubic-bezier(0.23, 1, 0.320, 1);
      transform: translateX(-100%);
      z-index: 2;
    }

    .card:hover {
      transform: scale(1.05) translateY(-10px);
      box-shadow: 0 20px 40px rgba(0,0,0,0.2);
    }

    .card:hover .shine {
      transform: translateX(100%);
    }

    h2 {
      margin: 0 0 1rem;
      font-size: 2rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      position: relative;
    }

    h2::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 50px;
      height: 3px;
      background: rgba(255,255,255,0.5);
      border-radius: 2px;
    }

    p {
      margin: 0;
      font-size: 1.1rem;
      opacity: 0.9;
      line-height: 1.6;
      max-width: 280px;
    }

    @media (max-width: 768px) {
      .container {
        padding: 1rem;
      }

      .card-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      h1 {
        font-size: 2.5rem;
      }

      .card-content {
        height: 200px;
      }
    }
  `]
})
export class HomeComponent {
  sections: EffectSection[] = [
    {
      title: 'Text Effects',
      path: 'text-effects',
      description: 'Beautiful typography animations and effects',
      gradient: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)'
    },
    {
      title: 'Sound Effects',
      path: 'sound-effects',
      description: 'Audio-reactive visual effects and animations',
      gradient: 'linear-gradient(135deg, #A8E6CF, #3498DB)'
    },
    {
      title: '3D Effects',
      path: '3d-effects',
      description: 'Immersive 3D transformations and animations',
      gradient: 'linear-gradient(135deg, #3498DB, #2C3E50)'
    },
    {
      title: 'Card Effects',
      path: 'card-effects',
      description: 'Interactive card hover and click animations',
      gradient: 'linear-gradient(135deg, #6C5CE7, #a044ff)'
    },
    {
      title: 'Button Effects',
      path: 'button-effects',
      description: 'Engaging button interactions and animations',
      gradient: 'linear-gradient(135deg, #FF4B2B, #FF416C)'
    },
    {
      title: 'Input Effects',
      path: 'input-effects',
      description: 'Form input animations and validations',
      gradient: 'linear-gradient(135deg, #00B4DB, #0083B0)'
    },
    {
      title: 'Loading Effects',
      path: 'loading-effects',
      description: 'Creative loading and progress animations',
      gradient: 'linear-gradient(135deg, #F2994A, #F2C94C)'
    },
    {
      title: 'Scroll Effects',
      path: 'scroll-effects',
      description: 'Scroll-triggered animations and transitions',
      gradient: 'linear-gradient(135deg, #11998e, #38ef7d)'
    },
    {
      title: 'Hover Effects',
      path: 'hover-effects',
      description: 'Mouse hover interactions and animations',
      gradient: 'linear-gradient(135deg, #FC466B, #3F5EFB)'
    },
    {
      title: 'Transform Effects',
      path: 'transform-effects',
      description: 'Shape morphing and transformation effects',
      gradient: 'linear-gradient(135deg, #654ea3, #eaafc8)'
    },
    {
      title: 'SVG Effects',
      path: 'svg-effects',
      description: 'Vector graphics animations and filters',
      gradient: 'linear-gradient(135deg, #009FFF, #ec2F4B)'
    },
    {
      title: 'Background Effects',
      path: 'background-effects',
      description: 'Dynamic and animated backgrounds',
      gradient: 'linear-gradient(135deg, #1D976C, #93F9B9)'
    },
    {
      title: 'Cursor Effects',
      path: 'cursor-effects',
      description: 'Custom cursor animations and interactions',
      gradient: 'linear-gradient(135deg, #7F00FF, #E100FF)'
    }
  ];

  constructor(private router: Router) {}

  navigateToSection(path: string) {
    this.router.navigate([path]);
  }
} 
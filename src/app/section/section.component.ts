import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from '../shared/back-button.component';

interface Effect {
  path: string;
  label: string;
  description: string;
  gradient: string;
}

interface SectionData {
  [key: string]: {
    title: string;
    description: string;
    effects: Effect[];
  };
}

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [CommonModule, BackButtonComponent],
  template: `
    <div class="container" *ngIf="currentSection">
      <h1>{{currentSection.title}}</h1>
      <p class="description">{{currentSection.description}}</p>
      
      <app-back-button [text]="'Back to Home'" path="/"></app-back-button>
      
      <div class="card-grid">
        <div class="card" *ngFor="let effect of currentSection.effects" 
             (click)="navigateToEffect(effect.path)">
          <div class="card-content" [style.background]="effect.gradient">
            <h2>{{effect.label}}</h2>
            <p>{{effect.description}}</p>
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
export class SectionComponent implements OnInit {
  currentSection: any;
  sectionData: SectionData = {
    'text-effects': {
      title: 'Text Effects',
      description: 'Explore our collection of text animations and effects',
      effects: [
        {
          path: 'neon',
          label: 'Neon',
          description: 'Glowing neon text effect with pulsing animation',
          gradient: 'linear-gradient(135deg, #00F5A0, #00D9F5)'
        },
        {
          path: 'gradient',
          label: 'Gradient',
          description: 'Animated gradient background with text mask effect',
          gradient: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)'
        },
        {
          path: 'glitch',
          label: 'Glitch',
          description: 'A glitchy text effect with RGB shift and distortion',
          gradient: 'linear-gradient(135deg, #FF416C, #FF4B2B)'
        },
        {
          path: 'wave',
          label: 'Wave',
          description: 'Text animation that creates a wave-like motion effect',
          gradient: 'linear-gradient(135deg, #4158D0, #C850C0)'
        },
        {
          path: 'typing',
          label: 'Typing',
          description: 'Simulates typing text with a blinking cursor',
          gradient: 'linear-gradient(135deg, #0093E9, #80D0C7)'
        },
        {
          path: 'shadow',
          label: 'Shadow',
          description: 'Dynamic 3D shadow effect with hover animation',
          gradient: 'linear-gradient(135deg, #8EC5FC, #E0C3FC)'
        },
        {
          path: 'reveal',
          label: 'Reveal',
          description: 'Text that reveals itself with a sliding animation',
          gradient: 'linear-gradient(135deg, #FBB034, #FFDD00)'
        },
        {
          path: 'rainbow',
          label: 'Rainbow',
          description: 'Text with animated rainbow colors and sparkle effect',
          gradient: 'linear-gradient(135deg, #FF0000, #00FF00, #0000FF)'
        },
        {
          path: 'fire',
          label: 'Fire',
          description: 'Text that appears to be burning with animated flames',
          gradient: 'linear-gradient(135deg, #F83600, #FE8C00)'
        },
        {
          path: 'matrix',
          label: 'Matrix',
          description: 'Digital rain effect inspired by The Matrix',
          gradient: 'linear-gradient(135deg, #000000, #1F9E40)'
        }
      ]
    },
    'sound-effects': {
      title: 'Sound Effects',
      description: 'Audio-reactive visual effects and animations',
      effects: [
        {
          path: 'visualizer',
          label: 'Visualizer',
          description: 'Real-time audio visualization with bars',
          gradient: 'linear-gradient(135deg, #FF61D2, #FE9090)'
        },
        {
          path: 'waveform',
          label: 'Waveform',
          description: 'Oscilloscope-style audio visualization',
          gradient: 'linear-gradient(135deg, #4B6CB7, #182848)'
        },
        {
          path: 'spectrum',
          label: 'Spectrum',
          description: 'Detailed frequency spectrum analysis',
          gradient: 'linear-gradient(135deg, #00C9FF, #92FE9D)'
        },
        {
          path: 'particles',
          label: 'Particles',
          description: 'Sound-reactive particle animations',
          gradient: 'linear-gradient(135deg, #7F7FD5, #86A8E7)'
        },
        {
          path: 'equalizer',
          label: 'Equalizer',
          description: 'Interactive frequency band control',
          gradient: 'linear-gradient(135deg, #654EA3, #EAAFC8)'
        }
      ]
    },
    '3d-effects': {
      title: '3D Effects',
      description: 'Immersive 3D transformations and animations',
      effects: [
        {
          path: 'cube',
          label: 'Cube',
          description: 'Interactive 3D cube with CSS transforms',
          gradient: 'linear-gradient(135deg, #3498DB, #2C3E50)'
        },
        {
          path: 'carousel',
          label: 'Carousel',
          description: 'Rotating 3D carousel with perspective transforms',
          gradient: 'linear-gradient(135deg, #4A00E0, #8E2DE2)'
        },
        {
          path: 'flip',
          label: 'Flip',
          description: 'Smooth 3D card flip animations',
          gradient: 'linear-gradient(135deg, #8E54E9, #4776E6)'
        },
        {
          path: 'fold',
          label: 'Fold',
          description: 'Paper folding animations with 3D transforms',
          gradient: 'linear-gradient(135deg, #396AFC, #2948FF)'
        },
        {
          path: 'perspective',
          label: 'Perspective',
          description: 'Dynamic perspective transformations',
          gradient: 'linear-gradient(135deg, #1A2980, #26D0CE)'
        }
      ]
    },
    'card-effects': {
      title: 'Card Effects',
      description: 'Interactive card hover and click animations',
      effects: [
        {
          path: 'flip',
          label: 'Flip',
          description: 'Interactive card with smooth 3D flip animation',
          gradient: 'linear-gradient(135deg, #6C5CE7, #a044ff)'
        },
        {
          path: 'hover',
          label: 'Hover',
          description: 'Smooth elevation and transform effects on hover',
          gradient: 'linear-gradient(135deg, #FF0099, #493240)'
        },
        {
          path: 'glassmorphism',
          label: 'Glassmorphism',
          description: 'Modern frosted glass effect with blur',
          gradient: 'linear-gradient(135deg, #8BC6EC, #9599E2)'
        },
        {
          path: 'parallax',
          label: 'Parallax',
          description: 'Interactive 3D parallax effect on mouse move',
          gradient: 'linear-gradient(135deg, #4158D0, #C850C0)'
        },
        {
          path: 'morph',
          label: 'Morph',
          description: 'Shape-shifting card with smooth morphing animations',
          gradient: 'linear-gradient(135deg, #43CBFF, #9708CC)'
        }
      ]
    },
    'button-effects': {
      title: 'Button Effects',
      description: 'Engaging button interactions and animations',
      effects: [
        {
          path: 'magnetic',
          label: 'Magnetic',
          description: 'Button that attracts the cursor with a magnetic effect',
          gradient: 'linear-gradient(135deg, #FF4B2B, #FF416C)'
        },
        {
          path: 'neon',
          label: 'Neon',
          description: 'Button with glowing neon effect and hover animation',
          gradient: 'linear-gradient(135deg, #00F5A0, #00D9F5)'
        },
        {
          path: 'liquid',
          label: 'Liquid',
          description: 'Button with liquid-like animation on hover',
          gradient: 'linear-gradient(135deg, #4973ff, #5e2de5)'
        },
        {
          path: 'ripple',
          label: 'Ripple',
          description: 'Material-style ripple animation on click',
          gradient: 'linear-gradient(135deg, #2196F3, #1976D2)'
        },
        {
          path: 'pulse',
          label: 'Pulse',
          description: 'Button with smooth pulsing animation',
          gradient: 'linear-gradient(135deg, #4CAF50, #45a049)'
        }
      ]
    },
    'input-effects': {
      title: 'Input Effects',
      description: 'Form input animations and validations',
      effects: [
        {
          path: 'shake',
          label: 'Shake',
          description: 'Input field with shake animation for validation',
          gradient: 'linear-gradient(135deg, #ff4444, #cc0000)'
        },
        {
          path: 'expand',
          label: 'Expand',
          description: 'Input field that expands on focus',
          gradient: 'linear-gradient(135deg, #00B4DB, #0083B0)'
        },
        {
          path: 'glow',
          label: 'Glow',
          description: 'Input field with neon glow effect on focus',
          gradient: 'linear-gradient(135deg, #00ff9f, #00d9ff)'
        },
        {
          path: 'underline',
          label: 'Underline',
          description: 'Input field with animated underline effect',
          gradient: 'linear-gradient(135deg, #5264AE, #3f51b5)'
        },
        {
          path: 'floating',
          label: 'Floating',
          description: 'Input field with smoothly floating label',
          gradient: 'linear-gradient(135deg, #7000ff, #6200ea)'
        }
      ]
    },
    'loading-effects': {
      title: 'Loading Effects',
      description: 'Creative loading and progress animations',
      effects: [
        {
          path: 'pulse',
          label: 'Pulse',
          description: 'Content placeholder with pulsing animation',
          gradient: 'linear-gradient(135deg, #F2994A, #F2C94C)'
        },
        {
          path: 'progress',
          label: 'Progress',
          description: 'Linear progress bar with smooth animation',
          gradient: 'linear-gradient(135deg, #7000ff, #6200ea)'
        },
        {
          path: 'skeleton',
          label: 'Skeleton',
          description: 'Content placeholder with shimmer animation',
          gradient: 'linear-gradient(135deg, #e2e5e7, #b0b5b9)'
        },
        {
          path: 'dots',
          label: 'Dots',
          description: 'Bouncing dots animation with staggered timing',
          gradient: 'linear-gradient(135deg, #7000ff, #6200ea)'
        },
        {
          path: 'spinner',
          label: 'Spinner',
          description: 'Animated loading spinner with gradient effect',
          gradient: 'linear-gradient(135deg, #7000ff, #6200ea)'
        }
      ]
    },
    'scroll-effects': {
      title: 'Scroll Effects',
      description: 'Scroll-triggered animations and transitions',
      effects: [
        {
          path: 'sticky',
          label: 'Sticky',
          description: 'Elements that stick to viewport while scrolling',
          gradient: 'linear-gradient(135deg, #11998e, #38ef7d)'
        },
        {
          path: 'parallax',
          label: 'Parallax',
          description: 'Elements that move at different speeds while scrolling',
          gradient: 'linear-gradient(135deg, #2193b0, #6dd5ed)'
        },
        {
          path: 'zoom',
          label: 'Zoom',
          description: 'Elements that zoom in as you scroll',
          gradient: 'linear-gradient(135deg, #b24592, #f15f79)'
        },
        {
          path: 'slide',
          label: 'Slide',
          description: 'Elements that slide in from different directions',
          gradient: 'linear-gradient(135deg, #00b09b, #96c93d)'
        },
        {
          path: 'fade',
          label: 'Fade',
          description: 'Elements that fade in as you scroll',
          gradient: 'linear-gradient(135deg, #4b6cb7, #182848)'
        }
      ]
    },
    'hover-effects': {
      title: 'Hover Effects',
      description: 'Mouse hover interactions and animations',
      effects: [
        {
          path: 'float',
          label: 'Float',
          description: 'Elements with floating animations on hover',
          gradient: 'linear-gradient(135deg, #FC466B, #3F5EFB)'
        },
        {
          path: 'tilt',
          label: 'Tilt',
          description: 'Elements that tilt based on mouse position',
          gradient: 'linear-gradient(135deg, #c471ed, #f64f59)'
        },
        {
          path: 'rotate',
          label: 'Rotate',
          description: 'Elements with 3D rotation animations on hover',
          gradient: 'linear-gradient(135deg, #6C5CE7, #a044ff)'
        },
        {
          path: 'scale',
          label: 'Scale',
          description: 'Elements that smoothly scale up on hover',
          gradient: 'linear-gradient(135deg, #FF0099, #493240)'
        }
      ]
    },
    'transform-effects': {
      title: 'Transform Effects',
      description: 'Shape morphing and transformation effects',
      effects: [
        {
          path: 'liquid',
          label: 'Liquid',
          description: 'Fluid-like shape transformations',
          gradient: 'linear-gradient(135deg, #654ea3, #eaafc8)'
        },
        {
          path: 'morph',
          label: 'Morph',
          description: 'Smooth transitions between shapes',
          gradient: 'linear-gradient(135deg, #43CBFF, #9708CC)'
        },
        {
          path: 'shatter',
          label: 'Shatter',
          description: 'Elements breaking apart and reassembling',
          gradient: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)'
        },
        {
          path: 'elastic',
          label: 'Elastic',
          description: 'Spring and bounce animations',
          gradient: 'linear-gradient(135deg, #00F5A0, #00D9F5)'
        },
        {
          path: 'fold',
          label: 'Fold',
          description: 'Origami-style folding animations',
          gradient: 'linear-gradient(135deg, #4973ff, #5e2de5)'
        }
      ]
    },
    'svg-effects': {
      title: 'SVG Effects',
      description: 'Vector graphics animations and filters',
      effects: [
        {
          path: 'morphing',
          label: 'Morphing',
          description: 'Smooth transitions between SVG shapes',
          gradient: 'linear-gradient(135deg, #009FFF, #ec2F4B)'
        },
        {
          path: 'drawing',
          label: 'Drawing',
          description: 'Path drawing and tracing animations',
          gradient: 'linear-gradient(135deg, #00C9FF, #92FE9D)'
        },
        {
          path: 'filters',
          label: 'Filters',
          description: 'Advanced SVG filter effects and combinations',
          gradient: 'linear-gradient(135deg, #7F7FD5, #86A8E7)'
        },
        {
          path: 'animation',
          label: 'Animation',
          description: 'Complex SVG animations using SMIL and CSS',
          gradient: 'linear-gradient(135deg, #654EA3, #EAAFC8)'
        },
        {
          path: 'patterns',
          label: 'Patterns',
          description: 'Dynamic SVG pattern generation and animation',
          gradient: 'linear-gradient(135deg, #FF61D2, #FE9090)'
        }
      ]
    },
    'background-effects': {
      title: 'Background Effects',
      description: 'Dynamic and animated backgrounds',
      effects: [
        {
          path: 'noise',
          label: 'Noise',
          description: 'Animated noise patterns with different styles',
          gradient: 'linear-gradient(135deg, #1D976C, #93F9B9)'
        },
        {
          path: 'mesh',
          label: 'Mesh',
          description: 'Interactive geometric mesh patterns',
          gradient: 'linear-gradient(135deg, #2193b0, #6dd5ed)'
        },
        {
          path: 'waves',
          label: 'Waves',
          description: 'Animated wave patterns using canvas',
          gradient: 'linear-gradient(135deg, #00B4DB, #0083B0)'
        },
        {
          path: 'particles',
          label: 'Particles',
          description: 'Interactive particle system with mouse tracking',
          gradient: 'linear-gradient(135deg, #4B6CB7, #182848)'
        },
        {
          path: 'gradient',
          label: 'Gradient',
          description: 'Animated gradient backgrounds with different patterns',
          gradient: 'linear-gradient(135deg, #FF416C, #FF4B2B)'
        }
      ]
    },
    'cursor-effects': {
      title: 'Cursor Effects',
      description: 'Custom cursor animations and interactions',
      effects: [
        {
          path: 'custom',
          label: 'Custom',
          description: 'Custom cursor shapes and animations',
          gradient: 'linear-gradient(135deg, #7F00FF, #E100FF)'
        },
        {
          path: 'trail',
          label: 'Trail',
          description: 'Cursor with trailing particles',
          gradient: 'linear-gradient(135deg, #b24592, #f15f79)'
        },
        {
          path: 'magnetic',
          label: 'Magnetic',
          description: 'Elements that attract the cursor',
          gradient: 'linear-gradient(135deg, #00b09b, #96c93d)'
        },
        {
          path: 'spotlight',
          label: 'Spotlight',
          description: 'Cursor creates a spotlight effect',
          gradient: 'linear-gradient(135deg, #4b6cb7, #182848)'
        },
        {
          path: 'distortion',
          label: 'Distortion',
          description: 'Cursor distorts content as it moves',
          gradient: 'linear-gradient(135deg, #FF61D2, #FE9090)'
        }
      ]
    }
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const sectionPath = this.route.snapshot.url[0].path;
    this.currentSection = this.sectionData[sectionPath];
  }

  navigateToEffect(path: string) {
    const sectionPath = this.route.snapshot.url[0].path;
    this.router.navigate([sectionPath, path]);
  }
} 
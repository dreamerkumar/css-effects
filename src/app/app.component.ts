import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

interface NavSection {
  title: string;
  expanded: boolean;
  items: NavItem[];
}

interface NavItem {
  path: string;
  label: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <header class="top-nav">
      <div class="logo-section">
        <svg class="logo" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="logo-text">CSS Effects</span>
      </div>
      <a href="https://rulecms.com" class="credit" target="_blank" rel="noopener">
        Created with <span class="heart">♥</span> by the RuleCMS Team
      </a>
    </header>

    <div class="app-container" [class.nav-expanded]="isNavExpanded">
      <button class="nav-toggle" (click)="toggleNav()">
        <span class="menu-icon"></span>
      </button>
      
      <nav class="sidebar">
        <div class="nav-sections">
          <div class="section" *ngFor="let section of navSections">
            <div class="section-header" (click)="toggleSection(section)">
              <span>{{section.title}}</span>
              <span class="arrow" [class.expanded]="section.expanded">▸</span>
            </div>
            <div class="section-items" [class.expanded]="section.expanded">
              <a *ngFor="let item of section.items"
                 [routerLink]="[section.title.toLowerCase().replace(' ', '-'), item.path]"
                 routerLinkActive="active"
                 class="nav-item">
                {{item.label}}
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main class="content">
        <router-outlet />
      </main>
    </div>
  `,
  styles: [`
    .top-nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 64px;
      background: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 2rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      z-index: 1000;
    }

    .logo-section {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .logo {
      width: 32px;
      height: 32px;
      color: #7000ff;
    }

    .logo-text {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 1.5rem;
      color: #1a1a1a;
      letter-spacing: -0.02em;
    }

    .credit {
      font-family: var(--font-primary);
      font-size: 0.9rem;
      color: #666;
      text-decoration: none;
      transition: color 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .credit:hover {
      color: #7000ff;
    }

    .heart {
      color: #ff4081;
      display: inline-block;
      animation: heartbeat 1.5s ease infinite;
    }

    @keyframes heartbeat {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }

    .app-container {
      padding-top: 64px;
    }

    .nav-toggle {
      top: 76px;
    }

    .sidebar {
      top: 64px;
      height: calc(100vh - 64px);
    }

    .app-container {
      display: flex;
      min-height: 100vh;
    }

    .nav-toggle {
      position: fixed;
      top: 1rem;
      left: 1rem;
      z-index: 1000;
      width: 40px;
      height: 40px;
      border: none;
      border-radius: 4px;
      background: #7000ff;
      cursor: pointer;
      display: none;
    }

    .menu-icon {
      display: block;
      width: 20px;
      height: 2px;
      background: white;
      position: relative;
      margin: auto;
    }

    .menu-icon::before,
    .menu-icon::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background: white;
      transition: transform 0.3s;
    }

    .menu-icon::before { transform: translateY(-6px); }
    .menu-icon::after { transform: translateY(6px); }

    .nav-expanded .menu-icon {
      background: transparent;
    }

    .nav-expanded .menu-icon::before {
      transform: rotate(45deg);
    }

    .nav-expanded .menu-icon::after {
      transform: rotate(-45deg);
    }

    .sidebar {
      width: 280px;
      background: #1a1a1a;
      padding: 2rem 0;
      overflow-y: auto;
      height: 100vh;
      position: fixed;
      transition: transform 0.3s ease;
    }

    .nav-sections {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .section-header {
      padding: 0.75rem 1.5rem;
      color: #fff;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .section-header:hover {
      background: rgba(255,255,255,0.1);
    }

    .arrow {
      transition: transform 0.3s;
    }

    .arrow.expanded {
      transform: rotate(90deg);
    }

    .section-items {
      display: none;
      flex-direction: column;
      padding: 0.5rem 0;
      background: rgba(0,0,0,0.2);
    }

    .section-items.expanded {
      display: flex;
    }

    .nav-item {
      padding: 0.5rem 2rem;
      color: #ccc;
      text-decoration: none;
      transition: all 0.3s;
    }

    .nav-item:hover {
      background: rgba(255,255,255,0.1);
      color: white;
    }

    .nav-item.active {
      color: #7000ff;
      background: rgba(112, 0, 255, 0.1);
    }

    .content {
      flex: 1;
      margin-left: 280px;
      padding: 2rem;
    }

    @media (max-width: 768px) {
      .nav-toggle {
        display: block;
      }

      .sidebar {
        transform: translateX(-100%);
      }

      .content {
        margin-left: 0;
      }

      .nav-expanded .sidebar {
        transform: translateX(0);
      }

      .top-nav {
        padding: 0 1rem;
      }

      .credit {
        font-size: 0.8rem;
      }

      .logo-text {
        font-size: 1.2rem;
      }
    }
  `]
})
export class AppComponent {
  isNavExpanded = true;
  
  navSections: NavSection[] = [
    {
      title: 'Text Effects',
      expanded: true,
      items: [
        { path: 'neon', label: 'Neon' },
        { path: 'gradient', label: 'Gradient' },
        { path: 'glitch', label: 'Glitch' },
        { path: 'wave', label: 'Wave' },
        { path: 'typing', label: 'Typing' },
        { path: 'shadow', label: 'Shadow' },
        { path: 'reveal', label: 'Reveal' },
        { path: 'rainbow', label: 'Rainbow' },
        { path: 'fire', label: 'Fire' },
        { path: 'matrix', label: 'Matrix' }
      ]
    },
    {
      title: 'Sound Effects',
      expanded: false,
      items: [
        { path: 'visualizer', label: 'Visualizer' },
        { path: 'waveform', label: 'Waveform' },
        { path: 'spectrum', label: 'Spectrum' },
        { path: 'particles', label: 'Particles' },
        { path: 'equalizer', label: 'Equalizer' }
      ]
    },
    {
      title: '3D Effects',
      expanded: false,
      items: [
        { path: 'cube', label: 'Cube' },
        { path: 'carousel', label: 'Carousel' },
        { path: 'flip', label: 'Flip' },
        { path: 'fold', label: 'Fold' },
        { path: 'perspective', label: 'Perspective' }
      ]
    },
    {
      title: 'Card Effects',
      expanded: false,
      items: [
        { path: 'flip', label: 'Flip' },
        { path: 'hover', label: 'Hover' },
        { path: 'glassmorphism', label: 'Glassmorphism' },
        { path: 'parallax', label: 'Parallax' },
        { path: 'morph', label: 'Morph' }
      ]
    },
    {
      title: 'Button Effects',
      expanded: false,
      items: [
        { path: 'magnetic', label: 'Magnetic' },
        { path: 'neon', label: 'Neon' },
        { path: 'liquid', label: 'Liquid' },
        { path: 'ripple', label: 'Ripple' },
        { path: 'pulse', label: 'Pulse' }
      ]
    },
    {
      title: 'Input Effects',
      expanded: false,
      items: [
        { path: 'shake', label: 'Shake' },
        { path: 'expand', label: 'Expand' },
        { path: 'glow', label: 'Glow' },
        { path: 'underline', label: 'Underline' },
        { path: 'floating', label: 'Floating' }
      ]
    },
    {
      title: 'Loading Effects',
      expanded: false,
      items: [
        { path: 'pulse', label: 'Pulse' },
        { path: 'progress', label: 'Progress' },
        { path: 'skeleton', label: 'Skeleton' },
        { path: 'dots', label: 'Dots' },
        { path: 'spinner', label: 'Spinner' }
      ]
    },
    {
      title: 'Scroll Effects',
      expanded: false,
      items: [
        { path: 'sticky', label: 'Sticky' },
        { path: 'parallax', label: 'Parallax' },
        { path: 'zoom', label: 'Zoom' },
        { path: 'slide', label: 'Slide' },
        { path: 'fade', label: 'Fade' }
      ]
    },
    {
      title: 'Hover Effects',
      expanded: false,
      items: [
        { path: 'float', label: 'Float' },
        { path: 'tilt', label: 'Tilt' },
        { path: 'rotate', label: 'Rotate' },
        { path: 'scale', label: 'Scale' }
      ]
    },
    {
      title: 'Transform Effects',
      expanded: false,
      items: [
        { path: 'liquid', label: 'Liquid' },
        { path: 'morph', label: 'Morph' },
        { path: 'shatter', label: 'Shatter' },
        { path: 'elastic', label: 'Elastic' },
        { path: 'fold', label: 'Fold' }
      ]
    },
    {
      title: 'SVG Effects',
      expanded: false,
      items: [
        { path: 'morphing', label: 'Morphing' },
        { path: 'drawing', label: 'Drawing' },
        { path: 'filters', label: 'Filters' },
        { path: 'animation', label: 'Animation' },
        { path: 'patterns', label: 'Patterns' }
      ]
    },
    {
      title: 'Background Effects',
      expanded: false,
      items: [
        { path: 'noise', label: 'Noise' },
        { path: 'mesh', label: 'Mesh' },
        { path: 'waves', label: 'Waves' },
        { path: 'particles', label: 'Particles' },
        { path: 'gradient', label: 'Gradient' }
      ]
    },
    {
      title: 'Cursor Effects',
      expanded: false,
      items: [
        { path: 'custom', label: 'Custom' },
        { path: 'trail', label: 'Trail' },
        { path: 'magnetic', label: 'Magnetic' },
        { path: 'spotlight', label: 'Spotlight' },
        { path: 'distortion', label: 'Distortion' }
      ]
    }
  ];

  toggleNav() {
    this.isNavExpanded = !this.isNavExpanded;
  }

  toggleSection(section: NavSection) {
    section.expanded = !section.expanded;
  }
}

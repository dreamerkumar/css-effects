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

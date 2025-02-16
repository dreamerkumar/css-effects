import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-parallax',
  standalone: true,
  template: `
    <div class="container">
      <h1>Parallax Card Effect</h1>
      <p class="description">Interactive 3D parallax effect that responds to mouse movement</p>
      <div class="demo">
        <div class="card" #card
             (mousemove)="handleMouseMove($event)"
             (mouseleave)="handleMouseLeave()">
          <div class="card-content">
            <div class="card-layer" style="--depth: 1">
              <h2>Parallax</h2>
            </div>
            <div class="card-layer" style="--depth: 2">
              <p>Move your mouse around</p>
            </div>
            <div class="card-layer" style="--depth: 3">
              <div class="circle"></div>
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
      padding: 4rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .card {
      width: 300px;
      height: 200px;
      background: linear-gradient(45deg, #2c3e50, #3498db);
      border-radius: 16px;
      position: relative;
      overflow: hidden;
      transform-style: preserve-3d;
      transform: perspective(1000px);
      cursor: pointer;
    }

    .card-content {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transform-style: preserve-3d;
    }

    .card-layer {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      transform: translateZ(calc(var(--depth) * 20px));
      pointer-events: none;
    }

    h2 {
      color: white;
      font-size: 2rem;
      margin: 0;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }

    p {
      color: rgba(255,255,255,0.8);
      font-size: 1rem;
      margin: 0;
    }

    .circle {
      width: 80px;
      height: 80px;
      background: rgba(255,255,255,0.1);
      border-radius: 50%;
      box-shadow: inset 0 0 20px rgba(255,255,255,0.2);
    }
  `]
})
export class ParallaxComponent {
  handleMouseMove(e: MouseEvent) {
    const card = e.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = -(x - centerX) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }

  handleMouseLeave() {
    const card = document.querySelector('.card') as HTMLElement;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  }
} 
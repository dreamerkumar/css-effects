import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-noise',
  standalone: true,
  template: `
    <div class="container">
      <h1>Noise Background Effect</h1>
      <p class="description">Animated noise patterns with different styles</p>
      <div class="demo">
        <div class="noise-grid">
          <div class="noise-box static">
            <h3>Static Noise</h3>
            <p>Basic noise pattern</p>
          </div>
          <div class="noise-box animated">
            <h3>Animated Noise</h3>
            <p>Moving noise effect</p>
          </div>
          <div class="noise-box colored">
            <h3>Colored Noise</h3>
            <p>Multi-color pattern</p>
          </div>
          <div class="noise-box canvas" #noiseCanvas>
            <h3>Dynamic Noise</h3>
            <p>Generated pattern</p>
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

    .noise-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
      max-width: 1000px;
      margin: 0 auto;
    }

    .noise-box {
      height: 300px;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: white;
      text-shadow: 0 2px 4px rgba(0,0,0,0.2);
      overflow: hidden;
      position: relative;
    }

    .static {
      background-color: #2c3e50;
      position: relative;
    }

    .static::after {
      content: "";
      position: absolute;
      inset: 0;
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAElBMVEUAAAD///////////////////8+Uq06AAAABnRSTlMAoKCgoKDv7+/XAAAANklEQVQ4y2NgQAX8DKiAH48kAw5JhrlYJRnm4pBkmItHkmEuPkmGuQQkGeYSlGSYS4QkwwAGANi/G0cGvSNOAAAAAElFTkSuQmCC');
      opacity: 0.2;
    }

    .animated {
      background-color: #8e44ad;
      position: relative;
    }

    .animated::after {
      content: "";
      position: absolute;
      inset: 0;
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAElBMVEUAAAD///////////////////8+Uq06AAAABnRSTlMAoKCgoKDv7+/XAAAANklEQVQ4y2NgQAX8DKiAH48kAw5JhrlYJRnm4pBkmItHkmEuPkmGuQQkGeYSlGSYS4QkwwAGANi/G0cGvSNOAAAAAElFTkSuQmCC');
      opacity: 0.2;
      animation: noise 0.5s steps(2) infinite;
    }

    .colored {
      background: linear-gradient(45deg, #ff3366, #ba265d);
      position: relative;
    }

    .colored::after {
      content: "";
      position: absolute;
      inset: 0;
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAElBMVEUAAAD///////////////////8+Uq06AAAABnRSTlMAoKCgoKDv7+/XAAAANklEQVQ4y2NgQAX8DKiAH48kAw5JhrlYJRnm4pBkmItHkmEuPkmGuQQkGeYSlGSYS4QkwwAGANi/G0cGvSNOAAAAAElFTkSuQmCC');
      mix-blend-mode: overlay;
      opacity: 0.3;
      animation: noise 0.5s steps(2) infinite;
    }

    .canvas {
      background: #34495e;
    }

    h3 {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
      z-index: 1;
    }

    p {
      margin: 0;
      opacity: 0.8;
      z-index: 1;
    }

    @keyframes noise {
      0% { transform: translate(0, 0); }
      10% { transform: translate(-5%, -5%); }
      20% { transform: translate(-10%, 5%); }
      30% { transform: translate(5%, -10%); }
      40% { transform: translate(-5%, 15%); }
      50% { transform: translate(-10%, 5%); }
      60% { transform: translate(15%, 0); }
      70% { transform: translate(0, 10%); }
      80% { transform: translate(3%, 35%); }
      90% { transform: translate(-10%, 10%); }
    }
  `]
})
export class NoiseComponent implements AfterViewInit, OnDestroy {
  @ViewChild('noiseCanvas') canvasRef!: ElementRef<HTMLDivElement>;
  private animationFrame: number = 0;

  ngAfterViewInit() {
    this.generateDynamicNoise();
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationFrame);
  }

  private generateDynamicNoise() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const container = this.canvasRef.nativeElement;
    
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.opacity = '0.2';
    
    container.appendChild(canvas);

    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };
    
    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value;     // red
        data[i + 1] = value; // green
        data[i + 2] = value; // blue
        data[i + 3] = 255;   // alpha
      }
      
      ctx.putImageData(imageData, 0, 0);
      this.animationFrame = requestAnimationFrame(animate);
    };

    animate();
  }
} 
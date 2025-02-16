import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-distortion',
  standalone: true,
  template: `
    <div class="container">
      <h1>Distortion Filter Effect</h1>
      <p class="description">Wave and ripple distortions</p>
      <div class="demo">
        <div class="distortion-grid">
          <div class="distortion-box">
            <canvas #canvas1 class="wave"></canvas>
            <div class="content">
              <h3>Wave</h3>
              <p>Hover to ripple</p>
            </div>
          </div>
          <div class="distortion-box">
            <canvas #canvas2 class="ripple"></canvas>
            <div class="content">
              <h3>Ripple</h3>
              <p>Hover to wave</p>
            </div>
          </div>
          <div class="distortion-box">
            <canvas #canvas3 class="twist"></canvas>
            <div class="content">
              <h3>Twist</h3>
              <p>Hover to swirl</p>
            </div>
          </div>
          <div class="distortion-box">
            <canvas #canvas4 class="bulge"></canvas>
            <div class="content">
              <h3>Bulge</h3>
              <p>Hover to distort</p>
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

    .distortion-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    .distortion-box {
      position: relative;
      border-radius: 8px;
      overflow: hidden;
      cursor: pointer;
      aspect-ratio: 4/3;
    }

    canvas {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .content {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: white;
      background: rgba(0,0,0,0.4);
      transition: opacity 0.3s;
      pointer-events: none;
    }

    .distortion-box:hover .content {
      opacity: 0;
    }

    h3 {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    }

    p {
      margin: 0;
      opacity: 0.8;
      text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
    }
  `]
})
export class DistortionComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas1') canvas1!: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvas2') canvas2!: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvas3') canvas3!: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvas4') canvas4!: ElementRef<HTMLCanvasElement>;

  private images: HTMLImageElement[] = [];
  private contexts: CanvasRenderingContext2D[] = [];
  private mouse = { x: 0, y: 0 };
  private animationFrames: number[] = [];

  ngAfterViewInit() {
    this.initCanvases();
    this.loadImages();
  }

  ngOnDestroy() {
    this.animationFrames.forEach(frame => cancelAnimationFrame(frame));
  }

  private initCanvases() {
    const canvases = [
      this.canvas1.nativeElement,
      this.canvas2.nativeElement,
      this.canvas3.nativeElement,
      this.canvas4.nativeElement
    ];

    canvases.forEach((canvas, i) => {
      canvas.width = 400;
      canvas.height = 300;
      const ctx = canvas.getContext('2d');
      if (ctx) this.contexts[i] = ctx;
    });
  }

  private loadImages() {
    const urls = [
      'https://picsum.photos/400/300?random=1',
      'https://picsum.photos/400/300?random=2',
      'https://picsum.photos/400/300?random=3',
      'https://picsum.photos/400/300?random=4'
    ];

    urls.forEach((url, i) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = url;
      img.onload = () => {
        this.images[i] = img;
        this.contexts[i].drawImage(img, 0, 0);
        this.addDistortionEffect(i);
      };
    });
  }

  private addDistortionEffect(index: number) {
    const canvas = [this.canvas1, this.canvas2, this.canvas3, this.canvas4][index].nativeElement;
    const ctx = this.contexts[index];
    const img = this.images[index];

    canvas.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });

    canvas.addEventListener('mouseenter', () => {
      this.animate(ctx, img, index);
    });

    canvas.addEventListener('mouseleave', () => {
      cancelAnimationFrame(this.animationFrames[index]);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    });
  }

  private animate(ctx: CanvasRenderingContext2D, img: HTMLImageElement, effect: number) {
    const draw = () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      switch(effect) {
        case 0: // Wave
          this.drawWave(ctx, img);
          break;
        case 1: // Ripple
          this.drawRipple(ctx, img);
          break;
        case 2: // Twist
          this.drawTwist(ctx, img);
          break;
        case 3: // Bulge
          this.drawBulge(ctx, img);
          break;
      }

      this.animationFrames[effect] = requestAnimationFrame(draw);
    };

    draw();
  }

  private drawWave(ctx: CanvasRenderingContext2D, img: HTMLImageElement) {
    const time = Date.now() * 0.002;
    const centerY = ctx.canvas.height / 2;
    
    for(let i = 0; i < ctx.canvas.width; i++) {
      const y = centerY + Math.sin(i * 0.02 + time) * 20;
      ctx.drawImage(img, i, 0, 1, ctx.canvas.height, i, y - centerY, 1, ctx.canvas.height);
    }
  }

  private drawRipple(ctx: CanvasRenderingContext2D, img: HTMLImageElement) {
    const time = Date.now() * 0.001;
    
    for(let y = 0; y < ctx.canvas.height; y++) {
      for(let x = 0; x < ctx.canvas.width; x++) {
        const distance = Math.sqrt(Math.pow(x - this.mouse.x, 2) + Math.pow(y - this.mouse.y, 2));
        const wave = Math.sin(distance * 0.05 - time * 5) * 10;
        ctx.drawImage(img, x, y, 1, 1, x + wave, y + wave, 1, 1);
      }
    }
  }

  private drawTwist(ctx: CanvasRenderingContext2D, img: HTMLImageElement) {
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;
    
    for(let y = 0; y < ctx.canvas.height; y++) {
      for(let x = 0; x < ctx.canvas.width; x++) {
        const dx = x - centerX;
        const dy = y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) + distance * 0.005;
        const newX = centerX + Math.cos(angle) * distance;
        const newY = centerY + Math.sin(angle) * distance;
        ctx.drawImage(img, x, y, 1, 1, newX, newY, 1, 1);
      }
    }
  }

  private drawBulge(ctx: CanvasRenderingContext2D, img: HTMLImageElement) {
    const strength = 50;
    const radius = 100;
    
    for(let y = 0; y < ctx.canvas.height; y++) {
      for(let x = 0; x < ctx.canvas.width; x++) {
        const dx = x - this.mouse.x;
        const dy = y - this.mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if(distance < radius) {
          const factor = 1 - Math.pow(distance / radius, 2);
          const bulgeX = x - dx * factor * strength / radius;
          const bulgeY = y - dy * factor * strength / radius;
          ctx.drawImage(img, bulgeX, bulgeY, 1, 1, x, y, 1, 1);
        } else {
          ctx.drawImage(img, x, y, 1, 1, x, y, 1, 1);
        }
      }
    }
  }
} 
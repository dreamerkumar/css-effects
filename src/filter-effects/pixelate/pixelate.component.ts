import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-pixelate',
  standalone: true,
  template: `
    <div class="container">
      <h1>Pixelate Filter Effect</h1>
      <p class="description">Pixel breakdown and mosaic effects</p>
      <div class="demo">
        <div class="pixelate-grid">
          <div class="pixelate-box">
            <canvas #canvas1 class="mosaic"></canvas>
            <div class="content">
              <h3>Mosaic</h3>
              <p>Hover to pixelate</p>
            </div>
          </div>
          <div class="pixelate-box">
            <canvas #canvas2 class="blocks"></canvas>
            <div class="content">
              <h3>Blocks</h3>
              <p>Hover to break down</p>
            </div>
          </div>
          <div class="pixelate-box">
            <canvas #canvas3 class="dots"></canvas>
            <div class="content">
              <h3>Dots</h3>
              <p>Hover to scatter</p>
            </div>
          </div>
          <div class="pixelate-box">
            <canvas #canvas4 class="grid"></canvas>
            <div class="content">
              <h3>Grid</h3>
              <p>Hover to divide</p>
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

    .pixelate-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    .pixelate-box {
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
    }

    .pixelate-box:hover .content {
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
export class PixelateComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas1') canvas1!: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvas2') canvas2!: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvas3') canvas3!: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvas4') canvas4!: ElementRef<HTMLCanvasElement>;

  private images: HTMLImageElement[] = [];
  private contexts: CanvasRenderingContext2D[] = [];
  private pixelSize = 1;
  private animationFrame: number = 0;

  ngAfterViewInit() {
    this.initCanvases();
    this.loadImages();
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationFrame);
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
        this.addHoverEffect(i);
      };
    });
  }

  private addHoverEffect(index: number) {
    const canvas = [this.canvas1, this.canvas2, this.canvas3, this.canvas4][index].nativeElement;
    const ctx = this.contexts[index];
    const img = this.images[index];

    canvas.addEventListener('mouseenter', () => {
      this.animate(ctx, img, index);
    });

    canvas.addEventListener('mouseleave', () => {
      cancelAnimationFrame(this.animationFrame);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    });
  }

  private animate(ctx: CanvasRenderingContext2D, img: HTMLImageElement, effect: number) {
    const draw = () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      switch(effect) {
        case 0: // Mosaic
          this.drawMosaic(ctx, img);
          break;
        case 1: // Blocks
          this.drawBlocks(ctx, img);
          break;
        case 2: // Dots
          this.drawDots(ctx, img);
          break;
        case 3: // Grid
          this.drawGrid(ctx, img);
          break;
      }

      this.animationFrame = requestAnimationFrame(draw);
    };

    draw();
  }

  private drawMosaic(ctx: CanvasRenderingContext2D, img: HTMLImageElement) {
    const size = 10;
    for(let y = 0; y < ctx.canvas.height; y += size) {
      for(let x = 0; x < ctx.canvas.width; x += size) {
        ctx.drawImage(img, x, y, size, size, x, y, size, size);
      }
    }
  }

  private drawBlocks(ctx: CanvasRenderingContext2D, img: HTMLImageElement) {
    const size = 20;
    for(let y = 0; y < ctx.canvas.height; y += size) {
      for(let x = 0; x < ctx.canvas.width; x += size) {
        if(Math.random() > 0.1) {
          ctx.drawImage(img, x, y, size, size, x, y, size, size);
        }
      }
    }
  }

  private drawDots(ctx: CanvasRenderingContext2D, img: HTMLImageElement) {
    const size = 10;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    for(let y = 0; y < ctx.canvas.height; y += size) {
      for(let x = 0; x < ctx.canvas.width; x += size) {
        const pixel = this.getPixelColor(img, x, y);
        ctx.fillStyle = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
        ctx.beginPath();
        ctx.arc(x + size/2, y + size/2, size/3, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  private drawGrid(ctx: CanvasRenderingContext2D, img: HTMLImageElement) {
    const size = 15;
    ctx.drawImage(img, 0, 0);
    
    ctx.strokeStyle = 'rgba(0,0,0,0.5)';
    ctx.lineWidth = 1;
    
    for(let y = 0; y < ctx.canvas.height; y += size) {
      for(let x = 0; x < ctx.canvas.width; x += size) {
        ctx.strokeRect(x, y, size, size);
      }
    }
  }

  private getPixelColor(img: HTMLImageElement, x: number, y: number): number[] {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0);
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    return [pixel[0], pixel[1], pixel[2]];
  }
} 
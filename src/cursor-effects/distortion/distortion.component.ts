import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from '../../app/shared/back-button.component';

@Component({
  selector: 'app-distortion',
  standalone: true,
  imports: [CommonModule, BackButtonComponent],
  template: `
    <app-back-button [text]="'Back to Cursor Effects'" path="/cursor-effects"></app-back-button>
    <div class="container">
      <h1>Distortion Cursor Effect</h1>
      <p class="description">Cursor distorts content as it moves</p>
      <div class="demo">
        <canvas #distortionCanvas></canvas>
        <div class="content">
          <div class="grid">
            <div class="image-container" *ngFor="let i of [1,2,3,4]">
              <img [src]="'https://picsum.photos/400/300?random=' + i" [alt]="'Image ' + i">
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
      position: relative;
      height: 600px;
      background: #1a1a1a;
      border-radius: 8px;
      overflow: hidden;
      cursor: none;
    }

    canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
      pointer-events: none;
    }

    .content {
      position: relative;
      z-index: 1;
      height: 100%;
      padding: 2rem;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    .image-container {
      position: relative;
      border-radius: 8px;
      overflow: hidden;
      aspect-ratio: 4/3;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
  `]
})
export class DistortionComponent implements AfterViewInit, OnDestroy {
  @ViewChild('distortionCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private mouse = { x: 0, y: 0, radius: 100 };
  private images: HTMLImageElement[] = [];
  private animationFrame: number = 0;

  ngAfterViewInit() {
    this.initCanvas();
    this.initImages();
    this.addEventListeners();
    this.animate();
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationFrame);
    this.removeEventListeners();
  }

  private initCanvas() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resizeCanvas();
  }

  private initImages() {
    this.images = Array.from(document.querySelectorAll('.image-container img'));
  }

  private resizeCanvas() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  private addEventListeners() {
    window.addEventListener('resize', this.handleResize);
    this.canvasRef.nativeElement.parentElement?.addEventListener('mousemove', this.handleMouseMove);
  }

  private removeEventListeners() {
    window.removeEventListener('resize', this.handleResize);
    this.canvasRef.nativeElement.parentElement?.removeEventListener('mousemove', this.handleMouseMove);
  }

  private handleResize = () => {
    this.resizeCanvas();
  }

  private handleMouseMove = (event: MouseEvent) => {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    this.mouse.x = event.clientX - rect.left;
    this.mouse.y = event.clientY - rect.top;

    // Apply distortion to images
    this.images.forEach(img => {
      const imgRect = img.getBoundingClientRect();
      const dx = (event.clientX - (imgRect.left + imgRect.width/2)) * 0.1;
      const dy = (event.clientY - (imgRect.top + imgRect.height/2)) * 0.1;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < this.mouse.radius) {
        const scale = 1 + (this.mouse.radius - distance) / this.mouse.radius * 0.2;
        img.style.transform = `scale(${scale}) translate(${dx}px, ${dy}px)`;
      } else {
        img.style.transform = 'scale(1) translate(0, 0)';
      }
    });
  }

  private animate = () => {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw cursor effect
    const gradient = this.ctx.createRadialGradient(
      this.mouse.x, this.mouse.y, 0,
      this.mouse.x, this.mouse.y, this.mouse.radius
    );
    gradient.addColorStop(0, 'rgba(255,255,255,0.2)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');

    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.arc(this.mouse.x, this.mouse.y, this.mouse.radius, 0, Math.PI * 2);
    this.ctx.fill();

    this.animationFrame = requestAnimationFrame(this.animate);
  }
} 
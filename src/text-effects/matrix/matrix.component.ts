import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-matrix',
  standalone: true,
  template: `
    <div class="container">
      <h1>Matrix Text Effect</h1>
      <p class="description">Digital rain effect inspired by The Matrix</p>
      <div class="demo">
        <canvas #matrixCanvas></canvas>
        <div class="overlay-text">MATRIX</div>
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
      background: #1a1a1a;
      padding: 4rem;
      border-radius: 8px;
      position: relative;
      height: 200px;
      overflow: hidden;
    }

    canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .overlay-text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 4rem;
      font-weight: bold;
      color: #fff;
      text-shadow: 0 0 10px #0f0;
      z-index: 1;
      mix-blend-mode: difference;
    }
  `]
})
export class MatrixComponent implements AfterViewInit {
  @ViewChild('matrixCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private characters: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
  private drops: number[] = [];
  private fontSize = 15;

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    
    // Set canvas size
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    // Initialize drops
    const columns = canvas.width / this.fontSize;
    this.drops = Array(Math.floor(columns)).fill(1);

    // Start animation
    this.animate();
  }

  private resizeCanvas() {
    const canvas = this.canvasRef.nativeElement;
    const container = canvas.parentElement!;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
  }

  private animate() {
    // Semi-transparent black to create fade effect
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    this.ctx.fillRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);

    this.ctx.fillStyle = '#0F0';
    this.ctx.font = `${this.fontSize}px monospace`;

    for (let i = 0; i < this.drops.length; i++) {
      // Random character
      const text = this.characters[Math.floor(Math.random() * this.characters.length)];
      
      // x = i * fontSize, y = value of drops[i] * fontSize
      this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);

      // Sending the drop back to the top randomly after it has crossed the screen
      if (this.drops[i] * this.fontSize > this.canvasRef.nativeElement.height && Math.random() > 0.975) {
        this.drops[i] = 0;
      }

      // Increment y coordinate
      this.drops[i]++;
    }

    requestAnimationFrame(() => this.animate());
  }
} 
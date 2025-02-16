import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spectrum',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>Spectrum Analyzer Effect</h1>
      <p class="description">Detailed frequency spectrum analysis</p>
      <div class="demo">
        <div class="controls">
          <input type="file" accept="audio/*" (change)="onFileSelected($event)" #fileInput>
          <button (click)="togglePlay()">{{ isPlaying ? 'Pause' : 'Play' }}</button>
          <select (change)="changeVisualization($event)">
            <option value="bars">Bars</option>
            <option value="circular">Circular</option>
            <option value="waterfall">Waterfall</option>
            <option value="line">Line</option>
          </select>
        </div>
        <div class="spectrum-container">
          <canvas #spectrumCanvas></canvas>
          <div class="overlay" *ngIf="!audioSource">
            <p>Select an audio file to begin</p>
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
      background: #1a1a1a;
      border-radius: 8px;
    }

    .controls {
      margin-bottom: 2rem;
      display: flex;
      gap: 1rem;
      justify-content: center;
      align-items: center;
    }

    button, select {
      padding: 0.5rem 1.5rem;
      background: #7c4dff;
      border: none;
      border-radius: 4px;
      color: white;
      cursor: pointer;
      transition: background 0.3s;
    }

    button:hover, select:hover {
      background: #6c3fff;
    }

    select {
      background: #5c00d2;
    }

    .spectrum-container {
      position: relative;
      width: 100%;
      height: 300px;
      background: #000;
      border-radius: 8px;
      overflow: hidden;
    }

    canvas {
      width: 100%;
      height: 100%;
    }

    .overlay {
      position: absolute;
      inset: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(0,0,0,0.7);
      color: white;
    }
  `]
})
export class SpectrumComponent implements AfterViewInit, OnDestroy {
  @ViewChild('spectrumCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
public audioSource: MediaElementAudioSourceNode | null = null;
  private audio: HTMLAudioElement | null = null;
  private animationFrame: number = 0;
  private visualizationType: 'bars' | 'circular' | 'waterfall' | 'line' = 'bars';
  private waterfallData: Uint8Array[] = [];
  isPlaying: boolean = false;

  ngAfterViewInit() {
    this.initCanvas();
  }

  ngOnDestroy() {
    this.stopVisualization();
    this.audioContext?.close();
  }

  private initCanvas() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      this.setupAudio(url);
    }
  }

  changeVisualization(event: Event) {
    this.visualizationType = (event.target as HTMLSelectElement).value as any;
    if (this.visualizationType === 'waterfall') {
      this.waterfallData = [];
    }
  }

  private setupAudio(url: string) {
    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
    }

    this.audio = new Audio(url);
    this.audio.addEventListener('ended', () => {
      this.isPlaying = false;
    });

    if (!this.audioContext) {
      this.audioContext = new AudioContext();
    }

    if (this.audioSource) {
      this.audioSource.disconnect();
    }

    this.audioSource = this.audioContext.createMediaElementSource(this.audio);
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 2048;

    this.audioSource.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);

    this.startVisualization();
  }

  togglePlay() {
    if (!this.audio) return;

    if (this.isPlaying) {
      this.audio.pause();
      this.stopVisualization();
    } else {
      this.audio.play();
      this.startVisualization();
    }
    this.isPlaying = !this.isPlaying;
  }

  private startVisualization() {
    if (!this.analyser) return;

    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d')!;
    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      this.animationFrame = requestAnimationFrame(draw);
      this.analyser!.getByteFrequencyData(dataArray);
      
      switch (this.visualizationType) {
        case 'bars':
          this.drawBars(ctx, dataArray);
          break;
        case 'circular':
          this.drawCircular(ctx, dataArray);
          break;
        case 'waterfall':
          this.drawWaterfall(ctx, dataArray);
          break;
        case 'line':
          this.drawLine(ctx, dataArray);
          break;
      }
    };

    draw();
  }

  private drawBars(ctx: CanvasRenderingContext2D, dataArray: Uint8Array) {
    const canvas = ctx.canvas;
    const bufferLength = dataArray.length;
    const barWidth = canvas.width / bufferLength;
    
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    dataArray.forEach((value, index) => {
      const percent = value / 255;
      const hue = (index / bufferLength) * 360;
      ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
      
      const barHeight = percent * canvas.height;
      const x = index * barWidth;
      const y = canvas.height - barHeight;
      
      ctx.fillRect(x, y, barWidth - 1, barHeight);
    });
  }

  private drawCircular(ctx: CanvasRenderingContext2D, dataArray: Uint8Array) {
    const canvas = ctx.canvas;
    const bufferLength = dataArray.length;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;
    
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    dataArray.forEach((value, index) => {
      const percent = value / 255;
      const angle = (index / bufferLength) * Math.PI * 2;
      const hue = (index / bufferLength) * 360;
      
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      const barHeight = percent * 50;
      
      ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(
        centerX + Math.cos(angle) * (radius + barHeight),
        centerY + Math.sin(angle) * (radius + barHeight)
      );
      ctx.stroke();
    });
  }

  private drawWaterfall(ctx: CanvasRenderingContext2D, dataArray: Uint8Array) {
    const canvas = ctx.canvas;
    const bufferLength = dataArray.length;
    
    this.waterfallData.unshift(new Uint8Array(dataArray));
    if (this.waterfallData.length > canvas.height) {
      this.waterfallData.pop();
    }

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    this.waterfallData.forEach((row, y) => {
      row.forEach((value, x) => {
        const percent = value / 255;
        const hue = percent * 360;
        ctx.fillStyle = `hsla(${hue}, 100%, 50%, ${1 - y / canvas.height})`;
        ctx.fillRect(
          (x / bufferLength) * canvas.width,
          y,
          canvas.width / bufferLength,
          1
        );
      });
    });
  }

  private drawLine(ctx: CanvasRenderingContext2D, dataArray: Uint8Array) {
    const canvas = ctx.canvas;
    const bufferLength = dataArray.length;
    
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(0, canvas.height);

    dataArray.forEach((value, index) => {
      const percent = value / 255;
      const x = (index / bufferLength) * canvas.width;
      const y = canvas.height - (percent * canvas.height);
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.lineTo(canvas.width, canvas.height);
    ctx.closePath();

    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'rgba(124, 77, 255, 0.8)');
    gradient.addColorStop(1, 'rgba(124, 77, 255, 0)');
    
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.strokeStyle = '#7c4dff';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  private stopVisualization() {
    cancelAnimationFrame(this.animationFrame);
  }
} 
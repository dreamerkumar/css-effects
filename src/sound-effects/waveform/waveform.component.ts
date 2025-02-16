import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-waveform',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>Waveform Effect</h1>
      <p class="description">Oscilloscope-style audio visualization</p>
      <div class="demo">
        <div class="controls">
          <input type="file" accept="audio/*" (change)="onFileSelected($event)" #fileInput>
          <button (click)="togglePlay()">{{ isPlaying ? 'Pause' : 'Play' }}</button>
        </div>
        <div class="waveform-container">
          <canvas #waveformCanvas></canvas>
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
    }

    button {
      padding: 0.5rem 1.5rem;
      background: #7c4dff;
      border: none;
      border-radius: 4px;
      color: white;
      cursor: pointer;
      transition: background 0.3s;
    }

    button:hover {
      background: #6c3fff;
    }

    .waveform-container {
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
export class WaveformComponent implements AfterViewInit, OnDestroy {
  @ViewChild('waveformCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
public audioSource: MediaElementAudioSourceNode | null = null;
  private audio: HTMLAudioElement | null = null;
  private animationFrame: number = 0;
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
    this.analyser.fftSize = 2048; // Higher for smoother waveform

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
      
      this.analyser!.getByteTimeDomainData(dataArray);
      
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 2;
      ctx.strokeStyle = '#00ff00';
      ctx.beginPath();

      const sliceWidth = canvas.width / bufferLength;
      let x = 0;

      for(let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = v * canvas.height/2;

        if(i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height/2);
      ctx.stroke();
    };

    draw();
  }

  private stopVisualization() {
    cancelAnimationFrame(this.animationFrame);
  }
} 
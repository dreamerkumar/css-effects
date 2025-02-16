import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-equalizer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>Audio Equalizer Effect</h1>
      <p class="description">Interactive frequency band control</p>
      <div class="demo">
        <div class="controls">
          <input type="file" accept="audio/*" (change)="onFileSelected($event)" #fileInput>
          <button (click)="togglePlay()">{{ isPlaying ? 'Pause' : 'Play' }}</button>
        </div>
        <div class="equalizer-container">
          <div class="frequency-bands">
            <div class="band" *ngFor="let band of bands; let i = index">
              <div class="label">{{ band.frequency }}Hz</div>
              <input 
                type="range" 
                min="-12" 
                max="12" 
                step="1" 
                [value]="band.gain" 
                (input)="adjustGain(i, $event)"
                class="slider"
                [style.background]="getSliderBackground(band.gain)">
              <div class="value">{{ band.gain }}dB</div>
            </div>
          </div>
          <canvas #equalizerCanvas></canvas>
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

    .equalizer-container {
      position: relative;
      width: 100%;
      background: #000;
      border-radius: 8px;
      overflow: hidden;
      padding: 2rem;
    }

    .frequency-bands {
      display: flex;
      justify-content: space-around;
      margin-bottom: 2rem;
      gap: 1rem;
    }

    .band {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: white;
    }

    .label {
      margin-bottom: 0.5rem;
      font-size: 0.8rem;
      color: #999;
    }

    .value {
      margin-top: 0.5rem;
      font-size: 0.8rem;
      color: #999;
    }

    .slider {
      height: 200px;
      width: 40px;
      writing-mode: bt-lr;
      -webkit-appearance: none;
      background: #333;
      border-radius: 4px;
      outline: none;
      opacity: 0.7;
      transition: opacity 0.2s;
    }

    .slider:hover {
      opacity: 1;
    }

    .slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 40px;
      height: 10px;
      background: #7c4dff;
      cursor: pointer;
      border-radius: 2px;
    }

    canvas {
      width: 100%;
      height: 150px;
      background: #000;
      border-radius: 4px;
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
export class EqualizerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('equalizerCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  public audioSource: MediaElementAudioSourceNode | null = null;
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private filters: BiquadFilterNode[] = [];
  private audio: HTMLAudioElement | null = null;
  private animationFrame: number = 0;
  private ctx!: CanvasRenderingContext2D;

  isPlaying = false;
  bands = [
    { frequency: 60, gain: 0, type: 'lowshelf' },
    { frequency: 170, gain: 0, type: 'peaking' },
    { frequency: 350, gain: 0, type: 'peaking' },
    { frequency: 1000, gain: 0, type: 'peaking' },
    { frequency: 3500, gain: 0, type: 'peaking' },
    { frequency: 10000, gain: 0, type: 'highshelf' }
  ];

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
    if (!file) return;

    const url = URL.createObjectURL(file);
    
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
    }

    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
    }

    this.audio = new Audio(url);
    this.audio.addEventListener('canplay', () => {
      if (!this.audioContext || !this.audio) return;

      if (this.audioSource) {
        this.audioSource.disconnect();
      }

      this.audioSource = this.audioContext.createMediaElementSource(this.audio!);
      this.setupAudioNodes();
    });
  }

  private setupAudioNodes() {
    if (!this.audioContext || !this.audioSource) return;

    this.filters = this.bands.map(band => {
      const filter = this.audioContext!.createBiquadFilter();
      filter.type = 'peaking';
      filter.frequency.value = band.frequency;
      filter.Q.value = 1;
      filter.gain.value = band.gain;
      return filter;
    });

    if (this.audioSource && this.filters.length > 0) {
      this.audioSource.connect(this.filters[0]);
      
      for (let i = 0; i < this.filters.length - 1; i++) {
        this.filters[i].connect(this.filters[i + 1]);
      }

      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 2048;
      
      const lastFilter = this.filters[this.filters.length - 1];
      if (lastFilter && this.analyser) {
        lastFilter.connect(this.analyser);
        this.analyser.connect(this.audioContext.destination);
      }
    }
  }

  adjustGain(index: number, event: Event) {
    const value = +(event.target as HTMLInputElement).value;
    this.bands[index].gain = value;
    if (this.filters[index]) {
      this.filters[index].gain.value = value;
    }
  }

  getSliderBackground(gain: number) {
    const hue = ((gain + 12) / 24) * 120; // Maps -12 to 12 to hue 0 to 120
    return `hsl(${hue}, 70%, 50%)`;
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
      
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = canvas.width / bufferLength;
      
      dataArray.forEach((value, i) => {
        const percent = value / 255;
        const hue = (i / bufferLength) * 360;
        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
        
        const barHeight = percent * canvas.height;
        const x = i * barWidth;
        const y = canvas.height - barHeight;
        
        ctx.fillRect(x, y, barWidth - 1, barHeight);
      });
    };

    draw();
  }

  private stopVisualization() {
    cancelAnimationFrame(this.animationFrame);
  }
} 
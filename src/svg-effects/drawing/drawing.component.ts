import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PathData {
  path: string;
  length: number;
}

@Component({
  selector: 'app-drawing',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>SVG Drawing Effect</h1>
      <p class="description">Path drawing and tracing animations</p>
      <div class="demo">
        <div class="controls">
          <button (click)="toggleShape()">Change Shape</button>
          <select (change)="changeSpeed($event)">
            <option value="2000">Slow</option>
            <option value="1000">Medium</option>
            <option value="500">Fast</option>
          </select>
          <button (click)="redraw()">Redraw</button>
        </div>
        <div class="svg-container">
          <svg #svgElement viewBox="0 0 200 200">
            <path [attr.d]="currentPath.path"
                  fill="none"
                  stroke="#7c4dff"
                  stroke-width="2"
                  [style.strokeDasharray]="currentPath.length"
                  [style.strokeDashoffset]="dashOffset"/>
          </svg>
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

    .svg-container {
      width: 100%;
      max-width: 400px;
      margin: 0 auto;
      background: #000;
      border-radius: 8px;
      padding: 2rem;
    }

    svg {
      width: 100%;
      height: auto;
    }
  `]
})
export class DrawingComponent implements AfterViewInit {
  @ViewChild('svgElement') svgElement!: ElementRef<SVGElement>;

  private shapes: PathData[] = [
    {
      path: 'M50,150 C50,50 150,50 150,150 C150,250 50,250 50,150',
      length: 0
    },
    {
      path: 'M50,50 L150,50 L150,150 L50,150 Z',
      length: 0
    },
    {
      path: 'M100,50 L150,150 L50,150 Z',
      length: 0
    },
    {
      path: 'M100,30 C60,30 30,60 30,100 C30,140 100,170 100,170 C100,170 170,140 170,100 C170,60 140,30 100,30',
      length: 0
    }
  ];

  private currentShapeIndex = 0;
  private animationDuration = 1000;
  private animationFrame: number = 0;
  
  currentPath: PathData = this.shapes[0];
  dashOffset = 0;

  ngAfterViewInit() {
    this.initializePathLengths();
    this.startDrawing();
  }

  private initializePathLengths() {
    // Create temporary path element to measure lengths
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    svg.appendChild(path);
    document.body.appendChild(svg);

    // Measure each path length
    this.shapes.forEach(shape => {
      path.setAttribute('d', shape.path);
      shape.length = path.getTotalLength();
    });

    // Clean up
    document.body.removeChild(svg);
    this.currentPath = this.shapes[0];
  }

  toggleShape() {
    this.currentShapeIndex = (this.currentShapeIndex + 1) % this.shapes.length;
    this.currentPath = this.shapes[this.currentShapeIndex];
    this.startDrawing();
  }

  changeSpeed(event: Event) {
    this.animationDuration = +(event.target as HTMLSelectElement).value;
    this.startDrawing();
  }

  redraw() {
    this.startDrawing();
  }

  private startDrawing() {
    cancelAnimationFrame(this.animationFrame);
    
    const startTime = performance.now();
    this.dashOffset = this.currentPath.length;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / this.animationDuration, 1);

      this.dashOffset = this.currentPath.length * (1 - progress);

      if (progress < 1) {
        this.animationFrame = requestAnimationFrame(animate);
      }
    };

    this.animationFrame = requestAnimationFrame(animate);
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationFrame);
  }
} 
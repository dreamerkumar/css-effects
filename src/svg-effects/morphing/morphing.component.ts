import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-morphing',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>SVG Morphing Effect</h1>
      <p class="description">Smooth transitions between SVG shapes</p>
      <div class="demo">
        <div class="controls">
          <button (click)="toggleShape()">Change Shape</button>
          <select (change)="changeAnimation($event)">
            <option value="linear">Linear</option>
            <option value="elastic">Elastic</option>
            <option value="bounce">Bounce</option>
          </select>
        </div>
        <div class="svg-container">
          <svg #svgElement viewBox="0 0 200 200">
            <path [attr.d]="currentPath" 
                  fill="none" 
                  stroke="#7c4dff" 
                  stroke-width="2"/>
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
export class MorphingComponent implements AfterViewInit {
  @ViewChild('svgElement') svgElement!: ElementRef<SVGElement>;

  private shapes = {
    circle: 'M100,100 m-75,0 a75,75 0 1,0 150,0 a75,75 0 1,0 -150,0',
    square: 'M25,25 L175,25 L175,175 L25,175 Z',
    triangle: 'M100,25 L175,175 L25,175 Z',
    star: 'M100,10 L123,90 L186,90 L135,139 L152,199 L100,167 L48,199 L65,139 L14,90 L77,90 Z',
    heart: 'M100,30 C60,30 30,60 30,100 C30,140 100,170 100,170 C100,170 170,140 170,100 C170,60 140,30 100,30'
  };

  currentPath = this.shapes.circle;
  currentPathData: any[] = [];
  targetPathData: any[] = [];
  animationType: 'linear' | 'elastic' | 'bounce' = 'linear';
  private currentShapeIndex = 0;

  ngAfterViewInit() {
    this.currentPathData = this.parsePath(this.shapes.circle);
    this.startAnimation();
  }

  toggleShape() {
    const shapes = Object.values(this.shapes);
    this.currentShapeIndex = (this.currentShapeIndex + 1) % shapes.length;
    const nextShape = shapes[this.currentShapeIndex];
    
    this.currentPathData = this.parsePath(this.currentPath);
    this.targetPathData = this.parsePath(nextShape);
    
    this.startAnimation();
  }

  changeAnimation(event: Event) {
    this.animationType = (event.target as HTMLSelectElement).value as typeof this.animationType;
  }

  private morphTo(targetPath: string) {
    const currentPath = this.parsePath(this.currentPath);
    const targetPathCommands = this.parsePath(targetPath);
    
    // Normalize paths to have same number of points
    this.normalizePaths(currentPath, targetPathCommands);

    const startTime = performance.now();
    const duration = 1000; // 1 second

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Apply easing based on animation type
      const easedProgress = this.getEasedProgress(progress);

      // Interpolate between paths
      const interpolatedPath = this.interpolatePaths(currentPath, targetPathCommands, easedProgress);
      this.currentPath = this.pathToString(interpolatedPath);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }

  private parsePath(pathString: string): any[] {
    const commands = pathString.match(/[a-zA-Z][^a-zA-Z]*/g) || [];
    return commands.map(cmd => ({
      command: cmd[0],
      values: cmd.slice(1).trim().split(/[,\s]+/).map(Number)
    }));
  }

  private normalizePaths(path1: any[], path2: any[]) {
    // Ensure both paths have same number of points by adding interpolated points
    const maxLength = Math.max(path1.length, path2.length);
    while (path1.length < maxLength) {
      const index = Math.floor(path1.length * (path2.length / maxLength));
      path1.splice(index, 0, { ...path1[index] });
    }
    while (path2.length < maxLength) {
      const index = Math.floor(path2.length * (path1.length / maxLength));
      path2.splice(index, 0, { ...path2[index] });
    }
  }

  private interpolatePaths(path1: any[], path2: any[], progress: number) {
    return path1.map((cmd1, i) => {
      const cmd2 = path2[i];
      return {
        command: cmd1.command,
        values: cmd1.values.map((v: number, j: number) => 
          v + (cmd2.values[j] - v) * progress
        )
      };
    });
  }

  private pathToString(path: any[]): string {
    return path.map(cmd => 
      cmd.command + cmd.values.join(',')
    ).join(' ');
  }

  private getEasedProgress(progress: number): number {
    switch (this.animationType) {
      case 'elastic':
        return this.elasticEasing(progress);
      case 'bounce':
        return this.bounceEasing(progress);
      default:
        return progress;
    }
  }

  private elasticEasing(t: number): number {
    return Math.pow(2, -10 * t) * Math.sin((t - 0.075) * (2 * Math.PI) / 0.3) + 1;
  }

  private bounceEasing(t: number): number {
    if (t < 1/2.75) {
      return 7.5625 * t * t;
    } else if (t < 2/2.75) {
      t -= 1.5/2.75;
      return 7.5625 * t * t + 0.75;
    } else if (t < 2.5/2.75) {
      t -= 2.25/2.75;
      return 7.5625 * t * t + 0.9375;
    } else {
      t -= 2.625/2.75;
      return 7.5625 * t * t + 0.984375;
    }
  }

  private startAnimation() {
    const startTime = performance.now();
    const duration = 1000; // 1 second for the morphing animation

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = this.getEasedProgress(progress);

      // Interpolate between current and target paths
      const morphedPath = this.interpolatePaths(
        this.currentPathData,
        this.targetPathData,
        easedProgress
      );

      this.currentPath = this.pathToString(morphedPath);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }
} 
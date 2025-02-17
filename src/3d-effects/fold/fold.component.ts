import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from '../../app/shared/back-button.component';

@Component({
  selector: 'app-fold',
  standalone: true,
  imports: [CommonModule, BackButtonComponent],
  template: `
    <app-back-button [text]="'Back to 3D Effects'" path="/3d-effects"></app-back-button>
    <div class="container">
      <h1>3D Fold Effect</h1>
      <p class="description">Paper folding animations with 3D transforms</p>
      <div class="demo">
        <div class="controls">
          <select (change)="changeFoldType($event)">
            <option value="single">Single Fold</option>
            <option value="double">Double Fold</option>
            <option value="diagonal">Diagonal Fold</option>
            <option value="origami">Origami Fold</option>
          </select>
          <button (click)="toggleFold()">
            {{ isFolded ? 'Unfold' : 'Fold' }}
          </button>
        </div>
        <div class="fold-container">
          <div class="paper" [class.folded]="isFolded" [class]="foldType">
            <div class="segment front">Front</div>
            <div class="segment back">Back</div>
            <div class="segment left">Left</div>
            <div class="segment right">Right</div>
            <div class="segment top">Top</div>
            <div class="segment bottom">Bottom</div>
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

    .fold-container {
      perspective: 1500px;
      padding: 2rem;
    }

    .paper {
      width: 300px;
      height: 300px;
      margin: 0 auto;
      position: relative;
      transform-style: preserve-3d;
      transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .segment {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: bold;
      color: white;
      background: linear-gradient(135deg, #7c4dff, #448aff);
      backface-visibility: hidden;
      border: 2px solid rgba(255, 255, 255, 0.1);
    }

    /* Single Fold */
    .single.folded {
      transform: rotateX(-180deg);
    }

    /* Double Fold */
    .double .segment.left,
    .double .segment.right {
      width: 50%;
      transform-origin: center;
    }

    .double .segment.left { left: 0; }
    .double .segment.right { left: 50%; }

    .double.folded .segment.left {
      transform: rotateY(180deg);
    }
    .double.folded .segment.right {
      transform: rotateY(-180deg);
    }

    /* Diagonal Fold */
    .diagonal.folded {
      transform: rotate3d(1, 1, 0, 180deg);
    }

    /* Origami Fold */
    .origami .segment {
      transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .origami.folded .front {
      transform: rotateX(-60deg) translateZ(100px);
    }
    .origami.folded .back {
      transform: rotateX(60deg) translateZ(-100px);
    }
    .origami.folded .left {
      transform: rotateY(-60deg) translateZ(100px);
    }
    .origami.folded .right {
      transform: rotateY(60deg) translateZ(-100px);
    }
    .origami.folded .top {
      transform: rotateX(60deg) translateZ(100px);
    }
    .origami.folded .bottom {
      transform: rotateX(-60deg) translateZ(-100px);
    }
  `]
})
export class FoldComponent {
  isFolded = false;
  foldType: 'single' | 'double' | 'diagonal' | 'origami' = 'single';

  toggleFold() {
    this.isFolded = !this.isFolded;
  }

  changeFoldType(event: Event) {
    this.foldType = (event.target as HTMLSelectElement).value as typeof this.foldType;
    this.isFolded = false;
  }
} 
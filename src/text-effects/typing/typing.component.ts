import { Component } from '@angular/core';

@Component({
  selector: 'app-typing',
  standalone: true,
  template: `
    <div class="container">
      <h1>Typing Text Effect</h1>
      <p class="description">Simulates typing text with a blinking cursor</p>
      <div class="demo">
        <div class="typing">Welcome to the Matrix</div>
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
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .typing {
      width: 22ch;
      color: #0f0;
      font-size: 2rem;
      font-family: monospace;
      position: relative;
      white-space: nowrap;
      overflow: hidden;
      border-right: 3px solid;
      animation: typing 2s steps(22), blink .5s step-end infinite alternate;
    }

    @keyframes typing {
      from {
        width: 0;
      }
    }
    
    @keyframes blink {
      50% {
        border-color: transparent;
      }
    }
  `]
})
export class TypingComponent {} 
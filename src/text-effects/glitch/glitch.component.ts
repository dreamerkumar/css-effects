import { Component } from '@angular/core';

@Component({
  selector: 'app-glitch',
  standalone: true,
  template: `
    <div class="container">
      <h1>Glitch Text Effect</h1>
      <p class="description">A glitchy text effect with RGB shift and distortion</p>
      <div class="demo">
        <div class="glitch" data-text="GLITCH">GLITCH</div>
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
    }

    .glitch {
      font-size: 4rem;
      font-weight: bold;
      text-transform: uppercase;
      position: relative;
      text-shadow: 0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff,
                   0.025em 0.04em 0 #fffc00;
      animation: glitch 725ms infinite;
    }

    .glitch span {
      position: absolute;
      top: 0;
      left: 0;
    }

    .glitch::before,
    .glitch::after {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .glitch::before {
      left: 2px;
      text-shadow: -2px 0 #ff00c1;
      clip: rect(44px, 450px, 56px, 0);
      animation: glitch-anim 5s infinite linear alternate-reverse;
    }

    .glitch::after {
      left: -2px;
      text-shadow: -2px 0 #00fff9, 2px 2px #ff00c1;
      animation: glitch-anim2 1s infinite linear alternate-reverse;
    }

    @keyframes glitch {
      0% {
        text-shadow: 0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff,
                     0.025em 0.04em 0 #fffc00;
      }
      15% {
        text-shadow: 0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff,
                     0.025em 0.04em 0 #fffc00;
      }
      16% {
        text-shadow: -0.05em -0.025em 0 #00fffc, 0.025em 0.035em 0 #fc00ff,
                     -0.05em -0.05em 0 #fffc00;
      }
      49% {
        text-shadow: -0.05em -0.025em 0 #00fffc, 0.025em 0.035em 0 #fc00ff,
                     -0.05em -0.05em 0 #fffc00;
      }
      50% {
        text-shadow: 0.05em 0.035em 0 #00fffc, 0.03em 0 0 #fc00ff,
                     0 -0.04em 0 #fffc00;
      }
      99% {
        text-shadow: 0.05em 0.035em 0 #00fffc, 0.03em 0 0 #fc00ff,
                     0 -0.04em 0 #fffc00;
      }
      100% {
        text-shadow: -0.05em 0 0 #00fffc, -0.025em -0.04em 0 #fc00ff,
                     -0.04em -0.025em 0 #fffc00;
      }
    }
  `]
})
export class GlitchComponent {} 
import { Component } from '@angular/core';

@Component({
  selector: 'app-gradient',
  standalone: true,
  template: `
    <div class="container">
      <h1>Gradient Background Effect</h1>
      <p class="description">Animated gradient backgrounds with different patterns</p>
      <div class="demo">
        <div class="gradient-grid">
          <div class="gradient-box linear">
            <h3>Linear Flow</h3>
            <p>Smooth linear transition</p>
          </div>
          <div class="gradient-box radial">
            <h3>Radial Pulse</h3>
            <p>Expanding radial gradient</p>
          </div>
          <div class="gradient-box conic">
            <h3>Conic Spin</h3>
            <p>Rotating conic gradient</p>
          </div>
          <div class="gradient-box mesh">
            <h3>Gradient Mesh</h3>
            <p>Multiple color points</p>
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
      background: #f8f9fa;
      border-radius: 8px;
    }

    .gradient-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
      max-width: 1000px;
      margin: 0 auto;
    }

    .gradient-box {
      height: 300px;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: white;
      text-shadow: 0 2px 4px rgba(0,0,0,0.2);
      overflow: hidden;
    }

    .linear {
      background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
      background-size: 400% 400%;
      animation: gradient 15s ease infinite;
    }

    .radial {
      background: radial-gradient(circle at center, #ff3e3e, #7000ff);
      animation: pulse 5s ease-in-out infinite;
    }

    .conic {
      background: conic-gradient(from 0deg, #ff3e3e, #ff8f00, #ffeb3b, #00e676, #00b0ff, #7c4dff, #ff3e3e);
      animation: spin 10s linear infinite;
    }

    .mesh {
      background: radial-gradient(at 0% 0%, #ff3e3e 0%, transparent 50%),
                  radial-gradient(at 100% 0%, #00e676 0%, transparent 50%),
                  radial-gradient(at 100% 100%, #00b0ff 0%, transparent 50%),
                  radial-gradient(at 0% 100%, #7c4dff 0%, transparent 50%);
      background-size: 200% 200%;
      animation: mesh 10s ease infinite;
    }

    h3 {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
    }

    p {
      margin: 0;
      opacity: 0.8;
    }

    @keyframes gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    @keyframes pulse {
      0%, 100% { background-size: 100% 100%; }
      50% { background-size: 150% 150%; }
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    @keyframes mesh {
      0%, 100% { background-position: 0% 0%; }
      25% { background-position: 100% 0%; }
      50% { background-position: 100% 100%; }
      75% { background-position: 0% 100%; }
    }
  `]
})
export class GradientComponent {} 
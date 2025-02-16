import { Component } from '@angular/core';

@Component({
  selector: 'app-glitch',
  standalone: true,
  template: `
    <div class="container">
      <h1>Glitch Filter Effect</h1>
      <p class="description">Digital distortion and color channel splitting</p>
      <div class="demo">
        <div class="glitch-grid">
          <div class="glitch-box rgb-split">
            <img src="https://picsum.photos/400/300?random=1" alt="Random image 1">
            <div class="content">
              <h3>RGB Split</h3>
              <p>Hover to glitch</p>
            </div>
          </div>
          <div class="glitch-box scan-lines">
            <img src="https://picsum.photos/400/300?random=2" alt="Random image 2">
            <div class="content">
              <h3>Scan Lines</h3>
              <p>Hover to distort</p>
            </div>
          </div>
          <div class="glitch-box noise">
            <img src="https://picsum.photos/400/300?random=3" alt="Random image 3">
            <div class="content">
              <h3>Noise</h3>
              <p>Hover to corrupt</p>
            </div>
          </div>
          <div class="glitch-box flicker">
            <img src="https://picsum.photos/400/300?random=4" alt="Random image 4">
            <div class="content">
              <h3>Flicker</h3>
              <p>Hover to disrupt</p>
            </div>
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

    .glitch-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    .glitch-box {
      position: relative;
      border-radius: 8px;
      overflow: hidden;
      cursor: pointer;
      aspect-ratio: 4/3;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .content {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: white;
      background: rgba(0,0,0,0.4);
      mix-blend-mode: overlay;
    }

    /* RGB Split Effect */
    .rgb-split {
      position: relative;
    }

    .rgb-split::before,
    .rgb-split::after {
      content: '';
      position: absolute;
      inset: 0;
      background: inherit;
      background-size: cover;
      mix-blend-mode: screen;
      transition: transform 0.2s;
    }

    .rgb-split::before {
      background-color: #f0f;
      transform: translateX(-5px);
    }

    .rgb-split::after {
      background-color: #0ff;
      transform: translateX(5px);
    }

    .rgb-split:hover::before {
      transform: translateX(-10px) skewX(2deg);
    }

    .rgb-split:hover::after {
      transform: translateX(10px) skewX(-2deg);
    }

    /* Scan Lines Effect */
    .scan-lines::before {
      content: '';
      position: absolute;
      inset: 0;
      background: repeating-linear-gradient(
        transparent 0%,
        rgba(0, 0, 0, 0.1) 0.5%,
        transparent 1%
      );
      animation: scan 8s linear infinite;
      opacity: 0;
      transition: opacity 0.3s;
    }

    .scan-lines:hover::before {
      opacity: 1;
    }

    @keyframes scan {
      from { background-position: 0 0; }
      to { background-position: 0 100%; }
    }

    /* Noise Effect */
    .noise::after {
      content: '';
      position: absolute;
      inset: 0;
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAPYSURBVGiB7ZpNiFVVHMZ/z7kzOjrO6FgGhS1KKGhRi2xTkrSwFtGqRRG0CyEiCFpUVLRpE0EFQdCHtIo2QYsIoRYRQYEVFH2BlZQ6zqijM87o3Pv0/53FPR/33HvunTv3vnNvDTzw4pz/ef7/c/7n43/OuVBTTTXV9H+U5gkdyxvR9qJQPyIvArcDHcBxkfeQfUjSQXV0nKbYvAC4DXgGeABozXB7FvgI9CbSk6p2nymybxXwKPAUcHWGWwp8DrwBvKOBgd4i+14G3Ac8D9yc4dYHvA28qOTk0SL7XgE8DGwG1mS49QM7gC3q7j5WZN+NwBPAM8AVE9pSKbAL2Ap8pGQyVWTfTcBG4HlgVYbbIPAesBX4RMlkvMi+1wMbgM3AyozbELAT2Ap8qmQyVWTfNcB64EXg2gm2FPAZ8ArwvpLJoSL7rgTWAVuAGzLchoGPgZeB3Uomw0X2vQpYC7wE3JjhNgJ8ArwM7FEyGSqy7+XAfcArwK0ZbqPAp8A24HMlk8Ei+14K3ANsB+7IcBsDdgOvAV8pmQwU2fcS4C5gB3BnhlsK+BJ4FfhGyeR8kX0vBu4EdgJ3Z7ilgK+B14FvlUzOFdm3HbgD2A3cm+EmYC/wBvC9ksnZIvteRPZD/gC4P8NNwD7gTeBHJZMzRfZtA24DvgAeyXATsB94C/hJyeR0kX1bgVuAfcCjGW4CDgBvAz8rmZwqsm8LcDPwI/B4hpuAg8C7wC9KJieL7NsM3ATsB57McBNwGHgP+FXJ5ESRfZuAG4ADwNMZbgKOAO8DvymZHC+ybwq4DjgIPJfhJuAY8AHwu5LJsSL7NgDXAAeBFzLcBBwHPgT+UDI5WmTfeuBq4AiwJcNNwEngI+BPJZMjRfatA1YDfwEvZbgJOAXsAv5SMjlcZN9aYBXQA7ye4SbgNLAb6FUy+bvIvjXASqAbeGOC7YL9LLAHOKNk8leRfauBFUAX8GaGm4CzwF7grJLJX0X2rQKWA13Athxu54C9wHklk7+L7LsMWAZ0A9snuF2wnwfOK5kcKrLvUmAp0AO8leFWA/QCF5RMDhbZdwmwBOgF3s5wqwH6gEElkwNF9l0MLAb6gHcy3GqAfmBIyeTPIvsuAhYB/cC7GW41wAAwrGTyR5F9FwILgQHgvQy3GmAQGFEy+b3IvguABcB54P0MtxpgCBhVMvmtyL7zgfnAeeCDHG4jwJiSyf4i+84D5gFjwIcZbjXAKJBSMvmlyL5zgbnAOLArw60GGAdSSia/Ftm3HZgDpIBPMtxqgBSQVjL5pci+bcBsQMDuHG5pQEom+4rs2wrMAuqAfTncVFNNNdVU0/+gfwEeN0qMWuL2zgAAAABJRU5ErkJggg==');
      background-size: 50px 50px;
      mix-blend-mode: overlay;
      opacity: 0;
      animation: noise 0.2s steps(2) infinite;
    }

    .noise:hover::after {
      opacity: 0.5;
    }

    @keyframes noise {
      0% { transform: translate(0, 0); }
      50% { transform: translate(1px, 1px); }
      100% { transform: translate(-1px, -1px); }
    }

    /* Flicker Effect */
    .flicker:hover {
      animation: flicker 0.3s steps(3) infinite;
    }

    @keyframes flicker {
      0% { filter: brightness(1); }
      50% { filter: brightness(1.4); }
      100% { filter: brightness(0.8); }
    }

    h3 {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    }

    p {
      margin: 0;
      opacity: 0.8;
      text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
    }
  `]
})
export class GlitchComponent {} 
import { Component } from '@angular/core';

@Component({
  selector: 'app-reveal',
  standalone: true,
  template: `
    <div class="container">
      <h1>Reveal Hover Effect</h1>
      <p class="description">Elements that reveal hidden content on hover</p>
      <div class="demo">
        <div class="grid">
          <div class="card slide-up">
            <img src="https://picsum.photos/300/200" alt="Random image">
            <div class="overlay">
              <h3>Slide Up</h3>
              <p>Content slides up from bottom</p>
            </div>
          </div>
          <div class="card fade-in">
            <img src="https://picsum.photos/300/201" alt="Random image">
            <div class="overlay">
              <h3>Fade In</h3>
              <p>Content fades in smoothly</p>
            </div>
          </div>
          <div class="card split">
            <img src="https://picsum.photos/300/202" alt="Random image">
            <div class="overlay">
              <div class="top">Hover</div>
              <div class="bottom">Split</div>
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
      padding: 4rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      max-width: 1000px;
    }

    .card {
      position: relative;
      border-radius: 8px;
      overflow: hidden;
      cursor: pointer;
    }

    img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      display: block;
    }

    .overlay {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: white;
    }

    h3 {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
    }

    p {
      margin: 0;
      opacity: 0.8;
    }

    /* Slide Up Effect */
    .slide-up .overlay {
      transform: translateY(100%);
      transition: transform 0.3s ease;
    }

    .slide-up:hover .overlay {
      transform: translateY(0);
    }

    /* Fade In Effect */
    .fade-in .overlay {
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .fade-in:hover .overlay {
      opacity: 1;
    }

    /* Split Effect */
    .split .overlay {
      display: flex;
      flex-direction: column;
      background: none;
    }

    .split .top,
    .split .bottom {
      position: absolute;
      width: 100%;
      height: 50%;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      transition: transform 0.3s ease;
    }

    .split .top {
      top: 0;
      transform: translateY(-100%);
    }

    .split .bottom {
      bottom: 0;
      transform: translateY(100%);
    }

    .split:hover .top {
      transform: translateY(0);
    }

    .split:hover .bottom {
      transform: translateY(0);
    }
  `]
})
export class RevealComponent {} 
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'text-effects/neon', pathMatch: 'full' },
  {
    path: 'text-effects',
    children: [
      {
        path: 'neon',
        loadComponent: () => import('../text-effects/neon/neon.component').then(m => m.NeonComponent)
      },
      {
        path: 'gradient',
        loadComponent: () => import('../text-effects/gradient/gradient.component').then(m => m.GradientComponent)
      },
      {
        path: 'glitch',
        loadComponent: () => import('../text-effects/glitch/glitch.component').then(m => m.GlitchComponent)
      },
      {
        path: 'wave',
        loadComponent: () => import('../text-effects/wave/wave.component').then(m => m.WaveComponent)
      },
      {
        path: 'typing',
        loadComponent: () => import('../text-effects/typing/typing.component').then(m => m.TypingComponent)
      },
      {
        path: 'shadow',
        loadComponent: () => import('../text-effects/shadow/shadow.component').then(m => m.ShadowComponent)
      },
      {
        path: 'reveal',
        loadComponent: () => import('../text-effects/reveal/reveal.component').then(m => m.RevealComponent)
      },
      {
        path: 'rainbow',
        loadComponent: () => import('../text-effects/rainbow/rainbow.component').then(m => m.RainbowComponent)
      },
      {
        path: 'fire',
        loadComponent: () => import('../text-effects/fire/fire.component').then(m => m.FireComponent)
      },
      {
        path: 'matrix',
        loadComponent: () => import('../text-effects/matrix/matrix.component').then(m => m.MatrixComponent)
      }
    ]
  }
];

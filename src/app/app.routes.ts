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
  },
  {
    path: 'card-effects',
    children: [
      {
        path: 'flip',
        loadComponent: () => import('../card-effects/flip/flip.component').then(m => m.FlipComponent)
      },
      {
        path: 'hover',
        loadComponent: () => import('../card-effects/hover/hover.component').then(m => m.HoverComponent)
      },
      {
        path: 'glassmorphism',
        loadComponent: () => import('../card-effects/glassmorphism/glassmorphism.component').then(m => m.GlassmorphismComponent)
      },
      {
        path: 'parallax',
        loadComponent: () => import('../card-effects/parallax/parallax.component').then(m => m.ParallaxComponent)
      },
      {
        path: 'morph',
        loadComponent: () => import('../card-effects/morph/morph.component').then(m => m.MorphComponent)
      }
    ]
  },
  {
    path: 'button-effects',
    children: [
      {
        path: 'pulse',
        loadComponent: () => import('../button-effects/pulse/pulse.component').then(m => m.PulseComponent)
      },
      {
        path: 'ripple',
        loadComponent: () => import('../button-effects/ripple/ripple.component').then(m => m.RippleComponent)
      },
      {
        path: 'liquid',
        loadComponent: () => import('../button-effects/liquid/liquid.component').then(m => m.LiquidComponent)
      },
      {
        path: 'neon',
        loadComponent: () => import('../button-effects/neon/neon.component').then(m => m.NeonComponent)
      },
      {
        path: 'magnetic',
        loadComponent: () => import('../button-effects/magnetic/magnetic.component').then(m => m.MagneticComponent)
      }
    ]
  },
  {
    path: 'loading-effects',
    children: [
      {
        path: 'spinner',
        loadComponent: () => import('../loading-effects/spinner/spinner.component').then(m => m.SpinnerComponent)
      },
      {
        path: 'dots',
        loadComponent: () => import('../loading-effects/dots/dots.component').then(m => m.DotsComponent)
      },
      {
        path: 'skeleton',
        loadComponent: () => import('../loading-effects/skeleton/skeleton.component').then(m => m.SkeletonComponent)
      },
      {
        path: 'progress',
        loadComponent: () => import('../loading-effects/progress/progress.component').then(m => m.ProgressComponent)
      },
      {
        path: 'pulse',
        loadComponent: () => import('../loading-effects/pulse/pulse.component').then(m => m.PulseComponent)
      }
    ]
  },
  {
    path: 'input-effects',
    children: [
      {
        path: 'floating',
        loadComponent: () => import('../input-effects/floating/floating.component').then(m => m.FloatingComponent)
      },
      {
        path: 'underline',
        loadComponent: () => import('../input-effects/underline/underline.component').then(m => m.UnderlineComponent)
      },
      {
        path: 'glow',
        loadComponent: () => import('../input-effects/glow/glow.component').then(m => m.GlowComponent)
      },
      {
        path: 'expand',
        loadComponent: () => import('../input-effects/expand/expand.component').then(m => m.ExpandComponent)
      },
      {
        path: 'shake',
        loadComponent: () => import('../input-effects/shake/shake.component').then(m => m.ShakeComponent)
      }
    ]
  },
  {
    path: 'hover-effects',
    children: [
      {
        path: 'scale',
        loadComponent: () => import('../hover-effects/scale/scale.component').then(m => m.ScaleComponent)
      },
      {
        path: 'rotate',
        loadComponent: () => import('../hover-effects/rotate/rotate.component').then(m => m.RotateComponent)
      },
      {
        path: 'tilt',
        loadComponent: () => import('../hover-effects/tilt/tilt.component').then(m => m.TiltComponent)
      },
      {
        path: 'reveal',
        loadComponent: () => import('../hover-effects/reveal/reveal.component').then(m => m.RevealComponent)
      },
      {
        path: 'float',
        loadComponent: () => import('../hover-effects/float/float.component').then(m => m.FloatComponent)
      }
    ]
  },
  {
    path: 'scroll-effects',
    children: [
      {
        path: 'fade',
        loadComponent: () => import('../scroll-effects/fade/fade.component').then(m => m.FadeComponent)
      },
      {
        path: 'slide',
        loadComponent: () => import('../scroll-effects/slide/slide.component').then(m => m.SlideComponent)
      },
      {
        path: 'zoom',
        loadComponent: () => import('../scroll-effects/zoom/zoom.component').then(m => m.ZoomComponent)
      },
      {
        path: 'parallax',
        loadComponent: () => import('../scroll-effects/parallax/parallax.component').then(m => m.ParallaxComponent)
      },
      {
        path: 'sticky',
        loadComponent: () => import('../scroll-effects/sticky/sticky.component').then(m => m.StickyComponent)
      }
    ]
  },
  {
    path: 'background-effects',
    children: [
      {
        path: 'gradient',
        loadComponent: () => import('../background-effects/gradient/gradient.component').then(m => m.GradientComponent)
      },
      {
        path: 'particles',
        loadComponent: () => import('../background-effects/particles/particles.component').then(m => m.ParticlesComponent)
      },
      {
        path: 'waves',
        loadComponent: () => import('../background-effects/waves/waves.component').then(m => m.WavesComponent)
      },
      {
        path: 'mesh',
        loadComponent: () => import('../background-effects/mesh/mesh.component').then(m => m.MeshComponent)
      },
      {
        path: 'noise',
        loadComponent: () => import('../background-effects/noise/noise.component').then(m => m.NoiseComponent)
      }
    ]
  },
  {
    path: 'cursor-effects',
    children: [
      {
        path: 'trail',
        loadComponent: () => import('../cursor-effects/trail/trail.component').then(m => m.TrailComponent)
      },
      {
        path: 'magnetic',
        loadComponent: () => import('../cursor-effects/magnetic/magnetic.component').then(m => m.MagneticComponent)
      },
      {
        path: 'spotlight',
        loadComponent: () => import('../cursor-effects/spotlight/spotlight.component').then(m => m.SpotlightComponent)
      },
      {
        path: 'distortion',
        loadComponent: () => import('../cursor-effects/distortion/distortion.component').then(m => m.DistortionComponent)
      },
      {
        path: 'custom',
        loadComponent: () => import('../cursor-effects/custom/custom.component').then(m => m.CustomComponent)
      }
    ]
  },
  {
    path: 'transform-effects',
    children: [
      {
        path: 'morph',
        loadComponent: () => import('../transform-effects/morph/morph.component').then(m => m.MorphComponent)
      },
      {
        path: 'liquid',
        loadComponent: () => import('../transform-effects/liquid/liquid.component').then(m => m.LiquidComponent)
      },
      {
        path: 'fold',
        loadComponent: () => import('../transform-effects/fold/fold.component').then(m => m.FoldComponent)
      },
      {
        path: 'shatter',
        loadComponent: () => import('../transform-effects/shatter/shatter.component').then(m => m.ShatterComponent)
      },
      {
        path: 'elastic',
        loadComponent: () => import('../transform-effects/elastic/elastic.component').then(m => m.ElasticComponent)
      }
    ]
  },
  {
    path: 'filter-effects',
    children: [
      {
        path: 'blur',
        loadComponent: () => import('../filter-effects/blur/blur.component').then(m => m.BlurComponent)
      },
      {
        path: 'glitch',
        loadComponent: () => import('../filter-effects/glitch/glitch.component').then(m => m.GlitchComponent)
      },
      {
        path: 'pixelate',
        loadComponent: () => import('../filter-effects/pixelate/pixelate.component').then(m => m.PixelateComponent)
      },
      {
        path: 'duotone',
        loadComponent: () => import('../filter-effects/duotone/duotone.component').then(m => m.DuotoneComponent)
      },
      {
        path: 'distortion',
        loadComponent: () => import('../filter-effects/distortion/distortion.component').then(m => m.DistortionComponent)
      }
    ]
  },
  {
    path: 'sound-effects',
    children: [
      {
        path: 'visualizer',
        loadComponent: () => import('../sound-effects/visualizer/visualizer.component').then(m => m.VisualizerComponent)
      },
      {
        path: 'waveform',
        loadComponent: () => import('../sound-effects/waveform/waveform.component').then(m => m.WaveformComponent)
      },
      {
        path: 'spectrum',
        loadComponent: () => import('../sound-effects/spectrum/spectrum.component').then(m => m.SpectrumComponent)
      },
      {
        path: 'particles',
        loadComponent: () => import('../sound-effects/particles/particles.component').then(m => m.ParticlesComponent)
      },
      {
        path: 'equalizer',
        loadComponent: () => import('../sound-effects/equalizer/equalizer.component').then(m => m.EqualizerComponent)
      }
    ]
  },
  {
    path: 'physics-effects',
    children: [
      {
        path: 'gravity',
        loadComponent: () => import('../physics-effects/gravity/gravity.component').then(m => m.GravityComponent)
      },
      {
        path: 'collision',
        loadComponent: () => import('../physics-effects/collision/collision.component').then(m => m.CollisionComponent)
      },
      {
        path: 'spring',
        loadComponent: () => import('../physics-effects/spring/spring.component').then(m => m.SpringComponent)
      },
      {
        path: 'particles',
        loadComponent: () => import('../physics-effects/particles/particles.component').then(m => m.ParticlesComponent)
      },
      {
        path: 'rope',
        loadComponent: () => import('../physics-effects/rope/rope.component').then(m => m.RopeComponent)
      }
    ]
  },
  {
    path: 'svg-effects',
    children: [
      {
        path: 'morphing',
        loadComponent: () => import('../svg-effects/morphing/morphing.component').then(m => m.MorphingComponent)
      },
      {
        path: 'drawing',
        loadComponent: () => import('../svg-effects/drawing/drawing.component').then(m => m.DrawingComponent)
      },
      {
        path: 'filters',
        loadComponent: () => import('../svg-effects/filters/filters.component').then(m => m.FiltersComponent)
      },
      {
        path: 'animation',
        loadComponent: () => import('../svg-effects/animation/animation.component').then(m => m.AnimationComponent)
      },
      {
        path: 'patterns',
        loadComponent: () => import('../svg-effects/patterns/patterns.component').then(m => m.PatternsComponent)
      }
    ]
  },
  {
    path: '3d-effects',
    children: [
      {
        path: 'cube',
        loadComponent: () => import('../3d-effects/cube/cube.component').then(m => m.CubeComponent)
      },
      {
        path: 'carousel',
        loadComponent: () => import('../3d-effects/carousel/carousel.component').then(m => m.CarouselComponent)
      },
      {
        path: 'flip',
        loadComponent: () => import('../3d-effects/flip/flip.component').then(m => m.FlipComponent)
      },
      {
        path: 'fold',
        loadComponent: () => import('../3d-effects/fold/fold.component').then(m => m.FoldComponent)
      },
      {
        path: 'perspective',
        loadComponent: () => import('../3d-effects/perspective/perspective.component').then(m => m.PerspectiveComponent)
      }
    ]
  }
];

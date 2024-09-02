import presetRemToPx from '@unocss/preset-rem-to-px'
import { presetWind } from '@unocss/preset-wind'
import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetWind(),
    presetIcons({ scale: 1.2, warn: true }),
    presetRemToPx({ baseFontSize: 4 }),
  ],
  shortcuts: [
    ['wh-full', 'w-full h-full'],
    ['flex-center', 'flex justify-center items-center'],
    ['absolute-center', 'absolute left-0 right-0 top-0 bottom-0'],
    ['a-danger', 'color-#FA2929 hover:color-#FF4D4D'],
  ],
  rules: [
    [/^border-(.*)-(.*)-(.*)-(.*)$/, ([, c, d, e, f]) => ({ [`border-${c}`]: `${d}px ${e} ${f}` })],
    ['font-comic', { 'font-family': "'Comic Sans MS', cursive, LiSu, sans-serif;" }],
    [
      /^webkit-clamp-(.*)$/,
      ([, c]) => ({
        display: '-webkit-box',
        ' -webkit-box-orient': 'vertical',
        '-webkit-line-clamp': `${c}`,
      }),
    ],
    [
      /^text-ellipsis-line-(.*)$/,
      ([, c]) => ({
        display: '-webkit-box',
        '-webkit-box-orient': 'vertical',
        '-webkit-line-clamp': `${c}`,
        'text-overflow': 'ellipsis',
        'white-space': 'normal',
      }),
    ],
    [
      /^width-center-(.*)$/,
      ([, c]) => ({
        width: `${c}px`,
        margin: '0 auto',
      }),
    ],
  ],
  theme: {
    colors: {
      primary: 'var(--primary-color)',
    },
  },
})

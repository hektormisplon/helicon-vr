import { interval } from 'rxjs'
import { debounce, skip } from 'rxjs/operators'
import { writable$ } from './utils/observable-store'
import { tracks$ } from './mixer'

const defaults = tracks$.getValue().map((_, i) => ({
  id: i + 1,
  ...{
    envelope: {
      attack: 0.01,
      attackCurve: 'linear',
      decay: 0.1,
      decayCurve: 'exponential',
      release: 1,
      releaseCurve: 'exponential',
      sustain: 0.5
    },
    oscillator: {
      type: 'sine',
      volume: 0
    },
    portamento: 0
  }
}))

export const defaultSettings = defaults[0]
export const synths$ = writable$(defaults)

synths$
  .pipe(debounce(() => interval(100)))
  .subscribe(master => localStorage.setItem('synths', JSON.stringify(master)))

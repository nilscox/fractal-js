import ColorInterpolate from 'color-interpolate';

const palette = ColorInterpolate(['black', 'red', 'green', 'blue']);

export type FractalOpts = {
  x: number;
  y: number;
  scale: number;
};

type Complex = {
  r: number;
  i: number;
}

const SCALE_FACTOR = 400;
const MAX_ITER = 30;

export const mandelbrot = (canvas: HTMLCanvasElement, opts: FractalOpts) => {
  const { width, height } = canvas;
  const ctx = canvas.getContext('2d');

  const compute = (c: Complex) => {
    let z: Complex = { r: 0, i: 0 };
    let n = 0;

    do {
      const tmp = z.r;
      z.r = z.r * z.r - z.i * z.i + c.r;
      z.i = 2 * tmp * z.i + c.i;
      n++;
    } while (n < MAX_ITER && z.r * z.r + z.i * z.i < 4);

    if(z.r * z.r + z.i * z.i > 1)
      n -= Math.log(Math.log(z.r * z.r + z.i * z.i)) / Math.log(2);

    return n / MAX_ITER;
  };

  for (let x = 0; x < width; ++x) {
    for (let y = 0; y < height; ++y) {

      const c: Complex = {
        r: (x - width / 2) / (opts.scale * SCALE_FACTOR) + opts.x,
        i: (y - height / 2) / (opts.scale * SCALE_FACTOR) + opts.y,
      };

      const result = compute(c);

      if (result === 1)
        ctx.fillStyle = 'rgba(0, 0, 0, 0)';
      else
        ctx.fillStyle = palette(result);

      ctx.fillRect(x, y, 1, 1);
    }
  }
}

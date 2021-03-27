import { mandelbrot } from './mandelbrot';
import './styles.css';

const canvas = document.createElement('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.body.appendChild(canvas);

const opts = { x: -0.6, y: 0, scale: 1 };

console.time('draw');
mandelbrot(canvas, opts);
console.timeEnd('draw');

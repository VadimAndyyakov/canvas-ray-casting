import {CanvasObject} from '../canvas-object';
import {Vector} from './player';

export class Line implements CanvasObject {
  constructor(private ctx: CanvasRenderingContext2D | null, private from: Vector, private to: Vector) {
  }

  public draw(): void {
    if (this.ctx === null) {
      throw new Error('Не найден контекст для canvas');
    }
    this.ctx.strokeStyle = 'white';
    this.ctx.beginPath();
    this.ctx.moveTo(this.from.x, this.from.y);
    this.ctx.lineTo(this.to.x, this.to.y);
    this.ctx.stroke();
  }
}

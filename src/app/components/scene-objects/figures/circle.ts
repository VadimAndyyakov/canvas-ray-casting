import {CanvasObject} from '../canvas-object';
import {Vector} from './player';

export class Circle implements CanvasObject {
  constructor(
    private ctx: CanvasRenderingContext2D | null,
    private position: Vector,
    private radius: number,
    private color = 'white',
    private startAngle = 0,
    private endAngle = 2 * Math.PI
  ) {
  }

  public draw(): void {
    if (this.ctx === null) {
      throw new Error('Не найден контекст для canvas');
    }
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.position.x, this.position.y, this.radius, this.startAngle, this.endAngle);
    this.ctx.fill();
  }
}

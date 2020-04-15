import {CanvasObject} from '../canvas-object';
import {Vector} from './vector';
import {Line} from './line';

export class Ray implements CanvasObject {

  constructor(
    private ctx: CanvasRenderingContext2D | null,
    private position: Vector,
    private direction: Vector,
    private rayLength = 100
  ) {
  }

  draw(): void {
    const position = new Vector(this.position.x, this.position.y);
    const direction = new Vector(this.direction.x * this.rayLength, this.direction.y * this.rayLength);

    this.ctx?.translate(position.x, position.y);
    new Line(this.ctx, new Vector(0, 0), direction).draw();
    this.ctx?.setTransform(1, 0, 0, 1, 0, 0);
  }
}

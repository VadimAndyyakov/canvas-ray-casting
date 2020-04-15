import {CanvasObject} from '../scene-objects/canvas-object';

export class SceneRenderer {
  constructor(private ctx: CanvasRenderingContext2D) {
    if (this.ctx === null) {
      throw new Error('Нет контекста рисования, для канваса');
    }
  }

  public renderObjects(objects: Array<CanvasObject>): void {
    objects.forEach(object => object.draw());
  }

  public renderMap(width: number, height: number, color: string): void {
    this.clearMap(width, height);
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, width, height);
  }

  private clearMap(width: number, height: number): void {
    this.ctx.clearRect(0, 0, width, height);
  }
}

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
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, width, height);
  }
}

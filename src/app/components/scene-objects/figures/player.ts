import {CanvasObject} from '../canvas-object';
import {VectorHandler} from '../../../services/vector-handler';
import {Ray} from './ray';
import {Vector} from './vector';
import {Circle} from './circle';

export enum MoveDirection {
  Forward,
  Backward
}

export class Player implements CanvasObject {

  /** направление игрока, по умолчанию вправо */
  private direction: Vector = new Vector(1, 0);

  private rayLength = 150;

  constructor(
    private ctx: CanvasRenderingContext2D | null,
    private radius: number,
    private position: Vector,
    private speed: number,
    private vectorHandler: VectorHandler
  ) {
  }

  /**
   * главный метод который вызывается для отображения игрока на canvas
   */
  public draw(): void {
    if (this.ctx === null) {
      throw new Error('Не найден контекст для canvas');
    }
    new Ray(this.ctx, this.position, this.direction, this.rayLength).draw();
    new Circle(this.ctx, this.position, this.radius).draw();
  }

  /**
   * поворот игрока на месте влево
   * @param deg угол поворота
   */
  public turnLeft(deg: number): void {
    this.direction = this.rotate(-deg);
  }

  /**
   * поворот игрока на месте вправо
   * @param deg угол поворота
   */
  public turnRight(deg: number): void {
    this.direction = this.rotate(deg);
  }

  /**
   * движение игрока вперед или назад относительно направления взгляда
   * @param moveDirection направление движения, 0 - вперед, 1 - назад
   */
  public move(moveDirection: MoveDirection): void {

    const position = this.position;
    const direction = this.direction;
    const rayLength = this.rayLength;

    const lookAtPoint = new Vector(
      position.x + direction.x * rayLength,
      position.y + direction.y * rayLength
    );

    const directionVector = this.vectorHandler.getDirectionVector(position, lookAtPoint);
    const normalizeVector = this.vectorHandler.getNormalizedVector(directionVector, rayLength);

    if (moveDirection === MoveDirection.Forward && this.speed < 0) {
      this.speed = this.speed * -1;
    }
    if (moveDirection === MoveDirection.Backward && this.speed > 0) {
      this.speed = this.speed * -1;
    }

    this.position.x += normalizeVector.x * this.speed;
    this.position.y += normalizeVector.y * this.speed;

  }

  /**
   * возвращает вектор повернутый на градус переданный в аргументе
   * @param deg угол в градусах
   */
  private rotate(deg: number): Vector {
    const cos = Math.cos(this.vectorHandler.degToRadian(deg));
    const sin = Math.sin(this.vectorHandler.degToRadian(deg));

    const posX = this.direction.x;
    const posY = this.direction.y;

    return new Vector(
      posX * cos - posY * sin,
      posX * sin + posY * cos
    );
  }
}

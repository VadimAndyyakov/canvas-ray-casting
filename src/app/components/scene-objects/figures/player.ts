import {CanvasObject} from '../canvas-object';
import {Circle} from './circle';
import {Line} from './line';

export class Vector {
  constructor(public x: number, public y: number) {
  }
}

export enum MoveDirection {
  Forward,
  Backward
}

export class Player implements CanvasObject {

  constructor(
    private ctx: CanvasRenderingContext2D | null,
    private radius: number,
    private position: Vector,
    private direction: Vector,
    private speed: number
  ) {
  }

  /**
   * главный метод который вызывается для отображения игрока на canvas
   */
  public draw(): void {
    if (this.ctx === null) {
      throw new Error('Не найден контекст для canvas');
    }
    new Circle(this.ctx, this.position, this.radius).draw();
    this.drawViewingAngle();
  }

  /**
   * поворот игрока на месте влево
   * @param deg угол поворота
   */
  public turnLeft(deg: number): void {
    this.direction = this.rotate(this.position, this.direction, -deg);
  }

  /**
   * поворот игрока на месте вправо
   * @param deg угол поворота
   */
  public turnRight(deg: number): void {
    this.direction = this.rotate(this.position, this.direction, deg);
  }

  /**
   * движение игрока вперед или назад относительно направления взгляда
   * @param direction направление движения, 0 - вперед, 1 - назад
   */
  public move(direction: MoveDirection): void {
    const directionVector = this.getDirectionVector(this.position, this.direction);
    const lengthVector = this.getLengthVector(directionVector);
    const normalizeVector = this.getNormalizedVector(directionVector, lengthVector);

    if (direction === MoveDirection.Forward && this.speed < 0) {
      this.speed = this.speed * -1;
    }
    if (direction === MoveDirection.Backward && this.speed > 0) {
      this.speed = this.speed * -1;
    }

    this.position.x += normalizeVector.x * this.speed;
    this.direction.x += normalizeVector.x * this.speed;
    this.position.y += normalizeVector.y * this.speed;
    this.direction.y += normalizeVector.y * this.speed;

    this.drawRangeOfVisibility();
  }

  /**
   * изобраить линию "взгляда" игрока
   */
  private drawRangeOfVisibility(): void {
    const playerPosition = new Vector(this.position.x, this.position.y);
    const playerDirection = new Vector(this.direction.x, this.direction.y);

    const directionVector = this.getDirectionVector(playerPosition, playerDirection);
    const lengthDirectionVector = this.getLengthVector(directionVector);
    const normalizedDirectionVector = this.getNormalizedVector(directionVector, lengthDirectionVector);

    const pointOfView = new Vector(
      playerPosition.x + lengthDirectionVector * normalizedDirectionVector.x,
      playerPosition.y + lengthDirectionVector * normalizedDirectionVector.y
    );

    new Line(this.ctx, playerPosition, pointOfView).draw();
  }

  /**
   * изобраить векторами угол обзора игрока
   */
  private drawViewingAngle(): void {
    const playerPosition = new Vector(this.position.x, this.position.y);
    const playerDirection = new Vector(this.direction.x, this.direction.y);

    const directionVector = this.getDirectionVector(playerPosition, playerDirection);
    const lengthDirectionVector = this.getLengthVector(directionVector);
    const normalizedDirectionVector = this.getNormalizedVector(directionVector, lengthDirectionVector);

    let pointOfView = new Vector(
      playerPosition.x + lengthDirectionVector * normalizedDirectionVector.x,
      playerPosition.y + lengthDirectionVector * normalizedDirectionVector.y
    );

    pointOfView = this.rotate(playerPosition, pointOfView, 45 / 2);

    let i = 45;
    while (i > 0) {
      pointOfView = this.rotate(playerPosition, pointOfView, -1);
      new Line(this.ctx, playerPosition, pointOfView).draw();
      i--;
    }
  }

  /** FIXME: Вынести методы для работы с векторами в сервис */

  /**
   * поворот вектора ab на переданный в аргументе угол относительно точки a
   * @param a координаты начала вектора
   * @param b координаты конца вектора
   * @param deg угол в градусах
   */
  private rotate(a: Vector, b: Vector, deg: number): Vector {
    const cos = Math.cos(this.degToRadian(deg));
    const sin = Math.sin(this.degToRadian(deg));

    const dirX = b.x;
    const dirY = b.y;

    const posX = a.x;
    const posY = a.y;

    return new Vector(
      posX + (dirX - posX) * cos - (dirY - posY) * sin,
      posY + (dirX - posX) * sin + (dirY - posY) * cos
    );
  }

  /**
   * получить нормаль вектора
   * @param vector вектор
   * @param length длинна вектора
   */
  private getNormalizedVector(vector: Vector, length: number): Vector {
    return new Vector(vector.x / length, vector.y / length);
  }

  /**
   * получить длинну вектора переданного в аргументе
   * @param vector вектор длинна которого ищется
   */
  private getLengthVector(vector: Vector): number {
    return Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
  }

  /**
   * получить вектор направления игрока
   */
  private getDirectionVector(start: Vector, end: Vector): Vector {
    return new Vector(end.x - start.x, end.y - start.y);
  }

  /**
   * перевести градусы в радианы
   * @param deg угол который необходимо первести
   */
  private degToRadian(deg: number): number {
    return deg * Math.PI / 180;
  }
}

import {Injectable} from '@angular/core';
import {Vector} from '../components/scene-objects/figures/vector';

@Injectable({
  providedIn: 'root',
})
export class VectorHandler {
  /**
   * получить нормаль вектора
   * @param vector вектор
   * @param length длинна вектора
   */
  public getNormalizedVector(vector: Vector, length: number): Vector {
    return new Vector(vector.x / length, vector.y / length);
  }

  /**
   * получить длинну вектора переданного в аргументе
   * @param vector вектор длинна которого ищется
   */
  public getLengthVector(vector: Vector): number {
    return Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
  }

  /**
   * получить вектор направления игрока
   */
  public getDirectionVector(start: Vector, end: Vector): Vector {
    return new Vector(end.x - start.x, end.y - start.y);
  }

  /**
   * перевести градусы в радианы
   * @param deg угол который необходимо первести
   */
  public degToRadian(deg: number): number {
    return deg * Math.PI / 180;
  }
}

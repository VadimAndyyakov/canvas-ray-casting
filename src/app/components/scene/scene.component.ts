import {AfterViewInit, Component, ElementRef, HostListener, Input, ViewChild} from '@angular/core';
import {MoveDirection, Player, Vector} from '../scene-objects/figures/player';
import {SceneOptions} from '../scene-options/options';
import {SceneRenderer} from '../scene-options/renderer';


@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss']
})
export class SceneComponent implements AfterViewInit {

  // настройки сцены
  @Input()
  public sceneOptions!: SceneOptions;

  // ссылка на канвас элемент из шаблона
  @ViewChild('canvasElement')
  private canvasElementRef!: ElementRef;

  // сцена
  private scene!: SceneRenderer;

  // игрок
  private player!: Player;

  // вектор первоначаланой позиции игрока
  private playerPosition: Vector = new Vector(300, 300);

  // вектор первоначального направления игрока
  private playerDirection: Vector = new Vector(this.playerPosition.x + 150, this.playerPosition.y);

  // вектор первоначальной скорости игрока
  private playerSpeed = 10;

  // варинаты в какую сторону может производится движение
  private playerMoveDirections = MoveDirection;

  /**
   * отслеживание нажатий на клавиатуру и обработка кнопок для движения игрока WASD
   * @param event событие нажатия кнопки на клавиатуре
   */
  @HostListener('document:keydown', ['$event'])
  public handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'w') {
      this.player.move(this.playerMoveDirections.Forward);
    }
    if (event.key === 'a') {
      this.player.turnLeft(5);
    }
    if (event.key === 's') {
      this.player.move(this.playerMoveDirections.Backward);
    }
    if (event.key === 'd') {
      this.player.turnRight(5);
    }
  }

  public ngAfterViewInit(): void {
    if (!this.ctx) {
      throw new Error('Нет контеста canvas для рисования');
    }
    this.playerPosition.x = this.sceneOptions.sceneSize.width / 2;
    this.playerPosition.y = this.sceneOptions.sceneSize.height / 2;
    this.scene = new SceneRenderer(this.ctx);
    this.player = new Player(this.ctx, 10, this.playerPosition, this.playerDirection, this.playerSpeed);
    this.renderScene();
  }

  /**
   * возращает canvas как html элемент
   */
  public get canvasElement(): HTMLCanvasElement {
    return this.canvasElementRef.nativeElement;
  }

  /**
   * возвращает контекст для рисования на канвасе
   */
  public get ctx(): CanvasRenderingContext2D | null {
    return this.canvasElement.getContext('2d');
  }

  /**
   * запускает рендер сцены в 60 fp
   */
  private renderScene(): void {
    requestAnimationFrame(this.renderScene.bind(this));
    this.scene.renderMap(this.sceneOptions.sceneSize.width, this.sceneOptions.sceneSize.height, 'black');
    this.scene.renderObjects([this.player]);
  }

}

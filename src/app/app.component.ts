import { Component } from '@angular/core';
import {SceneSize} from './components/scene-options/size';
import {SceneOptions} from './components/scene-options/options';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public sceneOptions = new SceneOptions(new SceneSize(600, 600));
}

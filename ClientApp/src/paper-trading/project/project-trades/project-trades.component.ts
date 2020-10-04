import {Component} from "@angular/core";
import {ProjectService} from "../../shared/project.service";

@Component({
  selector: 'app-project-trades',
  templateUrl: './project-trades.component.html'
})
export class ProjectTradesComponent {

  public get project() {
    return this.projectService.project;
  }

  public constructor(private projectService: ProjectService) {}
}

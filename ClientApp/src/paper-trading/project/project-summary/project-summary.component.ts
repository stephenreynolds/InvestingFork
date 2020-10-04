import {Component} from "@angular/core";
import {ProjectService} from "../../shared/project.service";

@Component({
  selector: 'app-project-summary',
  templateUrl: './project-summary.component.html'
})
export class ProjectSummaryComponent {

  public get project() {
    return this.projectService.project;
  }

  public constructor(private projectService: ProjectService) {}
}

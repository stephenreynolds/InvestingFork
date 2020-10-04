import {Component} from "@angular/core";
import {ProjectService} from '../../shared/project.service'
import {Router} from "@angular/router";

@Component({
  selector: 'app-project-settings',
  templateUrl: './project-settings.component.html'
})
export class ProjectSettingsComponent {

  public name: string = '';
  public confirmText: string = '';
  public errorMessage: string = '';

  public get project() {
    return this.projectService.project;
  }

  public constructor(private projectService: ProjectService, private router: Router) {}

  public renameProject() {
    this.projectService.renameProject(this.project.name, this.name).subscribe(
      success => {
        this.project.name = this.name;
      },
      err => this.errorMessage = 'Failed to rename project.'
    );
  }

  public deleteProject() {
    if (this.confirmText == this.projectService.project.name) {
      this.projectService.deleteProject(this.projectService.project.name).subscribe(
        success => {
          this.projectService.project = undefined;
          this.projectService.getProjectList();
          this.router.navigate([`/paper/deleted`]);
        },
        err => (this.errorMessage = 'Failed to delete project.')
      )
    }
  }
}

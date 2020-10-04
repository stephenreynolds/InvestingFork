import { Component } from '@angular/core';
import {ProjectDesc} from "../shared/projectDesc";
import {ProjectService} from "../shared/project.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html'
})
export class NewProjectComponent {

  public readonly initialBalance: number = 100_000.00;
  public errorMessage: string = '';

  public project: ProjectDesc = {
    name: '',
    description: '',
    balance: this.initialBalance
  };

  public constructor(private projectService: ProjectService, private router: Router) { }

  public onSubmit(): void {
    console.log(this.project.balance);
    this.projectService.createProject(this.project).subscribe(
      success => {
        this.projectService.getProjectList();
        this.router.navigate([`/paper/project/${this.project.name}`]);
      },
      err => {
        this.errorMessage = 'Failed to create new project.';
      }
    );
  }
}

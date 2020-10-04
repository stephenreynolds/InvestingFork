import { Component, OnInit } from '@angular/core';
import {ProjectDesc} from "../shared/projectDesc";
import {ProjectService} from "../shared/project.service";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-project-tree',
  templateUrl: './project-tree.component.html',
  styleUrls: ['./project-tree.component.scss']
})
export class ProjectTreeComponent implements OnInit {

  public plus = faPlus;

  public projectList: ProjectDesc[];

  public constructor(public projectService: ProjectService) { }

  public ngOnInit(): void {
    this.projectService.projectListUpdated$.subscribe(projectList => this.projectList = projectList);
    this.projectService.getProjectList();
  }
}

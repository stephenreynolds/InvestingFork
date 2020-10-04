import {Component} from "@angular/core";
import {ProjectService} from "../../shared/project.service";

@Component({
  selector: 'app-new-trade',
  templateUrl: './new-trade.component.html'
})
export class NewTradeComponent {

  public get project() {
    return this.projectService.project;
  }

  public constructor(private projectService: ProjectService) {}
}

import {Component, OnInit} from "@angular/core";
import {ProjectService} from "../../shared/project.service";
import {FinnhubService} from "../../../app/shared/finnhub.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-new-trade',
  templateUrl: './new-trade.component.html',
  styleUrls: ['./new-trade.component.scss']
})
export class NewTradeComponent implements OnInit {

  public trade = {
    symbol: '',
    quantity: 0,
    expiration: Date,
    strike: 0,
    price: 0
  };

  public get project() {
    return this.projectService.project;
  }

  public get symbolDescription() {
    if (this.trade.symbol && this.finnhub.symbols) {
      const result = this.finnhub.symbols.find(s => s.symbol === this.trade.symbol);
      return result ? result.description : 'Symbol does not exist.';
    }
    return '';
  }

  public constructor(public finnhub: FinnhubService, private projectService: ProjectService) { }

  public ngOnInit(): void {
    this.finnhub.getStockSymbols('US');
  }
}

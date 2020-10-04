import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {AuthorizeService, IUser} from "../../api-authorization/authorize.service";
import {faCaretDown, faPlus} from "@fortawesome/free-solid-svg-icons";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  public caretDown = faCaretDown;
  public plus = faPlus;
  public isAuthenticated: Observable<boolean>;
  public userName: Observable<string>;

  public constructor(@Inject(DOCUMENT) public document: Document, public authorizeService: AuthorizeService) { }

  public ngOnInit(): void {
    this.isAuthenticated = this.authorizeService.isAuthenticated();
    this.userName = this.authorizeService.getUser().pipe(map(u => u && u.name));
  }
}

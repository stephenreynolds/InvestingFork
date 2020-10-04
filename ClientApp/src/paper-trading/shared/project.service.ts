import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {ProjectDesc} from "./projectDesc";
import {Project} from "./project";

@Injectable()
export class ProjectService {

  private projectListSubject = new Subject<ProjectDesc[]>();
  public projectListUpdated$ = this.projectListSubject.asObservable();
  public project = {} as Project;

  constructor(private http: HttpClient) {}

  public getProject(id): Observable<Project> {
    return this.http.get<Project>(`api/projects/${id}`);
  }

  public getProjectList() {
    this.http.get<ProjectDesc[]>('api/projects').subscribe(list => this.projectListSubject.next(list));
  }

  public createProject(model: ProjectDesc) {
    return this.http.post('api/projects/create', model);
  }

  public renameProject(name: string, newName: string) {
    return this.http.put('api/projects/rename', {name: name, newName: newName});
  }

  public deleteProject(name: string) {
    return this.http.delete(`api/projects/${name}`);
  }
}

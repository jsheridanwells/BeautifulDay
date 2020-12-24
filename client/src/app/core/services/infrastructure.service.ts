import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ModuleListItem} from '../models/moduleListItem.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfrastructureService {

  constructor(
    private http: HttpClient
  ) { }

  getModuleList(): Observable<ModuleListItem[]> {
    return this.http.get<ModuleListItem[]>('/api/moduleList');
  }
}

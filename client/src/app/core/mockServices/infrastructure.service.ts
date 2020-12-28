import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ModuleListItem} from '../models/moduleListItem.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfrastructureService {

  constructor(
    private http: HttpClient
  ) { }

  getModuleList(): Observable<ModuleListItem[]> {
    return of(this.moduleList);
  }

  moduleList: ModuleListItem[] = [
    // { name: 'Habits', endpoint: '/habits', link: '/habits', order: 0 },
    { name: 'Activity', endpoint: '/activity', link: '/activity', order: 1 },
    { name: 'Eating', endpoint: '/eating', link: '/eating', order: 2, },
    { name: 'Weight', endpoint: '/weight', link: '/weight', order: 3 }
  ];
}


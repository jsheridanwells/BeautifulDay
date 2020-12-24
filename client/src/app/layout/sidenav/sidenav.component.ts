import { Component, OnInit } from '@angular/core';
import {UserProfileModel} from '@app/models/userProfile.model';
import {InfrastructureService} from '@app/services/infrastructure.service';
import {ProfileService} from '@app/services/profile.service';
import { ModuleListItem } from '../../core/models/moduleListItem.model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  moduleList: ModuleListItem[] = [];
  userProfile: UserProfileModel;

  constructor(
    private infrastructure: InfrastructureService,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.infrastructure.getModuleList().subscribe(list => {
      this.moduleList = list;
      console.log('list::: ', list);
    });

    this.profileService.getProfile().subscribe((profile: UserProfileModel) => {
      this.userProfile = profile;
    });
  }

}

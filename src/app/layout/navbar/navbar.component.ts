import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { values } from 'lodash';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  setActive = false;
  @Input('isClose') isClose = false;
  @Output('closePanel') closePanel= new EventEmitter();
  navList = [
    {
      parent: 'Dashboard',
      isVisible: true,
      isLowerItem: false,
      isActive: false,
      iconName: 'bi bi-boxes',
      children: [],
      sortOrder: 1,
      path: 'layout/admin/parent/dashboard',
      param: null
    },
    {
      parent: 'Manage Profiles',
      isVisible: true,
      isLowerItem: false,
      isActive: false,
      iconName: 'bi bi-person-circle',
      children: [],
      sortOrder: 2,
      path: 'layout/admin/parent/manageUser',
      param: null
    },
    {
      parent: 'Manage Produts',
      isVisible: true,
      isLowerItem: false,
      isActive: false,
      iconName: 'bi bi-stack',
      path: 'layout/admin/parent/manageProduct',
      param: null,
      children: [{
        parent: 'Notification',
        isVisible: true,
        sortOrder: 3,
        iconName: '',
      }],
      sortOrder: 3,
    },
    {
      parent: 'Settings',
      isVisible: true,
      isLowerItem: true,
      isActive: false,
      iconName: 'bi bi-wrench-adjustable',
      path: 'layout/admin/parent/',
      param: null,
      children: [],
      sortOrder: 3,
   }] as any;



  constructor(private router: Router) { }

  ngOnInit(): void {
    this.checkActiveRoute();
  }

  setActiveRoute(path: string, param: any) {
    this.router.navigate([path]);
    this.checkActiveRoute();
  }

  checkActiveRoute() {
    setTimeout(() => {
      let list = _.cloneDeep(this.navList);
      list?.forEach((e: any, i: number, s: any) => {
        let url = this.router.url.substring(1);
        if (e?.path == url) {
          s[i].isActive = true;
        } else {
          s[i].isActive = false;
        }
      });
      this.navList = list;
    }, 500);
  }

  closeSidePane(value: boolean){
    this.isClose = !value;
    this.closePanel.emit(!value);
  }

}

import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/common/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isClose = false;
  
  constructor(private readonly storage: StorageService,
    private readonly router:Router) { }

  ngOnInit(): void {
  }
  
  openSidePane(value:boolean){
    this.isClose = value;
    console.log('lovale', this.isClose)
    
  }

  logout(){
      this.storage.clearAllValueFromStorage();
      this.router.navigate(['']);  
  }
}

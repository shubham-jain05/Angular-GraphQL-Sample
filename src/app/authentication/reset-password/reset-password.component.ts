import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/common/services/helper.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(public helper:HelperService) { }

  ngOnInit(): void {
  }

}

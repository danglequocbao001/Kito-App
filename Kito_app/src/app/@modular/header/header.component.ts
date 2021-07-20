import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() headerCustom: { title?: String, background?: String, color?: String };

  constructor(
    private router: Router
  ) { }

  ngOnInit() { }

  gotoMain() {
    this.router.navigateByUrl('/tabbar-manager/main')
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-item',
  templateUrl: './main-item.component.html',
  styleUrls: ['./main-item.component.scss'],
})
export class MainItemComponent implements OnInit {
  @Input() data: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit() { }

  goToDetail() {
    switch (this.data.diocese_type) {
      case 'vatican':
        this.router.navigateByUrl('main/tonggiaophan/parish-news');
        break;
      case 'archdiocese':
      case 'diocese':
        const data = {
          diocese: {
            id: this.data.id,
            name: this.data.name,
            type: this.data.diocese_type
          }
        }
        this.router.navigate(['/main/tonggiaophan/archdiocese-detail'], {
          queryParams: {
            data: JSON.stringify(data)
          }
        })
        break;
    }
  }
}

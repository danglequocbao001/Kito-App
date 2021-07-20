import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catechism-class',
  templateUrl: './catechism-class.page.html',
  styleUrls: ['./catechism-class.page.scss'],
})
export class CatechismClassPage implements OnInit {
  headerCustom = {title: 'Lớp học giáo lý'};

  catechismList = [
    {
      id:0,
      name: 'Giáo lý Hồng Ân',
      thumbImage: 'assets/img/catechism-menu-1.svg',
      desUrl: 'main/catechism-class/catechism'
    },
    {
      id: 1,
      name: 'Giáo lý hôn nhân',
      thumbImage: 'assets/img/catechism-menu-2.svg',
      desUrl: 'main/catechism-class/catechism-marriage'
    },
    {
      id: 2,
      name: 'Giáo lý dự tòng',
      thumbImage: 'assets/img/catechism-menu-4.svg',
      desUrl: 'main/catechism-class/catechism-marriage'
    },
    {
      id: 3,
      name: 'Đố vui giáo lý',
      thumbImage: 'assets/img/catechism-menu-3.svg',
      desUrl: '/questionares'
    }
  ]

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  goToCatechismDetail(catechism) {
    this.router.navigate([catechism.desUrl], {
      queryParams: {
        data: catechism.name,
        id: catechism.id
      }
    })
  }
}

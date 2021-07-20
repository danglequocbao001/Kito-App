import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, IonSlides } from '@ionic/angular';
import { CourseService } from 'src/app/@app-core/http/course';
import { IPageCourse } from 'src/app/@app-core/http/course/course.DTO';

@Component({
  selector: 'app-catechism',
  templateUrl: './catechism.page.html',
  styleUrls: ['./catechism.page.scss'],
})
export class CatechismPage implements OnInit {
  @ViewChild('slides', { static: false }) slides: IonSlides;
  @ViewChild(IonContent) ionContent: IonContent;

  headerCustom = { title: 'Giáo lý Hồng Ân' };
  menuItems = [];
  currentMenuItemId = null;

  slideOptions = {
    initialSlide: 0,
    autoHeight: true
  };

  pageResult: IPageCourse = {
    course_group_id: null
  };

  constructor(
    private coursesService: CourseService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.coursesService.getGroup().subscribe((data: any) => {
      this.menuItems = data.course_groups;
      this.currentMenuItemId = this.menuItems[0].id;

      this.menuItems.forEach(menuItem => {
        this.pageResult.course_group_id = menuItem.id;
        menuItem.list = [];
        this.coursesService.getAll(this.pageResult).subscribe(d => {
          menuItem.list = d.courses;
        })
      })
    })
  }

  scrollToTop(value) {
    this.ionContent.scrollToTop(value);
  }

  changeSegment(menuItem) {
    this.slides.lockSwipes(false).then(() => {
      this.slides.slideTo(this.menuItems.indexOf(menuItem)).then(() => {
        this.changeSlide(menuItem.id);
        this.slides.lockSwipes(true);
      });
    })
  }

  changeSlide(id) {
    this.currentMenuItemId = id;
  }

  disableSwipe() {
    this.slides.lockSwipes(true);
  }

  formatTime(date) {
    date = new Date(date);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + 'h' + ':' + minutes
    return strTime
  }
}

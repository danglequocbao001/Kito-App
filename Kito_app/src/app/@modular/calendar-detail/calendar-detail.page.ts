import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-calendar-detail',
  templateUrl: './calendar-detail.page.html',
  styleUrls: ['./calendar-detail.page.scss'],
})
export class CalendarDetailPage implements OnInit {
  headerCustom = { title: 'Lịch Công Giáo' };
  data
  day
  dayName
  DATES = [ 
    {
    name: 'THỨ 2',
    value: 1
   },
   {
    name: 'THỨ 3',
    value: 2
   },
   {
    name: 'THỨ 4',
    value: 3
   },
   {
    name: 'THỨ 5',
    value: 4
   },
   {
    name: 'THỨ 6',
    value: 5
   },
   {
    name: 'THỨ 7',
    value: 6
   },
   {
    name: 'CHỦ NHẬT',
    value: 0
   },
  
  ]

  constructor(
    private route: ActivatedRoute
    
  ) { }
  ngOnInit() {
    this.route.queryParams.subscribe((data: any) =>{
      this.data = JSON.parse(data['data'])
      this.data['created_at'] = new Date (this.data['created_at'])
      this.data['date'] = new Date (this.data['date'])
      this.day = this.data['date'].getDay()
      console.log(this.data)
     this.DATES.forEach(i =>{
        if(i.value == this.day) {
          this.dayName = i.name
        }
      })
    })
  }

}

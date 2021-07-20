import { Component, OnInit } from '@angular/core';
import { VaticanService } from 'src/app/@app-core/http';
import { PopeService } from 'src/app/@app-core/http/pope';
import { IPageVatican } from 'src/app/@app-core/http/vatican/vatican.DTO';

@Component({
  selector: 'app-parish-news',
  templateUrl: './parish-news.page.html',
  styleUrls: ['./parish-news.page.scss'],
})
export class ParishNewsPage implements OnInit {
  headerCustom = { title: 'Tòa thánh Vatican' }

  list = [
    {
      heading: 'Tin tức Vatican',
      items: [],
      category_id: 2,
      type: { general: 'news', detail: 'vatican' }
    },
    {
      heading: 'Tiểu sử các Đức Giáo Hoàng',
      items: [],
      type: { general: 'story', detail: 'pope' }
    }
  ]
  pageRequest: IPageVatican = {
    page: 1,
    per_page: 4,
    category_id: 2
  }
  pageRequestPope: IPageVatican = {
    page: 1,
    per_page: 4,
    // category_id: 2
  }
  constructor(
    private vaticanService: VaticanService,
    private popeService: PopeService,
    // private categoryService:va
  ) { }

  ngOnInit() {
    this.vaticanService.getCategory().subscribe((data) => {
      data.vatican_news_categories.forEach(element => {
        if (element.name == "Vatican") {
          this.pageRequest.category_id = element.id;
        }
        // if (element.name == "Đức Giáo Hoàng") {
        //   this.pageRequestPope.category_id = element.id
        // }

      });
      this.getData();
    })

  }

  getVatican() {

    this.vaticanService.getAll(this.pageRequest).subscribe(data => {
      data.vatican_news.forEach(v => v.type = this.list[0].type);
      this.list[0].items = data.vatican_news;
      this.list[0].category_id = this.pageRequest.category_id
    })
  }

  getPope() {
    this.popeService.getAll(this.pageRequestPope).subscribe(data => {

      data.pope_infos.forEach(v => v.type = this.list[1].type);
      this.list[1].items = data.pope_infos;


    })
  }

  getData() {
    this.getVatican();
    this.getPope();
  }

}

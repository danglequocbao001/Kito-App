import { QuestionaresService } from 'src/app/@app-core/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.page.html',
  styleUrls: ['./rank.page.scss'],
})
export class RankPage implements OnInit {
  headerCustom = { title: 'BẢNG XẾP HẠNG', background: 'transparent', color: '#fff' };
  ranking: any = [];
  constructor(
    private QuestionaresService: QuestionaresService
  ) { }

  ngOnInit() {
    this.getRanking();
  }

  getRanking() {
    this.QuestionaresService.getRanking().subscribe((data) => {
      this.ranking = data.app_users.slice(0, 10);
      let i = 1;
      for (let ranker of this.ranking) {
        ranker.index = i;
        if (ranker.thumb_image == null || ranker.thumb_image.url == null) {
          ranker.thumb_image = {};
          ranker.thumb_image.url = 'https://i.imgur.com/edwXSJa.png';
        }
        i++;
      }
    })
  }
}

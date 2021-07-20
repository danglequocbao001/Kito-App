import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.page.html',
  styleUrls: ['./rule.page.scss'],
})
export class RulePage implements OnInit {
  headerCustom = { title: 'LUẬT CHƠI', background: 'transparent', color: '#002d63' };

  rules = [
    {
      rule: 'Người chơi chọn chủ đề hoặc cấp độ để bắt đầu trò chơi.'
    },
    {
      rule: 'Mỗi lượt chơi sẽ có một số câu hỏi với 4 đáp án A, B, C, D (thời gian là 12s/1 câu). Người chơi chọn 1 trong 4 đáp án để trả lời câu hỏi.'
    },
    {
      rule: 'Người chơi có 3 mạng, mỗi câu trả lời sai sẽ bị trừ 1 mạng. Đến khi hết 3 mạng sẽ kết thúc trò chơi.'
    },
    {
      rule: 'Điểm sau khi kết thúc sẽ được tích lũy vào bảng xếp hạng.'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}

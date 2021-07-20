import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { HymnMusicService } from 'src/app/@app-core/http';
import { Howl } from 'howler';
import { IonRange } from '@ionic/angular';
import { LoadingService } from 'src/app/@app-core/utils';

@Component({
  selector: 'app-bible-song-detail',
  templateUrl: './bible-song-detail.component.html',
  styleUrls: ['./bible-song-detail.component.scss'],
})
export class BibleSongDetailComponent implements OnInit {
  headerCustom = { title: '' };
  public id;
  data;
  hDisplay: any;
  mDisplay: any;
  progress = 0;
  songs = [];
  activeSong = null;
  player: Howl = null;
  activeScrollLyric = true;
  shuffledSongs = [];
  progressInterval = null;

  timeFlag = 0;
  mixed = false;
  notFound = false;
  REPEATING_TYPE = {
    NONE: 0,
    REPEAT_ONE: 1,
    REPEAT_ALL: 2
  }
  repeatingType = this.REPEATING_TYPE.REPEAT_ALL;
  @ViewChild('contentLyric') lyricContent: ElementRef;
  @ViewChild('range', { static: false }) range: IonRange;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private hymnVideoServicer: HymnMusicService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params.id !== undefined) {
        this.id = params.id;
        this.getItem();


      } else {
        this.location.back()
      }
    });
  }
  getItem() {
    this.loadingService.present();
    this.hymnVideoServicer.getBibleSongDetail(this.id).subscribe((res: any) => {
      this.data = res.bible_song;

      this.start(this.data);
      this.hymnVideoServicer.getAllBibleSong({
        page: 1,
        per_page: 1000
      }).subscribe((data) => {
        this.songs = data.bible_songs
      })
      this.loadingService.dismiss();
    })
  }
  onEndSong() {
    switch (this.repeatingType) {
      case this.REPEATING_TYPE.REPEAT_ONE:
        this.player.play();
        break;
      case this.REPEATING_TYPE.REPEAT_ALL:
        this.next();
        break;
    }
  }
  start(song) {
    this.activeSong = song;
    if (this.player) {
      this.player.stop();

    }
    this.player = new Howl({
      src: [song.url],
      html5: true,
      onplay: () => {

        // this.timeFlag = 0;
        this.updateProgress();
        let maxTime = this.player.duration();
        let heightLyric = this.lyricContent.nativeElement.offsetHeight;
        let InitHeight = 0;
        let that = this;
        let timeLoading = heightLyric / (maxTime - 20);
        // let time = this.timeFlag;
        let contentLyricDOM = document.querySelector('.lyric');
        function myLoop() {

          setTimeout(function () {
            // if (!that.activeScrollLyric) {

            //   setTimeout(() => {
            //     that.activeScrollLyric = true;
            //     that.timeFlag = Math.round(Number(that.player.seek()));
            //     myLoop();
            //   }, 2000);
            // }
            that.timeFlag += 1;

            if (that.timeFlag > 20) {
              contentLyricDOM.scrollTop = (that.timeFlag) + timeLoading;
              // InitHeight = (that.timeFlag - 20) + timeLoading;
            }

            if (that.timeFlag <= 20) {
              contentLyricDOM.scrollTop = 0;
            }


            if (that.timeFlag < maxTime && that.player.playing() && that.activeScrollLyric) {

              // console.log('that.timeFlag', that.timeFlag, '/', timeLoading);


              myLoop();
            }
          }, 1000)
        }
        myLoop();

      },
      onend: () => {
        this.onEndSong();
      }
    });
    this.player.play();


  }

  togglePlayer() {
    if (this.player.playing()) {
      this.player.pause();
      this.timeFlag--;
    } else {
      this.player.play();
    }
  }
  toggleMixed() {
    this.mixed = !this.mixed;
  }

  changeRepeatingType() {
    switch (this.repeatingType) {
      case this.REPEATING_TYPE.REPEAT_ALL:
        this.repeatingType = this.REPEATING_TYPE.REPEAT_ONE;
        break;
      case this.REPEATING_TYPE.REPEAT_ONE:
        this.repeatingType = this.REPEATING_TYPE.NONE;
        break;
      case this.REPEATING_TYPE.NONE:
        this.repeatingType = this.REPEATING_TYPE.REPEAT_ALL;
        break;
    }
  }

  getCurrentListAndIndex() {
    let list = [];
    let index = null;
    if (this.mixed) {

      list = this.shuffledSongs
      index = list.indexOf(this.activeSong);

      if (index === -1) {
        list = this.shuffledSongs;
        index = list.indexOf(this.activeSong);

      }

    } else {
      list = this.songs;



      index = list.indexOf(this.activeSong);
      console.log(index);

      if (index === -1) {
        list = this.songs;
        index = list.indexOf(this.activeSong);


      }

    }
    return { list: list, index: index };
  }

  next() {
    const { list, index } = this.getCurrentListAndIndex();
    this.data = list[index + 1];

    this.start(index === list.length + 1 ? list[0] : list[index + 1]);
    // this.activeLyric = list[index + 1].lyric;
  }

  prev() {
    const { list, index } = this.getCurrentListAndIndex();
    this.data = list[index - 1];

    this.start(index > 0 ? list[index - 1] : list[list.length - 1])
    // this.activeLyric = list[index - 1].lyric;

  }

  seek() {

    let newValue = +this.range.value;
    let duration = this.player.duration();
    this.player.seek(duration * (newValue / 100));
    this.timeFlag = Math.round(duration * (newValue / 100));


  }

  updateProgress() {
    clearInterval(this.progressInterval);
    this.progressInterval = setInterval(() => {
      const seek = this.player.seek();
      this.progress = (<any>seek / this.player.duration()) * 100 || 0;
    }, 1000)
  }
  secondsToHms(d) {
    d = Number(d);
    const h = Math.floor(d / 3600);
    const m = Math.floor(d % 3600 / 60);
    const s = Math.floor(d % 3600 % 60);

    this.hDisplay = h > 0 ? h : '';
    var mDisplay = m > 0 ? m : '';
    mDisplay = mDisplay > 9 ? mDisplay : '0' + mDisplay + ':';
    var sDisplay = s > 0 ? s : '';
    sDisplay = sDisplay > 9 ? sDisplay : '0' + sDisplay;
    return this.hDisplay + mDisplay + sDisplay;
  }

  shuffleSongs() {
    this.shuffledSongs = this.shuffleArr(this.songs);
  }
  shuffleArr(arr) {
    const tempArr = [...arr];
    for (let i = tempArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tempArr[i], tempArr[j]] = [tempArr[j], tempArr[i]];
    }
    return tempArr;
  }
}

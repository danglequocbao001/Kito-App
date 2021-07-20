import { HymnMusicService } from './../../@app-core/http/hymn-music/hymn-music.service';
import { Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Howl } from 'howler'
import { IonInfiniteScroll, IonRange, IonContent, ModalController, GestureController, Gesture } from '@ionic/angular';
import { LoadingService } from 'src/app/@app-core/utils';
import { IPageRequest } from 'src/app/@app-core/http';
import { ComfillerComponent } from 'src/app/@modular/comfiller/comfiller.component';
import { IHymnMusic } from 'src/app/@app-core/http/hymn-music/hymn-music.DTO';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-hymn-music',
  templateUrl: './hymn-music.page.html',
  styleUrls: ['./hymn-music.page.scss'],
})
export class HymnMusicPage implements OnInit {
  @ViewChild('range', { static: false }) range: IonRange;
  @ViewChild('infiniteScrollSongs', { static: false }) infinityScroll: IonInfiniteScroll;
  @ViewChild('infiniteScrollFaveolate', { static: false }) infiniteScrollFaveScroll: IonInfiniteScroll;

  @ViewChild(IonContent) ionContent: IonContent;
  @ViewChild('contentLyric') lyricContent: ElementRef;
  // @ViewChild('contentLyric', { read: ElementRef }) contentLyricTouch: ElementRef
  // @ViewChild(IonContent, { read: ElementRef })
  // @HostListener("lyricContent:scroll", ['$event'])
  // scrollMe(event) {

  //   // this.activeLyric = false;
  // }
  headerCustom = { title: 'Nhạc Thánh ca' };
  segmentValue = 'all';
  selectFiller = "all";
  selectSort = "asc";
  timeFlag = 0;
  activeScrollLyric = true;
  songs = [];
  favoriteSongs = [];
  shuffledSongs = [];
  shuffledFavoriteSongs = [];

  activeSong = null;
  activeLyric = null;
  player: Howl = null;
  progress = 0;
  progressInterval = null;
  hasModal = false;
  hDisplay: any;
  mDisplay: any;
  mixed = false;
  notFound = false;
  REPEATING_TYPE = {
    NONE: 0,
    REPEAT_ONE: 1,
    REPEAT_ALL: 2
  }
  repeatingType = this.REPEATING_TYPE.REPEAT_ALL;
  pageRequestSongs: IHymnMusic = {
    page: 1,
    per_page: 16,
    filter: "",
    filter_type: "asc"
  }
  pageRequestFavoriteSongs: IHymnMusic = {
    page: 1,
    per_page: 16,
    filter: "",
    filter_type: "asc"
  }

  loadedSong = false;
  notFoundSong = false;
  constructor(
    private hymnMusicService: HymnMusicService,
    private loadingService: LoadingService,
    private modalCtrl: ModalController,
    private gestureCtrl: GestureController
  ) {

    // const gesture: Gesture = this.gestureCtrl.create({
    //   el: this.lyricContent.nativeElement,
    //   threshold: 15,
    //   gestureName: 'my-gesture',
    //   onStart: ev => this.onMoveHandler(ev)
    // }, true);

  }

  ngOnInit() {
    this.loadingService.present();
    this.getData();
  }

  ngOnDestroy() {
    clearInterval(this.progressInterval);
    this.player && this.player.unload();
  }
  search(value: string) {
    if (typeof value != 'string') {
      return;
    }
    else if (!value) {
      delete this.pageRequestSongs.search;
      delete this.pageRequestFavoriteSongs.search
    }
    else {
      this.pageRequestSongs.search = value;
      this.pageRequestFavoriteSongs.search = value;
    }
    this.pageRequestSongs.page = 1;
    this.pageRequestFavoriteSongs.page = 1;
    this.songs = [];
    this.favoriteSongs = [];
    this.getData();
    this.infinityScroll.disabled = false;
    this.infiniteScrollFaveScroll.disabled = false;
    this.ionContent.scrollToTop(0);
  }

  shuffleArr(arr) {
    const tempArr = [...arr];
    for (let i = tempArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tempArr[i], tempArr[j]] = [tempArr[j], tempArr[i]];
    }
    return tempArr;
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

  shuffleFavoriteSongs() {
    this.shuffledFavoriteSongs = this.shuffleArr(this.favoriteSongs);
  }

  getSongs(func?) {
    this.notFound = false;
    this.hymnMusicService.getAll(this.pageRequestSongs).subscribe(data => {
      this.notFound = true;
      this.songs = this.songs.concat(data.songs)
      this.pageRequestSongs.page++;
      func && func();
      if (this.songs.length >= data.meta.pagination.total_objects) {
        this.infinityScroll.disabled = true;
      }

      setTimeout(() => {
        this.loadingService.dismiss();
      }, 1500)
    })
  }

  getFavoriteSongs(func?) {
    this.notFound = false;
    this.hymnMusicService.getAllFavorite(this.pageRequestFavoriteSongs).subscribe(data => {
      this.notFound = true;
      this.favoriteSongs = this.favoriteSongs.concat(data.songs)
      this.pageRequestFavoriteSongs.page++;
      func && func();
      if (this.favoriteSongs.length >= data.meta.pagination.total_objects) {
        this.infiniteScrollFaveScroll.disabled = true;
      }



      setTimeout(() => {
        this.loadingService.dismiss();
      }, 1500)
    })
  }

  getData() {
    this.getSongs();
    this.getFavoriteSongs();
  }

  changedSegment(event) {
    this.segmentValue = event.target.value;
    this.ionContent.scrollToTop(0);
    // this.pageRequestFavoriteSongs.page = 1;
    // this.pageRequestSongs.page = 1;
    // this.infiniteScrollFaveScroll.disabled = true;
    // this.infinityScroll.disabled = true;
    if (this.checkAllSegment()) {
      // this.infinityScroll.complete();

      if (!this.loadedSong) {
        // this.infinityScroll.disabled = false;

      }
    } else {
      // this.infiniteScrollFaveScroll.complete();
      // this.infiniteScrollFaveScroll.disabled = false;

    }
    // this.segmentValue = event.target.value;


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
    console.log(song);
    this.timeFlag = -1;
    this.activeSong = song;
    if (this.player) {
      this.player.stop();

    }
    this.player = new Howl({
      src: [song.url],
      html5: true,
      onplay: () => {

        this.updateProgress();
        let maxTime = this.player.duration();
        // let heightLyric = this.lyricContent.nativeElement.offsetHeight;
        let InitHeight = 0;
        let that = this;
        let timeLoading = 300 / (maxTime - 20);
        // let time = this.timeFlag;
        let contentLyricDOM = document.querySelector('.modal-content');
        function myLoop() {

          setTimeout(function () {
            if (!that.activeScrollLyric) {

              setTimeout(() => {
                that.activeScrollLyric = true;
                that.timeFlag = Math.round(Number(that.player.seek()));
                myLoop();
              }, 2000);
            }
            that.timeFlag += 1;

            if (that.timeFlag > 20) {
              contentLyricDOM.scrollTop = (that.timeFlag) + timeLoading;
              // InitHeight = (that.timeFlag - 20) + timeLoading;
            }

            if (that.timeFlag <= 20) {
              contentLyricDOM.scrollTop = 10;
            }


            if (that.timeFlag < maxTime && that.player.playing() && that.activeScrollLyric) {

              console.log('that.timeFlag', that.timeFlag, '/', timeLoading);


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

  toggleLike(song) {
    event.stopPropagation();
    if (this.checkAllSegment()) {
      if (song.favourite) {
        this.hymnMusicService.unfavorite(song.id).subscribe(() => {
          song.favourite = !song.favourite;
          this.favoriteSongs = this.favoriteSongs.filter(favoriteSong => favoriteSong.id !== song.id);
          this.loadingService.dismiss();
        })
      } else {
        this.shuffleFavoriteSongs();
        this.hymnMusicService.favorite(song.id).subscribe(() => {
          song.favourite = !song.favourite;
          this.favoriteSongs.push(song);
          this.loadingService.dismiss();
        });
      }
    } else {
      this.hymnMusicService.unfavorite(song.id).subscribe(() => {
        this.favoriteSongs = this.favoriteSongs.filter(favoriteSong => favoriteSong.id !== song.id);
        document.documentElement.scrollTop = 0;
      });
    }
  }

  async toggleHasModal(bool) {

    const lyrictest = this.lyricContent.nativeElement;
    const gesture = await this.gestureCtrl.create({
      el: this.lyricContent.nativeElement,
      gestureName: 'swipe',
      direction: 'y',
      onMove: ev => {
        this.activeScrollLyric = false;
      },
      onEnd: ev => {

      }
    }
    );
    gesture.enable(true);
    this.hasModal = bool;
    this.hymnMusicService.getDetail(this.activeSong.id).subscribe((data: any) => {
      this.activeLyric = data.song.lyric;
    })
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
      list = this.checkAllSegment() ? this.shuffledSongs : this.shuffledFavoriteSongs;
      index = list.indexOf(this.activeSong);
      if (index === -1) {
        list = this.shuffledSongs;
        index = list.indexOf(this.activeSong);

      }

    } else {
      list = this.checkAllSegment() ? this.songs : this.favoriteSongs;


      index = list.indexOf(this.activeSong);
      if (index === -1) {
        list = this.songs;
        index = list.indexOf(this.activeSong);
      }

    }
    return { list: list, index: index };
  }

  next() {
    const { list, index } = this.getCurrentListAndIndex();

    this.start(index === list.length - 1 ? list[0] : list[index + 1]);
    this.activeLyric = list[index + 1].lyric;
  }

  prev() {
    const { list, index } = this.getCurrentListAndIndex();
    this.start(index > 0 ? list[index - 1] : list[list.length - 1])
    this.activeLyric = list[index - 1].lyric;

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

  checkActiveSong(song) {
    return this.activeSong && song.id === this.activeSong.id;
  }

  checkAllSegment() {
    return this.segmentValue === 'all';
  }

  loadMoreSongs(event) {

    this.getSongs(() => {
      event.target.complete();
    });



  }
  loadMoreSongsFavorite(event) {

    this.getFavoriteSongs(() => {
      event.target.complete();
    })


  }

  async clickFiller() {
    const popover = await this.modalCtrl.create({
      component: ComfillerComponent,
      swipeToClose: true,
      cssClass: 'modalFiller',
      componentProps: {
        fillerItem: this.selectFiller,
        sortItem: this.selectSort
      }
    });
    popover.onDidDismiss()
      .then(async (data) => {



        if (data.data?.filler) {
          this.selectFiller = data.data.filler;

          if (data.data.filler == "all") {
            this.pageRequestSongs.filter = "";
          }
          else {
            this.pageRequestSongs.filter = data.data.filler;
          }


        }
        if (data.data?.sort) {
          this.selectSort = data.data.sort;
          this.pageRequestSongs.filter_type = data.data.sort;
        }
        this.songs = await [];
        this.favoriteSongs = await [];
        this.pageRequestFavoriteSongs.page = await 0;
        this.pageRequestSongs.page = await 0;

        this.getData();
      });

    return await popover.present();
  }
}
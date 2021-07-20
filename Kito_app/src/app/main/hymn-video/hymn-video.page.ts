import { LoadingService } from 'src/app/@app-core/utils';
import { HymnMusicService } from './../../@app-core/http/hymn-music/hymn-music.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NavController, IonInfiniteScroll, IonContent } from '@ionic/angular';
import { IPageRequest } from 'src/app/@app-core/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hymn-video',
  templateUrl: './hymn-video.page.html',
  styleUrls: ['./hymn-video.page.scss'],
})
export class HymnVideoPage implements OnInit {
  @ViewChild('infiniteScrollVideos') infinityScroll: IonInfiniteScroll;
  @ViewChild(IonContent) ionContent: IonContent;
  headerCustom = { title: 'Video bài giảng & Sách tiếng nói' };
  trustedVideoUrlArray: SafeResourceUrl[] = [];
  pageRequestVideos: IPageRequest = {
    page: 1,
    per_page: 4,
  }
  pageRequestMusic: IPageRequest = {
    page: 1,
    per_page: 4,
  }
  videos = [];
  music = [];
  segmentValue = 'video';

  notFound = false;
  constructor(
    public navCtrl: NavController,
    private domSanitizer: DomSanitizer,
    private hymnVideoService: HymnMusicService,
    private LoadingService: LoadingService,
    private router: Router
  ) { }

  ngOnInit() {
    this.LoadingService.present();
    this.getVideos();
    this.getBiBlesSong();
  }

  getVideos(func?) {
    this.notFound = false;
    this.hymnVideoService.getAllLectureVideo(this.pageRequestVideos).subscribe(data => {
      this.notFound = true;
      this.videos = this.videos.concat(data.lecture_videos)
      this.pageRequestVideos.page++;
      func && func();
      if (this.videos.length >= data.meta.pagination.total_objects) {
        this.infinityScroll.disabled = true;
      }
      this.videos.forEach((e) => {
        e.trustLink = this.domSanitizer.bypassSecurityTrustResourceUrl(e.url.replace('watch?v=', 'embed/'))
      })
      setTimeout(() => {
        this.LoadingService.dismiss();
      }, 1500)
    })


  }
  getBiBlesSong(func?) {
    this.notFound = false;
    this.hymnVideoService.getAllBibleSong(this.pageRequestMusic).subscribe((data) => {
      data.bible_songs.forEach(element => {
        this.music.push(element)
      });
      this.pageRequestMusic.page++
      func && func();
      if (this.videos.length >= data.meta.pagination.total_objects) {
        this.infinityScroll.disabled = true;
      }
      setTimeout(() => {
        this.LoadingService.dismiss();
      }, 1500)


    })
  }
  loadMoreVideos(event) {
    this.getVideos(() => {
      event.target.complete();
    });
  }
  loadMoreMusic(event) {
    this.getBiBlesSong(() => {
      event.target.complete();
    })
  }

  search(value: string) {
    if (typeof value != 'string') {
      return;
    }
    else if (!value) {
      delete this.pageRequestVideos.search;
    }
    else {
      this.pageRequestVideos.search = value;
    }
    this.pageRequestVideos.page = 1;
    this.videos = [];
    this.trustedVideoUrlArray = [];
    this.getVideos();
    this.infinityScroll.disabled = false;
  }
  changedSegment(event) {

    this.segmentValue = event.target.value;

  }
  gotoBibleSongDetail(id) {
    this.router.navigate(['main/hymn-video/BibleSongdetail/' + id]);
  }
}

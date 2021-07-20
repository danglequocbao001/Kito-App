import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/@app-core/http';
import { UploadPhotoService } from 'src/app/@app-core/utils/upload-photo.service';
import { CameraService, LoadingService, SocialSharingService } from '../@app-core/utils';
@Component({
  selector: 'app-community',
  templateUrl: './community.page.html',
  styleUrls: ['./community.page.scss'],
})
export class CommunityPage implements OnInit {
  headerCustom = { title: 'Cộng đồng giáo dân' }

  posts: any
  clickComment = false
  CommentIDSelected
  commentContent
  imageurl
  repplyCommentID
  showfullcontenttext = "Xem thêm..."
  listComment = []
  commentIdReply
  constructor(
    private postService: PostService,
    private uploadService: UploadPhotoService,
    private router: Router,
    private loadingService: LoadingService,
    private socialSharingSerivce: SocialSharingService,
    private cameraService: CameraService
  ) { }
  type = ''

  ngOnInit() {
    this.getData()
  }
  getData() {
    this.loadingService.present()
    this.postService.getAllPosts().subscribe(data => {
      this.loadingService.dismiss()
      this.posts = data.posts;

      this.posts.forEach(element => {
        !element?.owner?.thumb_image?.url && (element.owner.thumb_image = { url: "assets/img/avatar.png" });
        element.showAll = false
        if (element.liked) {
          element.nameIcon = 'assets/icon/liked.svg'
        } else {
          element.nameIcon = 'assets/icon/like.svg'
        }
      });
    });
  }
  showMore(post) {
    post.showAll = true
  }
  showLess(post) {
    post.showAll = false
  }
  clickOutSideComment() {
    this.clickComment = false
  }
  likeToogle(post) {
    if (post.liked) {
      post.liked = false
      post.nameIcon = 'assets/icon/like.svg'
      this.postService.dislike(post.id).subscribe(() => {
      });
    } else {
      post.liked = true

      post.nameIcon = 'assets/icon/liked.svg'
      this.postService.addLike(post.id).subscribe(() => {
      });
    }

  }
  showcomment(id) {
    localStorage.setItem('commentsID', id);
    this.router.navigate(['/community/comment']);
  }
  comment(id) {
    this.CommentIDSelected = id;
    this.clickComment = this.clickComment ? false : true
    this.type = 'add'
  }
  sendComment() {
    this.clickComment = false
    if (this.type == 'add') {
      this.postService.addComment(this.CommentIDSelected, this.commentContent, this.imageurl).subscribe((data) => {
        this.getData()
        this.commentContent = ''
      })
    } else if (this.type == 'reply') {
      this.postService.repplycomment(this.CommentIDSelected,
        this.commentContent, this.imageurl, this.commentIdReply).subscribe((data) => {
          this.getData()
          this.commentContent = ''

        })
    }


  }
  Share() {
    this.socialSharingSerivce.share()
  }

  replyComment(id, ID) {
    this.clickComment = true
    this.type = 'reply'
    this.CommentIDSelected = id
    this.commentIdReply = ID

  }
  loadImg() {
    this.imageurl = this.uploadService.uploadPhoto();
    console.log('url', this.imageurl)
    var image
    this.cameraService.getAvatarUpload(image)
  }

}
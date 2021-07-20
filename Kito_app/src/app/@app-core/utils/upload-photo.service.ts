import { Injectable } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';
import { PopoverController } from '@ionic/angular';
import { PopoverimageComponent } from '../../@modular/popoverimage/popoverimage.component';
import { AccountService } from '../http';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class UploadPhotoService {

  constructor(
    public camera: Camera,
    public popoverController: PopoverController,
    private accountService: AccountService,
    private loadingService: LoadingService
  ) {}
  public uploadPhoto(){
    const options = {
      estinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true
    }
    this.camera.getPicture(options).then(async (dataUrl)=> {
      if(dataUrl){
        var dataUri = "data:image/jpeg;base64," + dataUrl;
        var image = this.dataURItoBlob(dataUri);
        let formData = new FormData;
        formData.append('files[]', image);
        this.accountService.uploadPhoto(formData).subscribe((data) => {
          this.loadingService.dismiss()
            console.log(data)
            //return data['data'][0]
        })
      }else {
        
      }
    })
  }
  
  dataURItoBlob(dataURI) {
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
        byteString = atob(dataURI.split(',')[1]);
    }
    else {
        byteString = encodeURI(dataURI.split(',')[1]);
    }
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: mimeString });
  }
}

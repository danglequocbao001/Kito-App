import { SocialSharingService } from './@app-core/utils/social-sharing.service';
import { NetworkService } from './@app-core/utils/network.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './@app-core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './@app-core/auth-guard.service';
import { Camera } from '@ionic-native/camera/ngx';
import { SlideService } from './@modular/slide/slide.service';
import { Stripe } from '@ionic-native/stripe/ngx';
import { enableProdMode } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx'
import { AudioManagement } from '@ionic-native/audio-management/ngx';
import { AudioManagerService, CameraService, GeolocationService, OneSignalService, SpeechRecognitionService } from './@app-core/utils';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';
import { CommonModule } from '@angular/common';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
// import { ImagePicker } from '@ionic-native/image-picker/ngx';

// import { IonicSwipeAllModule } from 'ionic-swipe-all';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    CommonModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    CoreModule.forRoot(),
    // StoreModule.forRoot({}),
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [
    StatusBar,
    SlideService,
    Stripe,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthGuard,
    Camera,
    CameraService,
    SpeechRecognition,
    SpeechRecognitionService,
    AudioManagement,
    AudioManagerService,
    OneSignal,
    OneSignalService,
    Geolocation,
    GeolocationService,
    NativeGeocoder,
    NativePageTransitions,
    NetworkService,
    SocialSharing,
    SocialSharingService,
    PhotoLibrary,
    // ImagePicker
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

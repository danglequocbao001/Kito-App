import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { LoadingService } from './loading.service';
import { ModalController, Platform } from '@ionic/angular';
import { MapPage } from '../../@modular/map/map.page'
interface Location {
  lat: number;
  lng: number;
  address: string;
}

@Injectable()

export class GeolocationService {

  geoEncoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

  customerLocation: Location = {
    lat: 0,
    lng: 0,
    address: null
  };

  centerService: google.maps.LatLngLiteral = { lat: parseFloat(localStorage.getItem('lat')), lng: parseFloat(localStorage.getItem('lng')) };

  constructor(public geolocation: Geolocation,
    public nativeGeocoder: NativeGeocoder,
    public loadingService: LoadingService,
    public PlatForm: Platform,
    public modalCtrl: ModalController,
  ) { }

  ngOnInit() { }

  getCurrentLocation() {
    this.PlatForm.ready().then(() => {
      this.loadingService.present();
      this.geolocation.getCurrentPosition().then((resp) => {
        this.centerService.lat = resp.coords.latitude;
        this.centerService.lng = resp.coords.longitude;
        this.getGeoEncoder(this.centerService.lat, this.centerService.lng);
        localStorage.setItem('address', this.customerLocation.address);
        localStorage.setItem('lat', this.centerService.lat.toFixed(8).toString());
        localStorage.setItem('lng', this.centerService.lng.toFixed(8).toString());
        this.loadingService.dismiss();
      })
    })
  }
  getCurrentLocationNoLoading() {
    this.PlatForm.ready().then(() => {
      this.geolocation.getCurrentPosition().then((resp) => {
        this.centerService.lat = resp.coords.latitude;
        this.centerService.lng = resp.coords.longitude;
        this.getGeoEncoder(this.centerService.lat, this.centerService.lng);
        localStorage.setItem('address', this.customerLocation.address);
        localStorage.setItem('lat', this.centerService.lat.toFixed(8).toString());
        localStorage.setItem('lng', this.centerService.lng.toFixed(8).toString());
      })
    })
  }
  getGeoEncoder(latitude, longitude) {
    this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoEncoderOptions)
      .then((result: NativeGeocoderResult[]) => {
        this.customerLocation.address = this.generateAddress(result[0]);
      })
      .catch(() => { }); // do not delete
  }
  generateAddress(addressObj) {
    let obj = [];
    let address = '';
    for (let key in addressObj) {
      obj.push(addressObj[key]);
    }
    obj.reverse();
    for (let val in obj) {
      if (obj[val].length)
        address += obj[val] + ', ';
    }
    return address.slice(4, address.length - 6);
  }

  distanceFromUserToPoint(lat1, lon1, lat2, lon2) {
    var R = 6371;
    var dLat = this.deg2rad(lat2 - lat1);
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return Math.trunc(d);
  }

  distanceFromUserToPointMet(lat1, lon1, lat2, lon2) {
    var R = 6378100;
    var dLat = this.deg2rad(lat2 - lat1);
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return Math.round((d + Number.EPSILON) * 100) / 100;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180)
  }

  async openModalGoogleMap() {
    this.loadingService.present();
    const modal = await this.modalCtrl.create({
      component: MapPage,
      cssClass: 'google-map-modal',
      swipeToClose: true,
    });
    modal.present();
  }
}
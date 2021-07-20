import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { IPageCategory, IPageProduct, StoreService } from '../@app-core/http';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {
  headerCustom = { title: 'Cửa hàng' };
  pageRequestCategories: IPageCategory = {
    page: 1,
    per_page: 20,
    parish_id: localStorage.getItem('parish_id')
  }
  sortType = {
    newest: 'newest',
    topSeller: 'top-seller',
    priceDesc: 'price-desc',
    priceAsc: 'price-asc'
  }
  currentCategoryId = ''
  pageRequestProducts: IPageProduct = {
    page: 1,
    per_page: 6,
    category_id: this.currentCategoryId,
    search: '',
    sort: this.sortType.newest
  }
  categories = []
  products = []
  constructor(
    private storeService: StoreService
  ) { }
  @ViewChild('infiniteScroll') infinityScroll: IonInfiniteScroll;

  ngOnInit() {
    const parishId = localStorage.getItem('tempParishId');
    this.getCategories();

   
  }
  ionViewWillEnter() {
 
  }
  getCategories() {
    this.storeService.getAllCategories(this.pageRequestCategories).subscribe(data => {
      this.categories = data.categories;
      this.currentCategoryId = this.categories[0].id;
      this.categories = data.categories
      this.getProducts();
    })
    localStorage.setItem('tempParishId', this.pageRequestCategories.parish_id);
  }
  Activecategory(item) {
    this.currentCategoryId = item.id
    this.getProducts()
  }
  getProducts() {
    this.pageRequestProducts.category_id = this.currentCategoryId;
    this.storeService.getAllProducts(this.pageRequestProducts).subscribe(data => {
      console.log(data)
      this.products = data.products
    })
  }
  loadMoreProducts() {
    
  }

}

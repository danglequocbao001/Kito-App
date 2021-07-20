import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './@app-core/auth-guard.service';
import { } from './changepassword/changepassword.module'

const routes: Routes = [
  {
    path: 'auth-manager',
    loadChildren: () => import('./auth-manager/auth-manager.module').then(m => m.AuthManagerPageModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then(m => m.MainPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'donate',
    loadChildren: () => import('./donate/donate.module').then(m => m.DonatePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'payment',
    loadChildren: () => import('./payment/payment.module').then(m => m.PaymentPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'paymentmethods',
    loadChildren: () => import('./paymentmethods/paymentmethods.module').then(m => m.PaymentmethodsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'pray',
    loadChildren: () => import('./pray/pray.module').then(m => m.PrayPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'page-noti',
    loadChildren: () => import('./@modular/page-noti/page-noti-routing.module').then(m => m.PageNotiRoutingModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'changepassword',
    loadChildren: () => import('./changepassword/changepassword.module').then(m => m.ChangepasswordPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(m => m.AccountPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'account-setting',
    loadChildren: () => import('./account-setting/account-setting.module').then(m => m.AccountSettingPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'slide',
    loadChildren: () => import('./@modular/slide/slide.module').then(m => m.SlideModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'modal-detail-order',
    loadChildren: () => import('./@modular/modal-detail-order/modal-detail-order.module').then(m => m.ModalDetailOrderPageModule),
    canActivate: [AuthGuard],
  },

  {
    path: 'dioceses',
    loadChildren: () => import('./dioceses/dioceses.module').then(m => m.DiocesesPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'news',
    loadChildren: () => import('./@modular/news/news.module').then(m => m.NewsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'information',
    loadChildren: () => import('./@modular/information/information.module').then(m => m.InformationPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'news-detail',
    loadChildren: () => import('./@modular/news-detail/news-detail.module').then(m => m.NewsDetailPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'parishes',
    loadChildren: () => import('./parishes/parishes.module').then(m => m.ParishesPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'map',
    loadChildren: () => import('./@modular/map/map.module').then(m => m.MapPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'statistic',
    loadChildren: () => import('./statistic/statistic.module').then(m => m.StatisticPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'questionares',
    loadChildren: () => import('./questionares/questionares.module').then(m => m.QuestionaresPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'community',
    loadChildren: () => import('./community/community.module').then(m => m.CommunityPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'calendar',
    loadChildren: () => import('./calendar/calendar.module').then( m => m.CalendarPageModule),
    canActivate: [AuthGuard],

  },
  {
    path: 'store',
    loadChildren: () => import('./store/store.module').then( m => m.StorePageModule),
    canActivate: [AuthGuard],

  },
  {
    path: 'calendar-detail',
    loadChildren: () => import('./@modular/calendar-detail/calendar-detail.module').then( m => m.CalendarDetailPageModule),
    canActivate: [AuthGuard],

  },

  {
    path: 'tabbar-manager',
    loadChildren: () => import('./tabbar-manager/tabbar-manager.module').then(m => m.TabbarManagerPageModule),
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/tabbar-manager/main', pathMatch: 'full' },
  { path: '**', redirectTo: 'tabbar-manager/main' },



  // {
  //   path: 'popup-registe',
  //   loadChildren: () => import('./@modular/popup-registe/popup-registe.module').then( m => m.PopupRegistePageModule)
  // },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
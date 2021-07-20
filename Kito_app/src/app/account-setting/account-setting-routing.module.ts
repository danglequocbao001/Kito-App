import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountSettingPage } from './account-setting.page';

const routes: Routes = [
  {
    path: '',
    component: AccountSettingPage
  },
  {
    path: 'orders-history',
    loadChildren: () => import('./orders-history/orders-history.module').then( m => m.OrdersHistoryPageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./setting/setting.module').then( m => m.SettingPageModule)
  },
  {
    path: 'introduce',
    loadChildren: () => import('./introduce/introduce.module').then( m => m.IntroducePageModule)
  },
  {
    path: 'support',
    loadChildren: () => import('./support/support.module').then( m => m.SupportPageModule)
  },
  {
    path: 'my-parish',
    loadChildren: () => import('./my-parish/my-parish.module').then( m => m.MyParishPageModule)
  },  {
    path: 'change-avatar',
    loadChildren: () => import('./change-avatar/change-avatar.module').then( m => m.ChangeAvatarPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then( m => m.NotificationPageModule)
  }


 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountSettingPageRoutingModule {}

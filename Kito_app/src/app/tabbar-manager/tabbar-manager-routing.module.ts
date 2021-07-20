import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabbarManagerPage } from './tabbar-manager.page';

const routes: Routes = [
  {
    path: '',
    component: TabbarManagerPage,
    children: [
      { 
        path: 'main', 
        children:[
          { 
            path: '', 
            loadChildren:  ()=> import('../main/main.module').then(m=>m.MainPageModule), 
            
          }
        ]
      },
      { 
        path: 'social', 
        children:[
          { 
            path: '', 
            loadChildren:  ()=> import('../community/community.module').then(m=>m.CommunityPageModule), 
          }
        ]
      },
      { 
        path: 'personal', 
        children:[
          { 
            path: '', 
            loadChildren:  ()=> import('../account-setting/account-setting.module').then(m=>m.AccountSettingPageModule), 
          }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabbarManagerPageRoutingModule {}

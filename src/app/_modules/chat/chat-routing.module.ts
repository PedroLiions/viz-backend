import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChatComponent} from '../../_components/modules/chat/chat/chat.component';

const routes: Routes = [
  {
    path: '',
    component: ChatComponent,
    data: {
      title: 'Chat',
      breadcrumb: [
        'Chat'
      ]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ChatRoutingModule {}

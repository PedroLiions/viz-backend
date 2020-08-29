import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from '../../_components/modules/chat/chat/chat.component';
import {ChatRoutingModule} from './chat-routing.module';



@NgModule({
  declarations: [ChatComponent],
  imports: [
    CommonModule,
    ChatRoutingModule
  ]
})
export class ChatModule { }

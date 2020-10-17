import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from '../../_components/modules/chat/chat/chat.component';
import {ChatRoutingModule} from './chat-routing.module';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [ChatComponent],
  imports: [
    CommonModule,
    ChatRoutingModule,
    FormsModule
  ]
})
export class ChatModule { }

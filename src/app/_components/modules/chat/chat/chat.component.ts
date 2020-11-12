import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {User} from '../../../../models/User';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  users: Array<User>;
  activeChatUserId: number;
  messages: any;

  messageToSend: string;

  constructor(
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  send(event = null): void {
    if (!(event == null || event.key === 'Enter')) {
      return;
    }

    const message = this.messageToSend;
    this.messageToSend = '';

    this.http.post(`${environment.API}/chat/send`, {
      message,
      recipient_user_id: this.activeChatUserId
    })
      .subscribe(() => {
        this.loadMessagesFromChat();
      });
  }

  getUsers(): void {
    this.http.get(`${environment.API}/chat/users`).subscribe((users: Array<User>) => {
      this.users = users;
      this.activeChatUserId = users[0].id;
      this.loadMessagesFromChat();

      setInterval(() => {
        this.loadMessagesFromChat();
      }, 2000);
    });
  }

  setActiveChat(id): void {
    this.activeChatUserId = id;
    this.loadMessagesFromChat();
  }

  loadMessagesFromChat(): void {
    this.http.get(`${environment.API}/chat/get/${this.activeChatUserId}`).subscribe(messages => {
      this.messages = messages;
    });
  }

  isUserActive(userId: number): string {
    if (userId === this.activeChatUserId) {
      return 'active';
    }

    return '';
  }

  getMessageClass(message): string {
    if (message.recipient_user_id === this.activeChatUserId) {
      return 'other-message float-right';
    }

    return 'my-message float-left';

  }

}

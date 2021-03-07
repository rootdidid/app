import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { ChannelService } from 'src/app/services/channel.service';

@Component({
  selector: 'dashboard-sidebar',
  templateUrl: './me-sidebar.component.html',
  styleUrls: ['./me-sidebar.component.css']
})
export class MeSidebarComponent implements OnInit {  
  get user() { return this.userService.user; }

  constructor(
    public channelService: ChannelService,
    public userService: UsersService) {}
    
  async ngOnInit() {
    await this.channelService.init();
  }

  getRecipient(channel: any) { 
    const userId = channel.recipientIds.filter(id => id !== this.user._id)[0];
    return this.userService.getKnown(userId);
  }
}
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GuildService } from 'src/app/services/guild.service';
import { UserService } from 'src/app/services/user.service';
import { WSService } from 'src/app/services/ws.service';

@Component({
  selector: 'create-guild-modal',
  templateUrl: './create-guild-modal.component.html',
  styleUrls: ['./create-guild-modal.component.css']
})
export class CreateGuildModalComponent {
  @ViewChild('inviteInput') inviteInput: ElementRef;

  processing = false;

  form = new FormGroup({
    name: new FormControl(`${this.userService.self.username}'s Guild`, [
      Validators.required,
      Validators.maxLength(32)
    ]),
  });

  constructor(
    private guildService: GuildService,
    private router: Router,
    private userService: UserService,
    private ws: WSService
  ) {}

  async submit() {
    if (this.form.invalid) return;

    this.processing = true;

    this.ws.emit('GUILD_CREATE', {
      partialGuild: {
        name: this.form.value.name,
      },
    })
  }

  joinGuild() {
    this.processing = true;
    this.ws.emit('GUILD_MEMBER_ADD', {
      inviteCode: this.inviteInput.nativeElement.value,
    });
  }
}
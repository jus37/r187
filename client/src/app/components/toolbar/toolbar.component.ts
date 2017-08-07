import { Component, OnInit } from '@angular/core';
import {AppState} from '../../app.service'

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  time;
  tools = [];
  mode;
  seconds;
  curMode;
  state;
  channels;


  constructor(private appState: AppState) {

  }

  ngOnInit() {
    this.state = this.appState.state;
    this.channels = this.state.channels;
    this.tools = [
      {
        type : 'gps',
        icon : 'fa-rocket'
      },
      {
        type : 'gps',
        icon : 'fa-rocket'
      }
    ];

    this.curMode = this.appState.storage.get('curMode');
    if(this.getChName(this.curMode.channelId) == 'CHM_25') {
      this.mode = 'Дежурный прием';
    } else if (this.getChName(this.curMode.channelId) == 'TETRA_DMO') {
      this.mode = 'Местный';
    }


    let d = new Date();
    this.time = d.getHours() + ':' + d.getMinutes();
    this.seconds = ':' + d.getSeconds();
    setInterval(() => {
      let d = new Date();
      this.time = d.getHours() + ':' + d.getMinutes();
      this.seconds = ':' + d.getSeconds();
    }, 1000);
  }

  getChName(id) {
    const idx = this.channels.findIndex(x => x.id == id);
    return this.channels[idx].mode;
  }
}

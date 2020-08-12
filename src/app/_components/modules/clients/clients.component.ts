import {Component, OnInit} from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    $('#table').bootstrapTable({
      search: true,
      responseHandler: this.responseHandle,
      url: 'http://127.0.0.1:8000/',
      columns: [{
        field: 'id',
        title: 'Item ID'
      }, {
        field: 'name',
        title: 'Item Name'
      }, {
        field: 'price',
        title: 'Item Price'
      }]
    });
  }

  responseHandle(data) {
    console.log(data);
  }

}

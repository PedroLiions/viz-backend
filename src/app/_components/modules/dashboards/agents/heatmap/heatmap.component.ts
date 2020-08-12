import {Component, Input, OnInit} from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.scss']
})
export class HeatmapComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    $('#table').bootstrapTable({
      exportTypes: ['json', 'xml', 'csv', 'txt', 'sql', 'excel', 'pdf'],
      showExport: true,
      pagination: true,
      search: true,
      columns: [{
        field: 'id',
        title: 'ID'
      }, {
        field: 'name',
        title: 'Nome'
      }, {
        field: 'price',
        title: 'Preço'
      }]
    });
  }

}

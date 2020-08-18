import {Component, Input, OnInit} from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.scss']
})
export class HeatmapComponent implements OnInit {

  data: any = [];

  constructor() {
  }

  ngOnInit(): void {
    this.data = {
      count: 6,
      items: [
        {
          id: 0,
          name: 'Item 0',
          price: '$0'
        },
        {
          id: 1,
          name: 'Item 1',
          price: '$1'
        },
        {
          id: 2,
          name: 'Item 2',
          price: '$2'
        },
        {
          id: 3,
          name: 'Item 3',
          price: '$3'
        },
        {
          id: 4,
          name: 'Item 4',
          price: '$4'
        },
        {
          id: 5,
          name: 'Item 5',
          price: '$5'
        }
      ]
    };

    const bootstrapTableConfig = {
      exportTypesx: ['json', 'xml', 'csv', 'txt', 'sql', 'excel', 'pdf'],
      pagination: false,
      showColumns: false,
      pageList: [10, 25, 100, 200],
      showExport: true,
      showToggle: false,
      sortStable: true,

      showFullscreen: true,
      showPrint: true,

      dataField: 'items',
      totalField: 'count',
      sorting: true,

      search: false,
      dataToggle: false,
      cache: false,
      // formatNoMatches: null,
      // data: this.data,

      sortable: true,
    };

    const $table = $('#table');

    $table.bootstrapTable(bootstrapTableConfig);
    $table.bootstrapTable('hideLoading');
  }

}

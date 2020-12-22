import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {CallbackTrTdService} from '../../../../_components/table/services/callback-tr-td.service';

@Component({
    selector: 'app-table-region',
    templateUrl: './table-region.component.html',
    styleUrls: ['./table-region.component.scss']
})
export class TableRegionComponent implements OnInit {

    dataUrlRegionGeograpic = `${environment.API}/dashboards/region/region-geographic`;
    dataUrlRegiontelecom = `${environment.API}/dashboards/region/region-telecom`;

    columnClasseConfig = {};

    callbackTable: Function;

    constructor(
        private callbackTrTdService: CallbackTrTdService
    ) {
    }

    ngOnInit(): void {
        this.callbackTable = this.callBackTD.bind(this);

        this.columnClasseConfig = {
            Tentativas: 'bg-viz-red',
            Atendidas: 'bg-viz-caramel',
            '%Hit rate': 'bg-viz-caramel-dark',
            '%CPC': 'bg-viz-ocean-900',
            '%Negociações': 'bg-viz-blue',
            '%Negc': 'bg-viz-marine',
            '%Improd': 'bg-viz-orange',
            '%Mute': 'bg-viz-orange-900',
            '%Machine': 'bg-viz-orange-900',
            'TMA': 'bg-viz-blue-100'
        };
    }

    callBackTD(valueOfColumn, row, line, element, tableType): Array<string> {
        return this.callbackTrTdService.setBoldTotalAndFirstLine(valueOfColumn, row, line, element, tableType);
    }

}

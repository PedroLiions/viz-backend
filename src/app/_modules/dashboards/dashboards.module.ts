import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../_shared/shared.module';

import {AgentsComponent} from '../../_components/modules/dashboards/agents/agents.component';
import {DashboardsRoutingModule} from './dashboards-routing.module';
import {IndexComponent} from '../../_components/modules/dashboards/index/index.component';
import {HeatmapComponent} from '../../_components/modules/dashboards/agents/heatmap/heatmap.component';
import {BestTimeComponent} from '../../_components/modules/dashboards/best-time/best-time.component';
import {ComparativeComponent} from '../../_components/modules/dashboards/comparative/comparative.component';
import {DailyComponent} from '../../_components/modules/dashboards/daily/daily.component';
import {FunnelComponent} from '../../_components/modules/dashboards/funnel/funnel.component';
import {MultiChannelComponent} from '../../_components/modules/dashboards/multi-channel/multi-channel.component';
import {PortfolioComponent} from '../../_components/modules/dashboards/portfolio/portfolio.component';
import {RegionComponent} from '../../_components/modules/dashboards/region/region.component';
import {Widget1Component} from '../../_components/modules/dashboards/agents/widget1/widget1.component';
import { DistributionByOcurrenceComponent } from '../../_components/modules/dashboards/agents/distribution-by-ocurrence/distribution-by-ocurrence.component';
import { DistributionByHourComponent } from '../../_components/modules/dashboards/best-time/distribution-by-hour/distribution-by-hour.component';
import { ComparativeTableComponent } from '../../_components/modules/dashboards/comparative/comparative-table/comparative-table.component';
import { ComparativeByCompanyComponent } from '../../_components/modules/dashboards/comparative/comparative-table/comparative-by-company/comparative-by-company.component';
import { ResumeByCompanyComponent } from '../../_components/modules/dashboards/comparative/comparative-table/resume-by-company/resume-by-company.component';
import { SummaryComponent } from '../../_components/modules/dashboards/daily/summary/summary.component';
import { ConsolidateFinishByOperatorComponent } from '../../_components/modules/dashboards/daily/consolidate-finish-by-operator/consolidate-finish-by-operator.component';
import { PercentConsolidateFinishByOperatorComponent } from '../../_components/modules/dashboards/daily/percent-consolidate-finish-by-operator/percent-consolidate-finish-by-operator.component';
import { PercentConsolidateFinishByDailerComponent } from '../../_components/modules/dashboards/daily/percent-consolidate-finish-by-dailer/percent-consolidate-finish-by-dailer.component';
import { ConsolidateFinishByDailerComponent } from '../../_components/modules/dashboards/daily/consolidate-finish-by-dailer/consolidate-finish-by-dailer.component';
import { TableRegionComponent } from '../../_components/modules/dashboards/region/table-region/table-region.component';
import { TableCityStateComponent } from '../../_components/modules/dashboards/region/table-city-state/table-city-state.component';
import { TableHolidayComponent } from '../../_components/modules/dashboards/region/table-holiday/table-holiday.component';
import { WidgetImproductiveProductiveComponent } from '../../_components/modules/dashboards/agents/widget-improductive-productive/widget-improductive-productive.component';
import { LineMiniComponent } from '../../_components/modules/dashboards/portfolio/line-mini/line-mini.component';
import { GraphicsComponent } from '../../_components/modules/dashboards/region/graphics/graphics.component';
import { ResumeFinancialPortfolioComponent } from '../../_components/modules/dashboards/funnel/resume-financial-portfolio/resume-financial-portfolio.component';
import { PanelComparativeCompanyComponent } from '../../_components/modules/dashboards/funnel/panel-comparative-company/panel-comparative-company.component';

@NgModule({
  declarations: [
    AgentsComponent,
    IndexComponent,
    HeatmapComponent,
    BestTimeComponent,
    ComparativeComponent,
    DailyComponent,
    FunnelComponent,
    MultiChannelComponent,
    PortfolioComponent,
    RegionComponent,
    Widget1Component,
    DistributionByOcurrenceComponent,
    DistributionByHourComponent,
    ComparativeTableComponent,
    ComparativeByCompanyComponent,
    ResumeByCompanyComponent,
    SummaryComponent,
    ConsolidateFinishByOperatorComponent,
    PercentConsolidateFinishByOperatorComponent,
    PercentConsolidateFinishByDailerComponent,
    ConsolidateFinishByDailerComponent,
    TableRegionComponent,
    TableCityStateComponent,
    TableHolidayComponent,
    WidgetImproductiveProductiveComponent,
    LineMiniComponent,
    GraphicsComponent,
    ResumeFinancialPortfolioComponent,
    PanelComparativeCompanyComponent,
  ],
  imports: [
    CommonModule,
    DashboardsRoutingModule,
    SharedModule,
  ]
})
export class DashboardsModule {
}

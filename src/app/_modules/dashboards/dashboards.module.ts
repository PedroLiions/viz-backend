import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AgentsComponent} from '../../_components/modules/dashboards/agents/agents.component';
import {DashboardsRoutingModule} from './dashboards-routing.module';
import {IndexComponent} from '../../_components/modules/dashboards/index/index.component';
import {HeatmapComponent} from '../../_components/modules/dashboards/agents/heatmap/heatmap.component';
import { BestTimeComponent } from '../../_components/modules/dashboards/best-time/best-time.component';
import { ComparativeComponent } from '../../_components/modules/dashboards/comparative/comparative.component';
import { DailyComponent } from '../../_components/modules/dashboards/daily/daily.component';
import { FunnelComponent } from '../../_components/modules/dashboards/funnel/funnel.component';
import { MultiChannelComponent } from '../../_components/modules/dashboards/multi-channel/multi-channel.component';
import { PortfolioComponent } from '../../_components/modules/dashboards/portfolio/portfolio.component';
import { RegionComponent } from '../../_components/modules/dashboards/region/region.component';

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
    RegionComponent
  ],
  imports: [
    CommonModule,
    DashboardsRoutingModule
  ]
})
export class DashboardsModule {
}
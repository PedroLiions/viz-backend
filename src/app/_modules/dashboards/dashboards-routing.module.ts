import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AgentsComponent} from '../../_components/modules/dashboards/agents/agents.component';
import {IndexComponent} from '../../_components/modules/dashboards/index/index.component';
import {BestTimeComponent} from '../../_components/modules/dashboards/best-time/best-time.component';
import {ComparativeComponent} from '../../_components/modules/dashboards/comparative/comparative.component';
import {DailyComponent} from '../../_components/modules/dashboards/daily/daily.component';
import {FunnelComponent} from '../../_components/modules/dashboards/funnel/funnel.component';
import {MultiChannelComponent} from '../../_components/modules/dashboards/multi-channel/multi-channel.component';
import {PortfolioComponent} from '../../_components/modules/dashboards/portfolio/portfolio.component';
import {RegionComponent} from '../../_components/modules/dashboards/region/region.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'agents',
    component: AgentsComponent
  },
  {
    path: 'best-time',
    component: BestTimeComponent
  },
  {
    path: 'comparative',
    component: ComparativeComponent
  },
  {
    path: 'daily',
    component: DailyComponent
  },
  {
    path: 'funnel',
    component: FunnelComponent
  },
  {
    path: 'multi-channel',
    component: MultiChannelComponent
  },
  {
    path: 'portfolio',
    component: PortfolioComponent
  },
  {
    path: 'region',
    component: RegionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DashboardsRoutingModule {}

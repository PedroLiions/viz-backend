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
    component: IndexComponent,
    data: {
      title: 'index'
    }
  },
  {
    path: 'agents',
    component: AgentsComponent,
    data: {
      title: 'Agents',
      breadcrumb: [
        'Dashboards', 'Agents'
      ]
    }
  },
  {
    path: 'best-time',
    component: BestTimeComponent,
    data: {
      title: 'Best time',
      breadcrumb: [
        'Dashboards', 'Agents'
      ]
    }
  },
  {
    path: 'comparative',
    component: ComparativeComponent,
    data: {
      title: 'Comparative',
      breadcrumb: [
        'Dashboards', 'Best time'
      ]
    }
  },
  {
    path: 'daily',
    component: DailyComponent,
    data: {
      title: 'Daily',
      breadcrumb: [
        'Dashboards', 'Daily'
      ]
    }
  },
  {
    path: 'funnel',
    component: FunnelComponent,
    data: {
      title: 'Funnel',
      breadcrumb: [
        'Dashboards', 'Funnel'
      ]
    }
  },
  {
    path: 'multi-channel',
    component: MultiChannelComponent,
    data: {
      title: 'Multi-channel',
      breadcrumb: [
        'Dashboards', 'Multi-channel'
      ]
    }
  },
  {
    path: 'portfolio',
    component: PortfolioComponent,
    data: {
      title: 'Portfolio',
      breadcrumb: [
        'Dashboards', 'Portfolio'
      ]
    }
  },
  {
    path: 'region',
    component: RegionComponent,
    data: {
      title: 'Region',
      breadcrumb: [
        'Dashboards', 'Region'
      ]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DashboardsRoutingModule {}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TableComponent } from '../../_components/_components/table/table.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { CaretComponent } from '../../_components/table/components/caret/caret.component';

@NgModule({
  declarations: [
    TableComponent,
    CaretComponent
  ],
    imports: [
        CommonModule,
        TranslateModule.forChild(),
        FontAwesomeModule,
    ],
  exports: [
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    TableComponent
  ]
})
export class SharedModule {
}





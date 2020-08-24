import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
  ],
  exports: [
    TranslateModule,
    TabsModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule {
}





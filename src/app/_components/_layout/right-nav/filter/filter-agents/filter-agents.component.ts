import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FiltersService} from '../../../../../_services/filters/filters.service';

@Component({
  selector: 'app-filter-agents',
  templateUrl: './filter-agents.component.html',
  styleUrls: ['./filter-agents.component.scss']
})
export class FilterAgentsComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private filters: FiltersService
  ) {
  }

  ngOnInit(): void {
    this.mountForm();
  }

  mountForm(): void {
    const filters = this.filters.get() || {};

    this.form = this.formBuilder.group({
      A1: [filters['A1'] || null],
      Crc: [filters['Crc'] || null],
      Paschoalotto: [filters['Paschoalotto'] || null],
      System: [filters['System'] || null],
      8: [filters['8'] || null],
      9: [filters['9'] || null],
      10: [filters['10'] || null],
      11: [filters['11'] || null]
    });
  }

  sendForm(): void {
    this.filters.set(this.form.value);
  }

}

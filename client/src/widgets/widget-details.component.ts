import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {FORM_DIRECTIVES, FORM_PROVIDERS, FormBuilder, Validators, ControlGroup} from '@angular/common';
import {Widget} from "./../common/models/widget.model.ts";

@Component({
    selector: 'widget-details',
    template: `
  <div class="fem-card mdl-card mdl-shadow--2dp">
    <div class="mdl-card__title">
      <h2 class="mdl-card__title-text" *ngIf="selectedWidget.id">Editing {{originalName}}</h2>
      <h2 class="mdl-card__title-text" *ngIf="!selectedWidget.id">Create New Widget</h2>
    </div>
    <div class="mdl-card__supporting-text">
      <form [ngFormModel]="widgetForm"
          (submit)="saved.emit(selectedWidget)" novalidate>
          <div class="mdl-textfield mdl-js-textfield">
            <label>Widget Name</label>
            <input ngControl="widgetName"
              [(ngModel)]="selectedWidget.name"
              placeholder="Enter a name"
              class="mdl-textfield__input" type="text">
          </div>

          <div class="mdl-textfield mdl-js-textfield">
            <label>Widget Price</label>
            <input ngControl="widgetPrice"
              [(ngModel)]="selectedWidget.price"
              placeholder="Enter a price"
              class="mdl-textfield__input" type="text">
          </div>
          <button type="submit" [disabled]="!widgetForm.valid" class="mdl-button mdl-js-button mdl-button--colored mdl-js-ripple-effect">Save</button>
      </form>
    </div>
  </div>
   `,
  styles: [`
    .error { color: red; }
  `],
  providers: [FORM_PROVIDERS],
  directives: [FORM_DIRECTIVES]
})
export class WidgetDetails implements OnInit {
  originalName: string;
  selectedWidget: Widget;
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();
  widgetForm: ControlGroup;

  @Input() set widget(value: Widget){
    if (value) this.originalName = value.name;
    this.selectedWidget = Object.assign({}, value);
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.widgetForm = this.fb.group({
      widgetName: [this.selectedWidget.name, Validators.required],
      widgetPrice: [this.selectedWidget.price, Validators.required]
    });
  }
}

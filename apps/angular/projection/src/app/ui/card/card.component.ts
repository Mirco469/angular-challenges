import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

/* https://angular-challenges.vercel.app/challenges/angular/1-projection/ */
@Component({
  selector: 'app-card',
  template: `
    <!-- This is selecting tag img -->
    <ng-content select="img"></ng-content>

    @if (list) {
      <section>
        @for (item of list; track $index) {
          <!-- $implicit tells that whatever let-<name> is defined in the parent template it resolves to item -->
          <ng-template
            [ngTemplateOutlet]="rowTemplate"
            [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
        }
      </section>
    }

    <button
      class="rounded-sm border border-blue-500 bg-blue-300 p-2"
      (click)="newItem.emit()">
      Add
    </button>
  `,
  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent, NgTemplateOutlet],
  host: {
    class: 'flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4',
  },
})
export class CardComponent<T> {
  @Input() list: T[] | null = null;
  @Input() customClass = '';
  @ContentChild('rowRef') rowTemplate!: TemplateRef<{ $implicit: T }>;

  @Output() newItem = new EventEmitter<void>();

  constructor() {}
}

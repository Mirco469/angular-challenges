import { Component, OnInit, signal } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card [list]="teachers()" (newItem)="newItem()" class="bg-light-red">
      <img src="assets/img/teacher.png" width="200px" />
      <ng-template #rowRef let-teacher>
        <app-list-item (deleteOne)="deleteOne(teacher.id)">
          {{ teacher.firstName }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, ListItemComponent],
})
export class TeacherCardComponent implements OnInit {
  // Example of signal use. Nb: teachers() transform the signal it's value, in this case an array
  teachers = signal<Teacher[]>([]);

  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));

    this.store.teachers$.subscribe((t) => this.teachers.update(() => t));
  }

  newItem() {
    this.store.addOne(randTeacher());
  }

  deleteOne(id: number) {
    this.store.deleteOne(id);
  }
}

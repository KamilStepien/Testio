import { Component } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddTaskComponent } from './dialog-add-task/dialog-add-task.component';
import { TaskService } from 'src/app/services/task.service';
import { TaskStatusEnum } from 'src/app/models/task/taskEnums';
import { TaskEditStatusModel } from 'src/app/models/task/task.model';


@Component({
  selector: 'app-task-module',
  templateUrl: './task-module.component.html',
  styleUrls: ['./task-module.component.scss']
})
export class TaskModuleComponent {

  constructor(public taskService: TaskService, public dialog: MatDialog) {

   }

   public TaskStatusEnum = TaskStatusEnum;

  drop(event: CdkDragDrop<string[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      let item = event.previousContainer.data[event.previousIndex];
      let taskEditStatus:TaskEditStatusModel = {
        id: item['id'],
        newstatus: Number(event.container.id)
      };
      this.taskService.editStatusTask(taskEditStatus);
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  openAddTaskDialog() {
    const dialogRef = this.dialog.open(DialogAddTaskComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.taskService.addTask(result);
    });
  }

}

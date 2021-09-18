import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TaskAddModel } from 'src/app/models/task/task.model';
import { TaskService } from 'src/app/services/task.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-task',
  templateUrl: './dialog-add-task.component.html',
  styleUrls: ['./dialog-add-task.component.scss']
})
export class DialogAddTaskComponent{

  constructor(private fb:FormBuilder, private taskService:TaskService,  public dialogRef: MatDialogRef<DialogAddTaskComponent>)
  {

  }

  addTaskFrom = this.fb.group(
    {
      nameTask:['',[Validators.required,Validators.maxLength(50)]],
      descriptionTask:['', [Validators.required,Validators.maxLength(200)]]
    }
  )

  addTask() {

    let model:TaskAddModel =
    {
      name : this.addTaskFrom.value.nameTask,
      description : this.addTaskFrom.value.descriptionTask
    }
    this.dialogRef.close(model);
  }
}

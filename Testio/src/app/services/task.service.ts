import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaksModel, TaskAddModel, TaskEditStatusModel } from '../models/task/task.model';
import { TaskStatusEnum } from '../models/task/taskEnums';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private _tasks: TaksModel[];
  private _doneTask: TaksModel[];
  private _inProgressTask: TaksModel[];
  private _createTask: TaksModel[];

  constructor(private http:HttpClient) {
    this.refreshTasks()
   }


  public GetTasks = ():TaksModel[]  => this._tasks;
  public GetDoneTasks = ():TaksModel[] => this._doneTask
  public GetCreateTasks = ():TaksModel[] => this._createTask;
  public GetInProgressTasks = ():TaksModel[] => this._inProgressTask;


  public editStatusTask(model:TaskEditStatusModel)
  {
    this.http.put<TaksModel>("https://localhost:5001/api/task/editStatus", model).subscribe(
      response =>
      {
        this._tasks.find(x => x.id == response.id).status = response.status;
      }
    );
  }

  public refreshTasks()
  {
    this._tasks = [];
    this._doneTask = [];
    this._inProgressTask = [];
    this._createTask = [];
    this.getTasks();
  }

  public getTasks(taskStatus: TaskStatusEnum = null)
  {
    let params;

    if(taskStatus != null)
    {
       params = new HttpParams().set('taskStatus', taskStatus.toString())
    }

    this.http.get<TaksModel[]>("https://localhost:5001/api/task/get",{ params: params }).subscribe(
      response =>
      {
        this._tasks = response;
        response.forEach(x =>
          {
            switch(x.status)
            {
              case TaskStatusEnum.Create: this._createTask.push(x);
              break;
              case TaskStatusEnum.InProgress: this._inProgressTask.push(x);
              break;
              case TaskStatusEnum.Done: this._doneTask.push(x);
              break;
            }
          })
        },
      err =>
      {
        console.log(err);
        //TODO when notification module will implemented
      }
    )
  }

  public addTask(model:TaskAddModel)
  {
    this.http.post<TaksModel>("https://localhost:5001/api/task/add", model).subscribe(
      response =>
      {
        this.refreshTasks();
      },
      err =>
      {
        console.log(err);
        //TODO when notification module will implemented
      }
    )
  }

  public deleteTask(taskId:number)
  {
    this.http.delete<TaksModel>("https://localhost:5001/api/task/"+taskId).subscribe
    (response =>
      {
        this.refreshTasks();
      },
      err =>
      {
        console.log(err);
        //TODO when notification module will implemented
      })
  }

}

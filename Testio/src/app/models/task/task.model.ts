import { TaskStatusEnum } from "./taskEnums"

export class TaksModel
{
    id:number;
    userid:number;
    name:string;
    description:string;
    status:TaskStatusEnum;
}

export class TaskEditStatusModel
{
  id:number;
  newstatus:TaskStatusEnum;
}

export class TaskAddModel
{
  name:string;
  description:string;
}



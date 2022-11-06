export class CreateTaskDto {
  title: string;
  detail: string;
  completed: boolean;
  completedAt: Date;
  tag: string;
  hasCompletedDate: boolean;
}

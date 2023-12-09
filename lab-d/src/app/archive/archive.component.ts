import { Component, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';
import { Task } from '../task';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css'],
})
export class ArchiveComponent implements OnInit {
  public tasks: Task[] = [];
  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.tasksService.index(true).subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  deleteTask(task: Task): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.tasksService.delete(task).subscribe(() => {
        this.ngOnInit();
      });
    }
  }
}

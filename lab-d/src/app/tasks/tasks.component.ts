import { Component, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';
import { Task } from '../task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  public tasks: Task[] = [];
  public newTask: Task = {};

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.tasksService.index().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  addTask(): void {
    if (!this.validateTask(this.newTask)) {
      return;
    }

    this.newTask.completed = false;
    this.newTask.archived = false;

    this.tasksService.post(this.newTask).subscribe((task) => {
      this.tasks.unshift(task);
      this.newTask = {};
      this.ngOnInit();
    });
  }
  
  private validateTask(task: Task): boolean {
    if (task.title === undefined || task.title === null)
    {
      alert('Invalid title');
      return false;
    }
    if (task.deadline === undefined || task.deadline === null)
    {
      alert('Invalid deadline');
      return false;
    }
    return true;
  }
}


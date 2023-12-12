import { Component, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';
import { Task } from '../task';
import { Observable, forkJoin } from 'rxjs';

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
    this.newTask.completed = false;
    this.newTask.archived = false;

    this.tasksService.post(this.newTask).subscribe((task) => {
      this.tasks.unshift(task);
      this.newTask = {};
      this.ngOnInit();
    });
  }
  
  canAddTask(): boolean {
    let taskvalid = (this.newTask.title !== undefined && this.newTask.title !== '');
    let deadlinevalid = (this.newTask.deadline !== undefined);
    return taskvalid && deadlinevalid;
  }

  canArchiveCompleted(): boolean {
    return this.tasks.some((task) => task.completed);
  }

  handleChange(task: Task): void {
    this.tasksService.put(task).subscribe((task) => {
      error: (err: any) => {
        alert(err);
        this.ngOnInit();
      }
    });
  }

  archiveCompleted(): void {
    const observables: Observable<any>[] = [];
    this.tasks.forEach((task) => {
      if (task.completed) {
        task.archived = true;
        observables.push(this.tasksService.put(task));
      }
    });

    forkJoin(observables).subscribe((results) => {
      this.ngOnInit();
    });
  }
}


import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from '../person';
import { PersonLsService } from '../person-ls.service';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent {
  person: Person={
    address:{},
  }

  constructor(private personLsService: PersonLsService, private router: Router) { }

  save(): void {
    this.personLsService.addPerson(this.person);
    this.router.navigate(['/list']);
  }
}

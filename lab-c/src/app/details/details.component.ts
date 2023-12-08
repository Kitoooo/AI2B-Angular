import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Person } from '../person';
import { PersonLsService } from '../person-ls.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  personId?: number;
  person?: Person;

  constructor(
    private route: ActivatedRoute,
    private personLsService: PersonLsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.personId = Number(params.get('id'));
      this.person = this.personLsService.getPerson(this.personId)
    });
  }
}

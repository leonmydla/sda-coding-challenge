import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MinimalPersonDto } from '../dto/person/minimal-person.dto';
import { NewPersonDto } from '../dto/person/new-person.dto';

@Injectable()
export class PersonApiService {

  private static readonly getAllPersonsUrl = '/api/person';
  private static readonly createPersonUrl  = '/api/person';

  constructor(
    private readonly http: HttpClient
  ) { }

  getAllPersons(): Observable<MinimalPersonDto[]> {
    return this.http.get<MinimalPersonDto[]>(PersonApiService.getAllPersonsUrl);
  }

  createPerson(newPerson: NewPersonDto): Observable<MinimalPersonDto> {
    return this.http.post<MinimalPersonDto>(
      PersonApiService.createPersonUrl,
      newPerson
    );
  }
}

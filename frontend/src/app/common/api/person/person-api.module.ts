import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PersonApiService } from './person-api.service';

@NgModule(
  {
    imports  : [
      HttpClientModule
    ],
    providers: [
      PersonApiService
    ]
  })
export class PersonApiModule {}

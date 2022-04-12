//import { HttpClient } from '@angular/common/http';
//import { HttpClientTestingModule } from '@angular/common/http/testing';
//import { TestBed } from '@angular/core/testing';
//import { NEVER } from 'rxjs';
//import { PersonService } from './person.service';
//
//describe('PersonService', () => {
//  let service: PersonService;
//  let http: HttpClient;
//
//  beforeEach(() => {
//    TestBed.configureTestingModule(
//      {
//        imports  : [
//          HttpClientTestingModule
//        ],
//        providers: [
//          PersonService
//        ]
//      });
//
//    service = TestBed.inject(PersonService);
//    http    = TestBed.inject(HttpClient);
//  });
//
//  it('should be created', () => {
//    expect(service).toBeTruthy();
//  });
//
//  it('getAllMeters should return expected result', () => {
//    spyOn(http, 'get').and.returnValue(NEVER);
//
//    expect(http.get).not.toHaveBeenCalled();
//
//    const result = service.getAllMeters();
//
//    expect(http.get).toHaveBeenCalledOnceWith('/api/meter');
//    expect(result).toBe(NEVER);
//  });
//
//  it('getMeter should return expected result', () => {
//    const meterId = 1;
//
//    spyOn(http, 'get').and.returnValue(NEVER);
//
//    expect(http.get).not.toHaveBeenCalled();
//
//    const result = service.getMeter(meterId);
//
//    expect(http.get).toHaveBeenCalledOnceWith(`/api/meter/${meterId}`);
//    expect(result).toBe(NEVER);
//  });
//
//  it('getRecentreading should return expected result', () => {
//    const meterId = 1;
//
//    spyOn(http, 'get').and.returnValue(NEVER);
//
//    expect(http.get).not.toHaveBeenCalled();
//
//    const result = service.getRecentReading(meterId);
//
//    expect(http.get).toHaveBeenCalledOnceWith(`/api/meter/${meterId}/recent-reading`);
//    expect(result).toBe(NEVER);
//  });
//});

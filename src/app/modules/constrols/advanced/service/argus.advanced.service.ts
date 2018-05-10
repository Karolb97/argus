import { Injectable } from '@angular/core';
import { HttpService } from '../../../service/http.service/http.service';
import { Observable } from 'rxjs';

@Injectable()
export class ArgusAdvancedService {
    constructor(private httpService: HttpService) {}

    getSelectData(): Observable<any> {
        return this.httpService.getMock('api/data');
    }

    getSelectDataById(id: number): Observable<any> {
        return this.httpService.getMock(`api/data/${id}`);
    }
}
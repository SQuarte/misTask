import {Injectable} from '@angular/core';
import {HttpClient,HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {IDomNode} from '../models/IDomNode';
import 'rxjs/add/operator/map';

@Injectable()
export class JsonLoaderService {

  constructor(private http: HttpClient) {
  }

  public loadJson(path: string):Observable<IDomNode> {
    return this.http.get<IDomNode>(path)
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from '../models/result.model';



@Injectable({
  providedIn: 'root'
})
export class SearchService {
  titleUrl = 'http://hn.algolia.com/api/v1/search?';
  authorUrl = 'http://hn.algolia.com/api/v1/users/';
  wikiSearchUrl = 'https://en.wikipedia.org/w/api.php?';

  constructor(private httpClient: HttpClient) { }

  getDataForWikiSearch(queryValue: string): Observable<Result> {
    const params = new HttpParams()
      .set('action', 'opensearch')
      .set('format', 'json')
      .set('search', queryValue)
      .set('origin', '*');
    return this.httpClient.get<Result>(this.wikiSearchUrl, { params: params });

  }

  getDataForHackerNewsPublicSearch(queryValue: string): Observable<any> {
    const params = new HttpParams()
      .set('query', queryValue);
    return this.httpClient.get<any>(this.titleUrl, { responseType: 'json', params: params });
  }

  getSubmissionCount(name: string): Observable<any> {
    const params = new HttpParams()
      .set('username', name);
    return this.httpClient.get(this.authorUrl, { params });
  }

}

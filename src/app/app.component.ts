import { Component } from '@angular/core';
import { SearchService } from './services/search.service';
import {map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'haloDocAssignment';
  queryValue: string;
  source: string = 'Hacker news public search';
  results: string [];
  authorArray = [];
  list = [];


  constructor(private searchService: SearchService) {}

  clickHacker() {
    this.source = 'Hacker news public search';
  }

  clickWiki() {
    this.source = 'Wiki search';
  }

  search() {
    let title, author;
    let count;
    if (this.source === 'Wiki search') {
       this.searchService.getDataForWikiSearch(this.queryValue).pipe(
        map(data => {
          this.results = data[1]
        })).subscribe(() => {});
    } else {
      this.searchService.getDataForHackerNewsPublicSearch(this.queryValue).pipe(
        map(data => {
          this.list = data['hits'];
        })
        ).subscribe(() => {});
      this.list.forEach(hit => {
        title = hit.title;
        author = hit.author;
        this.searchService.getSubmissionCount(author).subscribe(
          data => {
            count = data.submission_count;
            this.authorArray.push(author + count);
          }
        );
      });
    }
  }
}

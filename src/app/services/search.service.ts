import { Service, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Service()
export class SearchService {
    searchTerm = new BehaviorSubject<string>('');

    setSearchTerm(term: string): void {
        this.searchTerm.next(term);
    }
}

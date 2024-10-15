import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../enviroment';
import { Suggestion, SuggestionsResponse } from '../interfaces/address.suggest.interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  #apiUrl = 'https://cleaner.dadata.ru/api/v1/clean/address'
  #suggestApiUrl = 'http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';

  token = environment.addressApiToken
  secretKey = environment.addressApiSecret
  http = inject(HttpClient)


  getSuggestions(query: string) {
    console.log('sdjsd')
    return this.http.post<SuggestionsResponse>(this.#suggestApiUrl, {query}, {
      headers: {
        Authorization: `Token ${this.token}`
      }
    }).pipe(
      map(res => {
        return res.suggestions
        // return Array.from(
        //   new Set(
        //     res.suggestions.map(
        //       (suggestion: Suggestion) => {
        //         return suggestion.data.city
        //       }
        //     ).filter(val => val && val.length)
        //   )
        // )
      })
    )
  }

  getAddresses(query: string) {
    return this.http.post(this.#apiUrl, query, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        'X-Secret': this.secretKey
      }
    })
  }
}

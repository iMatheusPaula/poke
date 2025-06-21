import {Injectable} from '@angular/core';
import {Pokemon, PaginatedResponse} from "./types";

@Injectable({
    providedIn: 'root'
})
export class PokeapiService {
    private readonly apiUrl: string = 'https://pokeapi.co/api/v2/pokemon';

    constructor() {
    }

    async getAll(limit: number = 20, offset: number = 0): Promise<PaginatedResponse> {
        return await fetch(`${this.apiUrl}?limit=${limit}&offset=${offset}`)
            .then(res => res.json())
            .then((data: PaginatedResponse) => {
                data.results = data.results.map((pokemon: Pokemon) => {
                    const id: number = +pokemon.url.split('/')[6];

                    return {
                        ...pokemon,
                        id
                    };
                });

                return data;
            });
    }
}

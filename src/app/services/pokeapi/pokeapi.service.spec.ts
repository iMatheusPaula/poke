import {TestBed} from '@angular/core/testing';

import {PokeapiService} from './pokeapi.service';
import {PaginatedResponse, Pokemon, PokemonDetail} from "./types";

describe('PokeapiService', () => {
    let service: PokeapiService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PokeapiService);
    });

    it('should return paginated pokemons in getAll()', async () => {
        const mockResults: Pokemon[] = [
            {name: 'bulbasaur', id: 1, url: 'https://pokeapi.co/api/v2/pokemon/1/'},
            {name: 'ivysaur', id: 2, url: 'https://pokeapi.co/api/v2/pokemon/2/'},
        ];

        const mockApiResponse: PaginatedResponse = {
            count: 2,
            next: null,
            previous: null,
            results: mockResults,
        };

        const fetchSpy = spyOn(window, 'fetch').and.resolveTo({
            json: async () => mockApiResponse,
        } as Response);

        const response = await service.getAll(2, 0);

        // Verifica se o fetch foi chamado com os parâmetros corretos
        expect(fetchSpy).toHaveBeenCalled();
        expect(fetchSpy.calls.mostRecent().args[0]).toContain('?limit=2&offset=0');

        // Verifica a estrutura da paginação
        expect(response.count).toBe(mockApiResponse.count);
        expect(response.next).toBe(mockApiResponse.next);
        expect(response.previous).toBe(mockApiResponse.previous);
        expect(response.results.length).toBe(mockApiResponse.count);

        // Verifica se os pokemons retornados
        expect(response.results).toEqual(mockResults);
    });

    it('should return a pokemon details in getById()', async () => {
        const mockPokemonDetail: PokemonDetail = {
            id: 1,
            name: 'bulbasaur',
            height: 7,
            weight: 69,
            types: [
                {
                    slot: 1,
                    type: {
                        name: 'grass',
                        url: 'https://pokeapi.co/api/v2/type/12/',
                    }
                },
                {
                    slot: 2,
                    type: {
                        name: 'poison',
                        url: 'https://pokeapi.co/api/v2/type/4/',
                    }
                }
            ],
            abilities: [
                {
                    ability: {
                        name: 'overgrow',
                        url: 'https://pokeapi.co/api/v2/ability/65/',
                    },
                    is_hidden: false,
                    slot: 1,
                },
                {
                    ability: {
                        name: 'chlorophyll',
                        url: 'https://pokeapi.co/api/v2/ability/34/',
                    },
                    is_hidden: true,
                    slot: 3,
                }
            ],
            stats: [
                {
                    base_stat: 45,
                    effort: 0,
                    stat: {
                        name: 'hp',
                        url: 'https://pokeapi.co/api/v2/stat/1/',
                    }
                },
                {
                    base_stat: 49,
                    effort: 0,
                    stat: {
                        name: 'attack',
                        url: 'https://pokeapi.co/api/v2/stat/2/',
                    }
                },
            ],
            sprites: {
                other: {
                    'official-artwork': {
                        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
                        front_shiny: null
                    },
                    'dream_world': {
                        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream_world/1.png'
                    },
                    'home': {
                        front_default: null,
                        front_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png'
                    }
                }
            },
        };

        const fetchSpy = spyOn(window, 'fetch').and.resolveTo({
            json: async () => mockPokemonDetail,
        } as Response);

        const response = await service.getById(1);

        // Verifica se o fetch foi chamado com o ID correto
        expect(fetchSpy).toHaveBeenCalled();
        expect(fetchSpy.calls.mostRecent().args[0]).toContain('/pokemon/1');

        // Verifica a response
        expect(response).toEqual(mockPokemonDetail);
        expect(response.id).toBe(1);
    });
});

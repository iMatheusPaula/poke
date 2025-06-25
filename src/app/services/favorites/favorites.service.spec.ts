import {TestBed} from '@angular/core/testing';
import {FavoritesService} from './favorites.service';
import {Pokemon} from '../pokeapi/types';

describe('FavoritesService', () => {
    let service: FavoritesService;
    const mockPokemon: Pokemon = {
        id: 1,
        name: 'bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon/1/',
    };
    const mockPokemon2: Pokemon = {
        id: 2,
        name: 'ivysaur',
        url: 'https://pokeapi.co/api/v2/pokemon/2/',
    };

    beforeEach(() => {
        TestBed.configureTestingModule({});

        localStorage.clear();
        service = TestBed.inject(FavoritesService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should add a pokemon to favorites', async () => {
        // Verifica se o Pokémon não está nos favoritos antes de adicioná-lo
        expect(service.isFavorite(mockPokemon.id)).toBeFalse();

        await service.toggleFavorite(mockPokemon);

        // Verifica se o Pokémon foi adicionado aos favoritos
        expect(service.isFavorite(mockPokemon.id)).toBeTrue();

        // Verifica um Pokémon não existe
        expect(service.isFavorite(mockPokemon2.id)).toBeFalse();
    });

    it('should remove a pokemon from favorites if already added', async () => {
        // Adiciona o Pokémon aos favoritos e verifica se foi adicionado
        await service.toggleFavorite(mockPokemon);
        expect(service.isFavorite(mockPokemon.id)).toBeTrue();

        // Remove o Pokémon dos favoritos e verifica se foi removido
        await service.toggleFavorite(mockPokemon);
        expect(service.isFavorite(mockPokemon.id)).toBeFalse();
    });

    it('should persiste favorite in localStorage', async () => {
        await service.toggleFavorite(mockPokemon);

        // Verifica se o localStorage não está vazio
        const localStorageData = localStorage.getItem('favorite_pokemons');
        expect(localStorageData).not.toBeNull();

        // Converte o localStorageData para um objeto e verifica se contém o Pokémon adicionado
        const parsed = JSON.parse(localStorageData!);
        expect(parsed).toEqual([mockPokemon]);
    });

    it('should load favorites from localStorage on creation', async () => {
        await service.toggleFavorite(mockPokemon);

        // Reinicializa o serviço para simular a criação
        TestBed.resetTestingModule();
        TestBed.configureTestingModule({});
        const newService = TestBed.inject(FavoritesService);

        const isFavorite = newService.isFavorite(mockPokemon.id);
        expect(isFavorite).toBeTrue();
    });

    it('should not crash if localStorage contains invalid JSON', () => {
        // Salva no localStorage um dado inválido
        localStorage.setItem('favorite_pokemons', 'invalid json');

        // Reinicializa o serviço para simular a criação
        TestBed.resetTestingModule();
        TestBed.configureTestingModule({});

        // Verifica se o serviço pode ser criado sem erros
        const createService = () => TestBed.inject(FavoritesService);
        expect(createService).not.toThrow();

        const newService = createService();

        // Verifica se o serviço inicializa com favoritos vazios
        expect(newService.favorites).toEqual([]);
        expect(newService.favorites.length).toBe(0);
    });
});

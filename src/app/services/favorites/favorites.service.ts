import {Injectable} from '@angular/core';
import {Pokemon} from '../pokeapi/types';

@Injectable({
    providedIn: 'root'
})
export class FavoritesService {
    private readonly STORAGE_KEY: string = 'favorite_pokemons';
    public favorites: Pokemon[] = [];

    constructor() {
        this.load();
    }

    private load(): void {
        try {
            const favorites = localStorage.getItem(this.STORAGE_KEY);

            if (favorites) {
                this.favorites = JSON.parse(favorites);
            }
        } catch (error) {
            console.error(error);
        }
    }

    isFavorite(id: number): boolean {
        try {
            this.load();
            return this.favorites.some((pokemon: Pokemon) => pokemon.id === id);
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    toggleFavorite(pokemon: Pokemon): void {
        try {
            this.load();
            const index = this.favorites.findIndex((favoritePokemon: Pokemon) => favoritePokemon.id === pokemon.id);

            if (index > -1) {
                this.favorites.splice(index, 1);
            } else {
                this.favorites.push(pokemon);
            }

            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.favorites));
        } catch (error) {
            console.error(error);
        }
    }
}

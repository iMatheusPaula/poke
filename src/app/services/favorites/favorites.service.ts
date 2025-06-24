import {Injectable} from '@angular/core';
import {Pokemon} from '../pokeapi/types';
import {ToastService} from "../toast/toast.service";

@Injectable({
    providedIn: 'root'
})
export class FavoritesService {
    private readonly STORAGE_KEY: string = 'favorite_pokemons';
    public favorites: Pokemon[] = [];

    constructor(private readonly toastService: ToastService) {
        this.load();
    }

    private async load(): Promise<void> {
        try {
            const favorites = localStorage.getItem(this.STORAGE_KEY);

            if (favorites) {
                this.favorites = JSON.parse(favorites);
            }
        } catch (error) {
            await this.toastService.show('Erro ao carregar favoritos', 'danger');
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

    async toggleFavorite(pokemon: Pokemon): Promise<void> {
        try {
            await this.load();
            const index = this.favorites.findIndex((favoritePokemon: Pokemon) => favoritePokemon.id === pokemon.id);

            if (index > -1) {
                this.favorites.splice(index, 1);
            } else {
                this.favorites.push(pokemon);
            }

            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.favorites));

            const message = this.isFavorite(pokemon.id)
                ? `${pokemon.name} adicionado aos favoritos!`
                : `${pokemon.name} removido dos favoritos!`;

            await this.toastService.show(message, 'success');
        } catch (error) {
            await this.toastService.show('Erro ao atualizar favoritos', 'danger');
            console.error(error);
        }
    }
}

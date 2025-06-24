import {Component, OnInit, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
    IonBackButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonChip,
    IonContent,
    IonHeader,
    IonImg,
    IonItem,
    IonLabel,
    IonList,
    IonProgressBar, IonSpinner,
    IonTitle,
    IonToolbar,
    IonButton,
    IonIcon
} from '@ionic/angular/standalone';
import {PokeapiService} from "../../services/pokeapi/pokeapi.service";
import {FavoritesService} from "../../services/favorites/favorites.service";
import {Pokemon, PokemonDetail} from "../../services/pokeapi/types";
import {ActivatedRoute} from "@angular/router";
import {addIcons} from "ionicons"
import {heart, heartOutline} from "ionicons/icons";
import {register} from 'swiper/element/bundle';
import {ToastService} from "../../services/toast/toast.service";

@Component({
    selector: 'app-details',
    templateUrl: './details.page.html',
    styleUrls: ['./details.page.scss'],
    standalone: true,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [
        IonContent,
        IonHeader,
        IonTitle,
        IonToolbar,
        IonButtons,
        IonBackButton,
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardContent,
        IonItem,
        IonLabel,
        IonList,
        IonChip,
        IonImg,
        IonProgressBar,
        CommonModule,
        FormsModule,
        IonSpinner,
        IonButton,
        IonIcon
    ]
})
export class DetailsPage implements OnInit {
    public pokemon: PokemonDetail | null = null;
    public isLoading: boolean = false;

    constructor(
        private readonly pokeapi: PokeapiService,
        private readonly route: ActivatedRoute,
        protected readonly favoritesService: FavoritesService,
        private readonly toastService: ToastService
    ) {
        addIcons({heart, heartOutline});
        register();
    }

    ngOnInit() {
        this.loadPokemon();
    }

    async loadPokemon(): Promise<void> {
        try {
            this.isLoading = true;

            const id: string | null = this.route.snapshot.paramMap.get('id');

            if (!id) {
                await this.toastService.show('ID do Pokémon não encontrado.', 'danger');
                return;
            }

            this.pokemon = await this.pokeapi.getById(parseInt(id));
        } catch (error) {
            await this.toastService.show(`Erro ao carregar Pokémon`, 'danger');
            console.error(error);
        } finally {
            this.isLoading = false;
        }
    }

    getTypeColor(type: string): string {
        const typeColors: Record<string, string> = {
            normal: '#A8A77A',
            fire: '#EE8130',
            water: '#6390F0',
            electric: '#F7D02C',
            grass: '#7AC74C',
            ice: '#96D9D6',
            fighting: '#C22E28',
            poison: '#A33EA1',
            ground: '#E2BF65',
            flying: '#A98FF3',
            psychic: '#F95587',
            bug: '#A6B91A',
            rock: '#B6A136',
            ghost: '#735797',
            dragon: '#6F35FC',
            dark: '#705746',
            steel: '#B7B7CE',
            fairy: '#D685AD',
        };

        return typeColors[type] || '#777777';
    }

    getStatColor(statValue: number): string {
        switch (true) {
            case statValue < 50:
                return 'danger';
            case statValue < 80:
                return 'warning';
            case statValue < 100:
                return 'success';
            default:
                return 'primary';
        }
    }

    getStatPercentage(statValue: number): number {
        return Math.min(statValue / 255, 1);
    }

    async toggleFavorite(): Promise<void> {
        if (!this.pokemon) {
            await this.toastService.show('Pokémon não encontrado.', 'danger');
            return;
        }

        const pokemonForFavorite: Pokemon = {
            id: this.pokemon.id,
            name: this.pokemon.name,
            url: ''
        };

        this.favoritesService.toggleFavorite(pokemonForFavorite);

        const message = this.favoritesService.isFavorite(this.pokemon.id)
            ? `${this.pokemon.name} adicionado aos favoritos!`
            : `${this.pokemon.name} removido dos favoritos!`;

        await this.toastService.show(message, 'success');
    }
}

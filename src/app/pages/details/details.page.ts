import {Component, OnInit} from '@angular/core';
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
    IonToolbar, ToastController
} from '@ionic/angular/standalone';
import {PokeapiService} from "../../services/pokeapi.service";
import {PokemonDetail} from "../../services/types";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-details',
    templateUrl: './details.page.html',
    styleUrls: ['./details.page.scss'],
    standalone: true,
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
        IonSpinner
    ]
})
export class DetailsPage implements OnInit {
    public pokemon: PokemonDetail | null = null;
    public isLoading: boolean = false;

    constructor(
        private readonly pokeapi: PokeapiService,
        private readonly route: ActivatedRoute,
        private readonly toastController: ToastController
    ) {
    }

    ngOnInit() {
        this.loadPokemon();
    }

    async loadPokemon(): Promise<void> {
        try {
            this.isLoading = true;

            const id: string | null = this.route.snapshot.paramMap.get('id');

            if (!id) {
                await this.showToast('ID do Pokémon não encontrado.');
                return;
            }

            this.pokemon = await this.pokeapi.getById(parseInt(id));
        } catch (error) {
            console.error(error);
        } finally {
            this.isLoading = false;
        }
    }

    async showToast(message: string): Promise<void> {
        const toast = await this.toastController.create({
            message: message,
            color: 'danger',
        });

        await toast.present();
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
}

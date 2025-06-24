import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
    IonAvatar,
    IonContent,
    IonHeader, IonInfiniteScroll, IonInfiniteScrollContent,
    IonItem, IonLabel,
    IonList,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton
} from '@ionic/angular/standalone';
import {PokeapiService} from "../../services/pokeapi/pokeapi.service";
import {InfiniteScrollCustomEvent} from "@ionic/angular";
import {RouterLink} from "@angular/router";
import {Pokemon} from "../../services/pokeapi/types";
import {ToastService} from "../../services/toast/toast.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
    standalone: true,
    imports: [
        IonContent,
        IonHeader,
        IonTitle,
        IonToolbar,
        IonList,
        IonItem,
        IonAvatar,
        IonLabel,
        IonInfiniteScroll,
        IonInfiniteScrollContent,
        IonButtons,
        IonButton,
        CommonModule,
        FormsModule,
        RouterLink
    ]
})
export class HomePage implements OnInit {
    public items: Pokemon[] = [];
    public isLoading: boolean = false;
    private offset: number = 0;
    private limit: number = 20;
    private count: number = 0;

    constructor(
        private readonly pokeapi: PokeapiService,
        private readonly toastService: ToastService
    ) {
    }

    ngOnInit(): void {
        this.loadPokemons();
    }

    async loadPokemons(): Promise<void> {
        try {
            this.isLoading = true;

            const response = await this.pokeapi.getAll(this.limit, this.offset);

            if (!response) {
                throw new Error('No response from PokeAPI');
            }

            this.count = response.count;
            this.offset += response.results.length;
            this.items = [...this.items, ...response.results];
        } catch (error) {
            await this.toastService.show('Erro ao carregar os Pokémons. Por favor, tente novamente mais tarde.', 'danger');
            console.error(error);
        } finally {
            this.isLoading = false;
        }
    }

    async onIonInfinite(event: InfiniteScrollCustomEvent): Promise<void> {
        const noMoreData: boolean = this.offset >= this.count;

        if (this.isLoading || noMoreData) {
            await event.target.complete();
            await this.toastService.show('Não há mais Pokémons para carregar.', 'danger');
            return;
        }

        await this.loadPokemons();
    }
}

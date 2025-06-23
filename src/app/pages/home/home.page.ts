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
import {PokeapiService} from "../../services/pokeapi.service";
import {InfiniteScrollCustomEvent} from "@ionic/angular";
import {RouterLink} from "@angular/router";

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
    public items: any[] = [];
    public isLoading: boolean = false;
    private offset: number = 0;
    private limit: number = 20;
    private count: number = 0;

    constructor(private readonly pokeapi: PokeapiService) {
    }

    ngOnInit() {
        this.loadPokemons();
    }

    async loadPokemons(): Promise<void> {
        try {
            this.isLoading = true;

            const response = await this.pokeapi.getAll(this.limit, this.offset);

            if (!response) {
                return;
            }
            this.count = response.count;
            this.offset += response.results.length;
            this.items = [...this.items, ...response.results];

        } catch (error) {
            console.error(error);
        } finally {
            this.isLoading = false;
        }
    }

    onIonInfinite(event: InfiniteScrollCustomEvent) {
        const noMoreData: boolean = this.offset >= this.count;

        if (this.isLoading || noMoreData) {
            if (event) {
                event.target.complete();
            }
            return;
        }

        this.loadPokemons();
    }
}

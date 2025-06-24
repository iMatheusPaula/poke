import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
    IonAvatar,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonIcon,
    IonText
} from '@ionic/angular/standalone';
import {FavoritesService} from '../../services/favorites/favorites.service';
import {RouterLink} from '@angular/router';
import {PokemonImageComponent} from '../../components/pokemon-image/pokemon-image.component';

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.page.html',
    styleUrls: ['./favorites.page.scss'],
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
        IonButtons,
        IonBackButton,
        IonIcon,
        IonText,
        CommonModule,
        FormsModule,
        RouterLink,
        PokemonImageComponent
    ]
})
export class FavoritesPage implements OnInit {
    constructor(public readonly favoritesService: FavoritesService) {
    }

    ngOnInit() {
    }
}

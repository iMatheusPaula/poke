import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';

@Component({
    selector: 'app-pokemon-image',
    templateUrl: './pokemon-image.component.html',
    styleUrls: ['./pokemon-image.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule]
})
export class PokemonImageComponent {
    @Input() pokemonId!: number;

    get imageUrl(): string {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.pokemonId}.png`;
    }
}

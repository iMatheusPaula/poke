import {Injectable} from '@angular/core';
import {ToastController} from "@ionic/angular/standalone";

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    constructor(private readonly toastController: ToastController) {
    }

    async show(message: string, color: 'success' | 'danger'): Promise<void> {
        const toast = await this.toastController.create({
            message,
            color,
            duration: 1000,
        });

        await toast.present();
    }
}

import { Component } from '@angular/core';
import { ApiopeniaService } from './apiopenia.service';
import { map } from 'rxjs/operators';

@Component({
	selector: 'rudeness-finder',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
	title = 'rudenessFinder';
	messageIn: any = '';
	responseRudeness: any;
	messages: string[] = [];
	posting: boolean = false;
	textButton: string = 'Post';

	constructor(private openia: ApiopeniaService) {}

	checkMessage(message: string): void {
		this.posting = true;
		this.textButton = 'Posting...';
		this.openia.checkPost(message).subscribe((data) => {
			let respuesta = data.choices[0].text.slice(0);
			respuesta = data.choices[0].text.replace('\n', '').slice(respuesta.indexOf('{') - 1);
			this.responseRudeness = JSON.parse(respuesta);

			if (this.responseRudeness.respuesta.numero === 0) {
				this.messages.push(message);
				this.messageIn = '';
				this.posting = false;
				this.textButton = 'Post';
			} else {
				this.messages.push('Mensaje no autorizado');
				console.log('Problema: ', this.responseRudeness.respuesta.palabra);
				this.messageIn = '';
				this.posting = false;
				this.textButton = 'Post';
			}
		});
	}
}

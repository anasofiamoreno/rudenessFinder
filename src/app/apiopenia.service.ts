import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OPENAI_API_KEY } from './../../src/key_enviroment';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ApiopeniaService {
	constructor(private http: HttpClient) {}

	public checkPost(message: string): Observable<any> {
		console.log('service');

		const url = 'https://api.openai.com/v1/completions';

		const data = {
			prompt: this.generatePrompt(message),
			max_tokens: 100,
			model: 'text-davinci-003',
			temperature: 0.5
		};

		const options = {
			headers: this.getHeaders()
		};

		return this.http.post(url, data, options);
	}

	private generatePrompt(message: string) {
		const capitalizedAnimal = message[0].toUpperCase() + message.slice(1).toLowerCase();
		return `Busca groserias en el siguiente mensaje y dime cuantas groserias hay y cuales,
            dame la respuesta en formato JSON en string en minusculas".
  
          enunciado: ${capitalizedAnimal}
          
          formato de respuesta:
          {"respuesta":
            {"numero":number,
            "palabra":"array}
          }
          `;
	}

	getHeaders(): HttpHeaders {
		return new HttpHeaders()
			.set('Content-Type', 'application/json')
			.set('Authorization', `Bearer ${OPENAI_API_KEY}`);
	}
}

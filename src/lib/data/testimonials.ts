import type { Testimonial } from '#lib/types.ts';

export const testimonials: Testimonial[] = [
	{
		id: 'alejandro-riquelme',
		quote:
			'Llevo tres años como cliente habitual de Mateo. La puntualidad, el trato impecable y el ritual de la toalla caliente son incomparables. Un verdadero remanso de paz en medio de la semana.',
		author: 'Alejandro Riquelme',
		initials: 'AR',
		location: 'Córdoba',
		rating: 5
	},
	{
		id: 'javier-gomez',
		quote:
			'La experiencia completa vale cada peso. El café de especialidad mientras esperás y el masaje capilar final te dejan renovado. David es un maestro absoluto con el perfilado de barba.',
		author: 'Javier Gómez',
		initials: 'JG',
		location: 'Cerro de las Rosas',
		rating: 5
	},
	{
		id: 'fernando-lozano',
		quote:
			'Higiene impecable, instrumental abierto delante de vos y una atmósfera sofisticada sin pretensiones. Carlos clava el corte que pedís con exactitud milimétrica.',
		author: 'Fernando Lozano',
		initials: 'FL',
		location: 'Nueva Córdoba',
		rating: 5
	}
];

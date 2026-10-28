import type { Service } from '#lib/types.ts';

// Precios de ejemplo para la demo.
export const services: Service[] = [
	{
		id: 'corte-signature',
		name: 'Corte Signature Atelier',
		description:
			'Diagnóstico capilar individualizado, corte de autor a tijera o máquina de alta precisión, lavado purificante tonificante y finalizado con peinado pomade.',
		tag: 'Esencial',
		price: 15000,
		durationMin: 45
	},
	{
		id: 'ritual-barba',
		name: 'Ritual de Barba Imperial',
		description:
			'Doble tratamiento de toallas calientes al vapor con aceites orgánicos de cedro, perfilado magistral a navaja japonesa y sellado con bálsamo frío refrescante.',
		tag: 'Tradicional',
		price: 12000,
		durationMin: 35
	},
	{
		id: 'experiencia-royal',
		name: 'La Experiencia Royal',
		description:
			'El combo definitivo: corte de autor completo, ritual de barba imperial integral, mascarilla facial negra purificante de carbón activado y masaje craneal descontracturante.',
		tag: 'Completo VIP',
		price: 25000,
		durationMin: 75,
		featured: true
	},
	{
		id: 'camuflaje-canas',
		name: 'Camuflaje de Canas & Color',
		description:
			'Difuminado natural de canas con pigmentos suaves, aplicado con técnica de precisión para un resultado sutil, sin cambios bruscos de tono.',
		tag: 'Tratamiento',
		price: 11000,
		durationMin: 40
	}
];

import type { Service } from '#lib/types.ts';

// Precios de ejemplo para la demo.
export const services: Service[] = [
	{
		id: 'corte',
		name: 'Corte de cabello',
		description:
			'Corte clásico a tijera o máquina, adaptado a la forma de tu rostro. Incluye lavado, secado y peinado final con pomada.',
		category: 'Corte',
		price: 12000,
		durationMin: 40
	},
	{
		id: 'corte-y-barba',
		name: 'Corte y barba',
		description:
			'El combo completo: corte de autor y arreglo de barba con perfilado a navaja, toalla caliente y bálsamo hidratante. Salís listo para cualquier ocasión.',
		category: 'Combo',
		price: 18000,
		durationMin: 60,
		featured: true
	},
	{
		id: 'tenido',
		name: 'Teñido de cabello',
		description:
			'Coloración y matizado profesional: cobertura de canas, tonos naturales o cambio de look, con productos que cuidan el cuero cabelludo.',
		category: 'Color',
		price: 20000,
		durationMin: 90
	},
	{
		id: 'arreglo-de-barba',
		name: 'Arreglo de barba',
		description:
			'Perfilado y recorte de barba con navaja, definición de mejillas y cuello, y aceite nutritivo para suavizar el vello.',
		category: 'Barba',
		price: 8000,
		durationMin: 25
	},
	{
		id: 'afeitado-clasico',
		name: 'Afeitado clásico a navaja',
		description:
			'Afeitado tradicional con toallas calientes, espuma artesanal y navaja de filo recto. Una experiencia de relax y precisión.',
		category: 'Barba',
		price: 10000,
		durationMin: 30
	},
	{
		id: 'corte-infantil',
		name: 'Corte infantil',
		description:
			'Corte para chicos de hasta 12 años, con paciencia y buen humor. Incluye peinado y un ambiente tranquilo para los más chiquitos.',
		category: 'Infantil',
		price: 9000,
		durationMin: 30
	}
];

import type { Standard } from '#lib/types.ts';

export const standards: Standard[] = [
	{
		id: 'maestria',
		title: 'Maestría artesanal',
		description:
			'Perfeccionamos las técnicas clásicas europeas con tijera y navaja recta, combinadas con estilos de vanguardia contemporánea.',
		icon: 'craft'
	},
	{
		id: 'higiene',
		title: 'Higiene y esterilización',
		description:
			'Protocolo de grado quirúrgico con autoclave y luz UV para cada cliente. Hojas de afeitar nuevas y descartables en cada servicio.',
		icon: 'hygiene'
	},
	{
		id: 'lounge',
		title: 'Bar lounge de cortesía',
		description:
			'Café espresso de especialidad, whisky single malt o cerveza artesanal fría, incluidos durante tu estancia en la barbería.',
		icon: 'lounge'
	},
	{
		id: 'exclusividad',
		title: 'Atención exclusiva 1 a 1',
		description:
			'Citas programadas sin esperas ni salas atestadas. Tu barbero dedicado con tiempo íntegro para un resultado impecable.',
		icon: 'exclusive'
	}
];

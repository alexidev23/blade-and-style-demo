import type { Barber } from '#lib/types.ts';
import carlos from '#lib/assets/barbers/carlos.jpg';
import david from '#lib/assets/barbers/david.jpg';
import mateo from '#lib/assets/barbers/mateo.jpg';

export const barbers: Barber[] = [
	{
		id: 'mateo-rossi',
		name: 'Mateo Rossi',
		role: 'Master Barber & Fundador',
		specialty: 'Tijera & navaja tradicional italiana',
		bio: 'Formado en las barberías históricas de Milán y Florencia. Su técnica destaca por la armonización geométrica del rostro y los acabados pulidos clásicos.',
		experienceYears: 12,
		photo: mateo,
		photoAlt: 'Mateo Rossi, barbero fundador, con delantal negro sosteniendo unas tijeras',
		serviceIds: ['corte', 'corte-y-barba', 'arreglo-de-barba', 'afeitado-clasico'],
		featured: true
	},
	{
		id: 'david-silva',
		name: 'David Silva',
		role: 'Especialista en barbas',
		specialty: 'Perfilados de alta precisión & barboterapia',
		bio: 'Meticuloso en el cuidado de la piel sensible y el diseño de barbas densas. Domina el tratamiento con toallas aromatizadas y aceites esenciales.',
		experienceYears: 8,
		photo: david,
		photoAlt: 'David Silva, barbero, perfilando una barba con instrumentos de precisión',
		serviceIds: ['corte-y-barba', 'arreglo-de-barba', 'afeitado-clasico']
	},
	{
		id: 'carlos-mendez',
		name: 'Carlos Méndez',
		role: 'Estilista senior',
		specialty: 'Fades milimétricos & texturizados modernos',
		bio: 'Especialista en degradados impecables, sin saltos de tono, y en estilos contemporáneos con texturas orgánicas para el día a día ejecutivo y formal.',
		experienceYears: 10,
		photo: carlos,
		photoAlt:
			'Carlos Méndez, estilista senior, con un corte moderno en una barbería de madera oscura',
		serviceIds: ['corte', 'corte-y-barba', 'tenido', 'corte-infantil']
	}
];

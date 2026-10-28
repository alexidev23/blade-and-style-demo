import type { NavItem } from '#lib/types.ts';

export const site = {
	name: 'Blade & Style',
	tagline: 'Barbería de autor',
	city: 'Córdoba',
	founded: 2011,
	rating: 4.9,
	reviewCount: 850,
	hoursSummary: 'Abierto de lunes a sábado hasta las 21:00 h'
};

export const navItems: NavItem[] = [
	{ id: 'inicio', label: 'Inicio' },
	{ id: 'servicios', label: 'Servicios' },
	{ id: 'barberos', label: 'Barberos' },
	{ id: 'estandares', label: 'Experiencia' },
	{ id: 'ubicacion', label: 'Contacto' }
];

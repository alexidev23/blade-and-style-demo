import type { NavItem } from '#lib/types.ts';

export const site = {
	name: 'Blade & Style',
	tagline: 'Barbería de autor'
};

export const navItems: NavItem[] = [
	{ id: 'inicio', label: 'Inicio' },
	{ id: 'servicios', label: 'Servicios' },
	{ id: 'barberos', label: 'Barberos' },
	{ id: 'estandares', label: 'Experiencia' },
	{ id: 'ubicacion', label: 'Contacto' }
];

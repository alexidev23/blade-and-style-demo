import type { Address, NavItem, OpeningHours, SocialLink } from '#lib/types.ts';

// Datos de ejemplo para la demo.
export const site = {
	name: 'Blade & Style',
	tagline: 'Barbería de autor',
	city: 'Córdoba',
	founded: 2011,
	rating: 4.9,
	reviewCount: 850,
	hoursSummary: 'Abierto de lunes a sábado hasta las 21:00 h',
	address: {
		street: 'Av. Colón 123',
		city: 'Córdoba',
		province: 'Córdoba',
		postalCode: 'X5000'
	} satisfies Address,
	phone: '+54 351 123-4567',
	email: 'hola@bladeandstyle.com',
	hours: [
		{ days: 'Lunes a viernes', hours: '10:00 – 21:00' },
		{ days: 'Sábados', hours: '10:00 – 21:00' },
		{ days: 'Domingos', hours: 'Cerrado' }
	] satisfies OpeningHours[],
	social: [
		{ id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com' },
		{ id: 'youtube', label: 'YouTube', href: 'https://www.youtube.com' },
		{ id: 'whatsapp', label: 'WhatsApp', href: 'https://wa.me/543511234567' }
	] satisfies SocialLink[]
};

export const navItems: NavItem[] = [
	{ id: 'inicio', label: 'Inicio' },
	{ id: 'servicios', label: 'Servicios' },
	{ id: 'barberos', label: 'Barberos' },
	{ id: 'estandares', label: 'Experiencia' },
	{ id: 'ubicacion', label: 'Contacto' }
];

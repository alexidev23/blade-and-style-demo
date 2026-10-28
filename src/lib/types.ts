export interface NavItem {
	id: string;
	label: string;
}

export type ServiceCategory = 'Corte' | 'Barba' | 'Combo' | 'Color' | 'Infantil';

export interface Service {
	id: string;
	name: string;
	description: string;
	category: ServiceCategory;
	/** Precio en pesos argentinos, número entero. */
	price: number;
	durationMin: number;
	featured?: boolean;
}

export interface Barber {
	id: string;
	name: string;
	role: string;
	specialty: string;
	bio: string;
	experienceYears: number;
	/** URL de la foto importada desde $lib/assets. */
	photo: string;
	photoAlt: string;
	/** ids de los servicios que realiza (ver data/services.ts). */
	serviceIds: string[];
	featured?: boolean;
}

export interface NavItem {
	id: string;
	label: string;
}

export interface Address {
	street: string;
	city: string;
	province: string;
	postalCode: string;
}

export interface OpeningHours {
	days: string;
	hours: string;
}

export type SocialId = 'instagram' | 'youtube' | 'whatsapp';

export interface SocialLink {
	id: SocialId;
	label: string;
	href: string;
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

export type StandardIconId = 'craft' | 'hygiene' | 'lounge' | 'exclusive';

export interface Standard {
	id: string;
	title: string;
	description: string;
	icon: StandardIconId;
}

export interface BookingDraft {
	serviceId: string;
	/** id del barbero; cadena vacía = cualquier maestro disponible. */
	barberId: string;
	/** Fecha en formato ISO yyyy-mm-dd. */
	date: string;
}

export interface Testimonial {
	id: string;
	quote: string;
	author: string;
	/** Iniciales mostradas en el avatar. */
	initials: string;
	/** Ciudad o barrio del cliente. */
	location: string;
	/** Puntaje otorgado, de 1 a 5. */
	rating: number;
}

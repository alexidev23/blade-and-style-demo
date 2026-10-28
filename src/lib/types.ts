export interface NavItem {
	id: string;
	label: string;
}

export type ServiceTag = 'Esencial' | 'Tradicional' | 'Completo VIP' | 'Tratamiento';

export interface Service {
	id: string;
	name: string;
	description: string;
	tag: ServiceTag;
	/** Precio en pesos argentinos, número entero. */
	price: number;
	durationMin: number;
	featured?: boolean;
}

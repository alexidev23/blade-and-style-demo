import type { Barber, BookingDraft, Service } from '#lib/types.ts';

export interface BookingSelectionRequest {
	serviceId?: string;
	barberId?: string;
}

/** Servicios que un barbero realiza. Sin barbero devuelve el catálogo completo. */
export const getServicesForBarber = (
	barberId: string,
	barbers: Barber[],
	services: Service[]
): Service[] => {
	const barber = barbers.find((item) => item.id === barberId);
	return barber ? services.filter((service) => barber.serviceIds.includes(service.id)) : services;
};

/** Barberos que realizan un servicio. Sin servicio devuelve a todos. */
export const getBarbersForService = (serviceId: string, barbers: Barber[]): Barber[] =>
	serviceId ? barbers.filter((barber) => barber.serviceIds.includes(serviceId)) : barbers;

/**
 * Normaliza un pedido de reserva a un par (barbero, servicio) siempre válido.
 * El servicio pedido manda; si el barbero no lo realiza se descarta el barbero.
 * Si solo se pide un barbero, se elige el primer servicio que sí realiza.
 */
export const resolveBookingSelection = (
	{ serviceId, barberId }: BookingSelectionRequest,
	services: Service[],
	barbers: Barber[]
): Pick<BookingDraft, 'serviceId' | 'barberId'> => {
	const requestedService = services.find((service) => service.id === serviceId);
	const requestedBarber = barbers.find((barber) => barber.id === barberId);

	if (requestedService) {
		const barberFits = !requestedBarber || requestedBarber.serviceIds.includes(requestedService.id);
		return {
			serviceId: requestedService.id,
			barberId: barberFits ? (requestedBarber?.id ?? '') : ''
		};
	}

	if (requestedBarber) {
		const compatible = services.find((service) => requestedBarber.serviceIds.includes(service.id));
		if (compatible) return { serviceId: compatible.id, barberId: requestedBarber.id };
	}

	return { serviceId: services[0]?.id ?? '', barberId: '' };
};

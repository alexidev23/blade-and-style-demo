import { describe, expect, it } from 'vitest';
import { barbers } from './barbers';
import { services } from './services';

describe('booking data integrity', () => {
	it('every barber only lists existing service ids', () => {
		const known = new Set(services.map((service) => service.id));
		for (const barber of barbers) {
			for (const serviceId of barber.serviceIds) {
				expect(known.has(serviceId), `${barber.id} → ${serviceId}`).toBe(true);
			}
		}
	});

	it('every service is performed by at least one barber', () => {
		for (const service of services) {
			expect(
				barbers.some((barber) => barber.serviceIds.includes(service.id)),
				service.id
			).toBe(true);
		}
	});

	it('every barber performs at least one service', () => {
		for (const barber of barbers) {
			expect(barber.serviceIds.length, barber.id).toBeGreaterThan(0);
		}
	});
});

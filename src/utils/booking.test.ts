import { describe, expect, it } from 'vitest';
import type { Barber, Service } from '#lib/types.ts';
import { getBarbersForService, getServicesForBarber, resolveBookingSelection } from './booking';

const services: Service[] = [
	{
		id: 'corte',
		name: 'Corte de cabello',
		description: '',
		category: 'Corte',
		price: 12000,
		durationMin: 40
	},
	{
		id: 'corte-y-barba',
		name: 'Corte y barba',
		description: '',
		category: 'Combo',
		price: 18000,
		durationMin: 60
	},
	{
		id: 'tenido',
		name: 'Teñido de cabello',
		description: '',
		category: 'Color',
		price: 20000,
		durationMin: 90
	}
];

const barber = (id: string, serviceIds: string[]): Barber => ({
	id,
	name: id,
	role: '',
	specialty: '',
	bio: '',
	experienceYears: 1,
	photo: '',
	photoAlt: '',
	serviceIds
});

const barbers: Barber[] = [
	barber('carlos', ['corte', 'tenido']),
	barber('david', ['corte-y-barba']),
	barber('mateo', ['corte', 'corte-y-barba'])
];

describe('resolveBookingSelection', () => {
	it('picks the first service (catalog order) the requested barber performs', () => {
		expect(resolveBookingSelection({ barberId: 'david' }, services, barbers)).toEqual({
			serviceId: 'corte-y-barba',
			barberId: 'david'
		});
	});

	it('keeps a compatible barber and service pair', () => {
		expect(
			resolveBookingSelection({ serviceId: 'corte', barberId: 'carlos' }, services, barbers)
		).toEqual({ serviceId: 'corte', barberId: 'carlos' });
	});

	it('drops a barber that does not perform the requested service', () => {
		expect(
			resolveBookingSelection({ serviceId: 'corte', barberId: 'david' }, services, barbers)
		).toEqual({ serviceId: 'corte', barberId: '' });
	});

	it('falls back to the requested service when the barber id is unknown', () => {
		expect(
			resolveBookingSelection({ serviceId: 'tenido', barberId: 'no-existe' }, services, barbers)
		).toEqual({ serviceId: 'tenido', barberId: '' });
	});

	it('defaults to the first service when nothing is requested', () => {
		expect(resolveBookingSelection({}, services, barbers)).toEqual({
			serviceId: 'corte',
			barberId: ''
		});
	});

	it('falls back deterministically when every id is unknown', () => {
		expect(resolveBookingSelection({ serviceId: 'x', barberId: 'y' }, services, barbers)).toEqual({
			serviceId: 'corte',
			barberId: ''
		});
	});

	it('handles an empty service catalog', () => {
		expect(resolveBookingSelection({ serviceId: 'corte' }, [], barbers)).toEqual({
			serviceId: '',
			barberId: ''
		});
	});
});

describe('getServicesForBarber', () => {
	it('returns only the services the barber performs', () => {
		expect(getServicesForBarber('david', barbers, services).map((item) => item.id)).toEqual([
			'corte-y-barba'
		]);
	});

	it('returns the whole catalog when no barber is given', () => {
		expect(getServicesForBarber('', barbers, services)).toHaveLength(services.length);
	});
});

describe('getBarbersForService', () => {
	it('returns the barbers that perform the service, in catalog order', () => {
		expect(getBarbersForService('corte', barbers).map((item) => item.id)).toEqual([
			'carlos',
			'mateo'
		]);
	});

	it('returns every barber when no service is given', () => {
		expect(getBarbersForService('', barbers)).toHaveLength(barbers.length);
	});
});

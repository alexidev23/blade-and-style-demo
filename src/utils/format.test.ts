import { describe, expect, it } from 'vitest';
import { formatBookingDate, formatPrice, todayISO } from './format';

describe('formatPrice', () => {
	it('formats an integer amount in ARS without decimals', () => {
		const formatted = formatPrice(12000);
		expect(formatted).toContain('12.000');
		expect(formatted).not.toContain(',00');
	});
});

describe('todayISO', () => {
	it('returns a yyyy-mm-dd local date', () => {
		expect(todayISO()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
	});
});

describe('formatBookingDate', () => {
	it('formats an ISO date in Spanish', () => {
		expect(formatBookingDate('2026-03-14')).toMatch(/14 de marzo/);
	});

	it('returns the raw value when the date is invalid', () => {
		expect(formatBookingDate('no-es-fecha')).toBe('no-es-fecha');
	});
});

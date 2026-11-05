const priceFormatter = new Intl.NumberFormat('es-AR', {
	style: 'currency',
	currency: 'ARS',
	maximumFractionDigits: 0
});

export const formatPrice = (amount: number) => priceFormatter.format(amount);

const bookingDateFormatter = new Intl.DateTimeFormat('es-AR', {
	weekday: 'long',
	day: 'numeric',
	month: 'long'
});

/** Devuelve la fecha local en formato ISO yyyy-mm-dd (evita el desfase UTC). */
export const todayISO = () => {
	const now = new Date();
	const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
	return local.toISOString().slice(0, 10);
};

export const formatBookingDate = (isoDate: string) => {
	const date = new Date(`${isoDate}T00:00:00`);
	return Number.isNaN(date.getTime()) ? isoDate : bookingDateFormatter.format(date);
};

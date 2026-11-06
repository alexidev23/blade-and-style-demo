<script lang="ts">
	import Barbers from '#lib/components/sections/Barbers.svelte';
	import Banner from '#lib/components/sections/Banner.svelte';
	import BookingWidget from '#lib/components/sections/BookingWidget.svelte';
	import Contact from '#lib/components/sections/Contact.svelte';
	import Experience from '#lib/components/sections/Experience.svelte';
	import Footer from '#lib/components/sections/Footer.svelte';
	import Header from '#lib/components/sections/Header.svelte';
	import Hero from '#lib/components/sections/Hero.svelte';
	import Services from '#lib/components/sections/Services.svelte';
	import Testimonials from '#lib/components/sections/Testimonials.svelte';
	import BookingModal from '#lib/components/ui/BookingModal.svelte';
	import { barbers } from '#lib/data/barbers.ts';
	import { services } from '#lib/data/services.ts';
	import type { Barber, BookingDraft, Service } from '#lib/types.ts';
	import { resolveBookingSelection } from '../utils/booking';
	import { todayISO } from '../utils/format';

	let booking = $state<BookingDraft | null>(null);

	function openBooking(options: { service?: Service; barber?: Barber } = {}) {
		booking = {
			...resolveBookingSelection(
				{ serviceId: options.service?.id, barberId: options.barber?.id },
				services,
				barbers
			),
			date: todayISO()
		};
	}

	function openFromDraft(draft: BookingDraft) {
		booking = { ...resolveBookingSelection(draft, services, barbers), date: draft.date };
	}

	function closeBooking() {
		booking = null;
	}
</script>

<a
	href="#contenido"
	class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-sm focus:bg-primary focus:px-4 focus:py-2 focus:font-semibold focus:text-on-primary"
>
	Saltar al contenido
</a>

<Header onbook={() => openBooking()} />

<main id="contenido" tabindex="-1" class="pt-16 lg:pt-20">
	<Hero />
	<BookingWidget onsearch={openFromDraft} />
	<Services onselect={(service) => openBooking({ service })} />
	<Experience />
	<Barbers onselect={(barber) => openBooking({ barber })} />
	<Testimonials />
	<Banner />
	<Contact />
</main>

<Footer />

{#key booking}
	<BookingModal draft={booking} onClose={closeBooking} />
{/key}

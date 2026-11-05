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
	import { services } from '#lib/data/services.ts';
	import type { Barber, BookingDraft, Service } from '#lib/types.ts';
	import { todayISO } from '../utils/format';

	let booking = $state<BookingDraft | null>(null);

	function openBooking(options: { service?: Service; barber?: Barber } = {}) {
		booking = {
			serviceId: options.service?.id ?? services[0]?.id ?? '',
			barberId: options.barber?.id ?? '',
			date: todayISO()
		};
	}

	function closeBooking() {
		booking = null;
	}
</script>

<Header onbook={() => openBooking()} />

<main class="pt-16 lg:pt-20">
	<Hero />
	<BookingWidget onsearch={(draft) => (booking = draft)} />
	<Services onselect={(service) => openBooking({ service })} />
	<Experience />
	<Barbers onselect={(barber) => openBooking({ barber })} />
	<Testimonials />
	<Banner />
	<Contact />
</main>

<Footer />

<BookingModal open={booking !== null} draft={booking} onclose={closeBooking} />

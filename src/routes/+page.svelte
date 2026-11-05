<script lang="ts">
	import Barbers from '#lib/components/sections/Barbers.svelte';
	import Contact from '#lib/components/sections/Contact.svelte';
	import Experience from '#lib/components/sections/Experience.svelte';
	import Footer from '#lib/components/sections/Footer.svelte';
	import Header from '#lib/components/sections/Header.svelte';
	import Hero from '#lib/components/sections/Hero.svelte';
	import Services from '#lib/components/sections/Services.svelte';
	import type { Barber, Service } from '#lib/types.ts';

	function openBooking(options: { service?: Service; barber?: Barber } = {}) {
		console.log('abrir modal', options.service?.id, options.barber?.id);
	}
</script>

<Header onbook={() => openBooking()} />

<main class="pt-16 lg:pt-20">
	<Hero />
	<Services onselect={(service) => openBooking({ service })} />
	<Experience />
	<Barbers onselect={(barber) => openBooking({ barber })} />
	<Contact />
</main>

<Footer />

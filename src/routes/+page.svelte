<script lang="ts">
	import Header from '#lib/components/sections/Header.svelte';
	import Hero from '#lib/components/sections/Hero.svelte';
	import Services from '#lib/components/sections/Services.svelte';
	import type { Service } from '#lib/types.ts';

	function openBooking(service?: Service) {
		console.log('abrir modal', service?.id);
	}
</script>

<Header onbook={() => openBooking()} />

<main class="pt-16 lg:pt-20">
	<Hero />
	<Services onselect={openBooking} />
</main>

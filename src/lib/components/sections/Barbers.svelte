<script lang="ts">
	import { barbers } from '#lib/data/barbers.ts';
	import type { Barber } from '#lib/types.ts';
	import BarberCard from '../cards/BarberCard.svelte';
	import Section from '../ui/Section.svelte';
	import SectionHeading from '../ui/SectionHeading.svelte';

	interface Props {
		onselect: (barber: Barber) => void;
	}

	let { onselect }: Props = $props();
</script>

<Section id="barberos" aria-labelledby="barberos-title">
	<SectionHeading
		titleId="barberos-title"
		eyebrow="Virtuosismo & vocación"
		title="Nuestros maestros barberos"
		description="Manos expertas consagradas a la elegancia masculina. Elegí a tu especialista y viví un corte adaptado a tu identidad."
	/>

	<ul class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
		{#each barbers as barber (barber.id)}
			<li class="flex">
				<BarberCard {barber} {onselect} />
			</li>
		{/each}
	</ul>
</Section>

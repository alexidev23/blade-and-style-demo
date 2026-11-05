<script lang="ts">
	import { standards } from '#lib/data/standards.ts';
	import StandardCard from '../cards/StandardCard.svelte';
	import Section from '../ui/Section.svelte';
	import SectionHeading from '../ui/SectionHeading.svelte';
</script>

<Section id="estandares" tone="deep" aria-labelledby="estandares-title">
	<SectionHeading
		align="center"
		titleId="estandares-title"
		eyebrow="Compromiso inquebrantable"
		title="Los estándares Blade & Style"
		description="No somos únicamente una barbería; preservamos un santuario de caballeros fundamentado en el respeto por el oficio tradicional y la más estricta cortesía."
	/>

	<ul class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
		{#each standards as standard (standard.id)}
			<li class="flex">
				<StandardCard {standard} />
			</li>
		{/each}
	</ul>
</Section>

<script lang="ts">
	import { services } from '#lib/data/services.ts';
	import type { Service } from '#lib/types.ts';
	import ServiceCard from '../cards/ServiceCard.svelte';
	import Section from '../ui/Section.svelte';
	import SectionHeading from '../ui/SectionHeading.svelte';

	interface Props {
		onselect: (service: Service) => void;
	}

	let { onselect }: Props = $props();
</script>

<Section id="servicios" aria-labelledby="servicios-title">
	<SectionHeading
		titleId="servicios-title"
		eyebrow="Carta de cuidado & estilo"
		title="Servicios de autor"
		description="Tratamientos meticulosos diseñados para el caballero moderno. Cada sesión incluye consulta personalizada y productos botánicos premium."
	/>

	<ul class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each services as service (service.id)}
			<li class="flex">
				<ServiceCard {service} {onselect} />
			</li>
		{/each}
	</ul>
</Section>

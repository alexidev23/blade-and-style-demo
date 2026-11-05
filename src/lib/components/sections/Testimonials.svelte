<script lang="ts">
	import { testimonials } from '#lib/data/testimonials.ts';
	import TestimonialCard from '../cards/TestimonialCard.svelte';
	import Section from '../ui/Section.svelte';
	import SectionHeading from '../ui/SectionHeading.svelte';
</script>

<Section id="testimonios" tone="deep" aria-labelledby="testimonios-title">
	<SectionHeading
		align="center"
		titleId="testimonios-title"
		eyebrow="Testimonios de clientes"
		title="Distinción avalada por caballeros"
		description="Opiniones reales de miembros que confían su imagen personal a Blade & Style."
	/>

	<ul class="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
		{#each testimonials as testimonial (testimonial.id)}
			<li class="flex">
				<TestimonialCard {testimonial} />
			</li>
		{/each}
	</ul>
</Section>

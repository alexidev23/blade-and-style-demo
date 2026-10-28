<script lang="ts">
	import type { Service } from '#lib/types.ts';
	import Clock from '@lucide/svelte/icons/clock';
	import Card from '../ui/Card.svelte';
	import Badge from '../ui/Badge.svelte';
	import { formatPrice } from '../../../utils/format';
	import Button from '../ui/Button.svelte';

	interface Props {
		service: Service;
		onselect: (service: Service) => void;
	}

	let { service, onselect }: Props = $props();

	const titleId = $derived(`service-${service.id}-title`);
</script>

<Card
	as="article"
	aria-labelledby={titleId}
	tone={service.featured ? 'highlight' : 'default'}
	class="relative flex w-full flex-col justify-between motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:-translate-y-1"
>
	{#if service.featured}
		<Badge class="absolute -top-3 right-6 shadow-md">Recomendado</Badge>
	{/if}

	<div>
		<div class="mb-4 flex items-center justify-between gap-2">
			<Badge variant={service.featured ? 'primary' : 'subtle'}>{service.category}</Badge>
			<span
				class="flex items-center gap-1 text-sm {service.featured ? 'text-primary' : 'text-muted'}"
			>
				<Clock class="size-4" />
				{service.durationMin} min
			</span>
		</div>

		<h3
			id={titleId}
			class="mb-2 font-display text-headline-sm {service.featured ? 'text-primary' : 'text-text'}"
		>
			{service.name}
		</h3>
		<p class="mb-6 text-sm leading-relaxed text-muted">{service.description}</p>
	</div>

	<div>
		<div class="mb-6 flex items-baseline justify-between rounded-sm bg-surface-raised/50 px-4 py-3">
			<span class="text-sm tracking-wider text-muted uppercase">Inversión</span>
			<span class="font-display text-headline-md font-bold text-primary">
				{formatPrice(service.price)}
			</span>
		</div>

		<Button
			variant={service.featured ? 'primary' : 'secondary'}
			size="sm"
			class="w-full text-sm uppercase"
			onclick={() => onselect(service)}
		>
			Reservar este servicio
			<span class="sr-only">: {service.name}</span>
		</Button>
	</div>
</Card>

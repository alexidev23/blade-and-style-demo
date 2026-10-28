<script lang="ts">
	import type { Barber } from '#lib/types.ts';
	import Badge from '../ui/Badge.svelte';
	import Button from '../ui/Button.svelte';
	import Card from '../ui/Card.svelte';

	interface Props {
		barber: Barber;
		onselect: (barber: Barber) => void;
	}

	let { barber, onselect }: Props = $props();

	const titleId = $derived(`barber-${barber.id}-title`);
	const firstName = $derived(barber.name.split(' ')[0]);
</script>

<Card
	as="article"
	padding="none"
	aria-labelledby={titleId}
	class="group flex w-full flex-col overflow-hidden"
>
	<div class="relative aspect-4/5 overflow-hidden">
		<img
			src={barber.photo}
			alt={barber.photoAlt}
			width="800"
			height="1000"
			loading="lazy"
			decoding="async"
			class="size-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"
		/>
		<div
			aria-hidden="true"
			class="pointer-events-none absolute inset-0 bg-linear-to-t from-surface via-transparent to-transparent opacity-90"
		></div>
		<Badge
			variant={barber.featured ? 'primary' : 'neutral'}
			class="absolute top-4 left-4 shadow-md"
		>
			{barber.role}
		</Badge>
	</div>

	<div class="flex flex-1 flex-col justify-between p-6">
		<div>
			<div class="mb-1 flex items-baseline justify-between gap-2">
				<h3 id={titleId} class="font-display text-headline-sm text-text">{barber.name}</h3>
				<span class="text-sm font-bold whitespace-nowrap text-primary">
					{barber.experienceYears} años exp.
				</span>
			</div>
			<p class="mb-4 text-sm text-muted">Especialidad: {barber.specialty}</p>
			<p class="mb-6 text-sm leading-relaxed text-muted">{barber.bio}</p>
		</div>

		<Button variant="secondary" class="w-full text-sm uppercase" onclick={() => onselect(barber)}>
			Reservar con {firstName}
		</Button>
	</div>
</Card>

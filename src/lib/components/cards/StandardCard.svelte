<script lang="ts">
	import type { Standard } from '#lib/types.ts';
	import Award from '@lucide/svelte/icons/award';
	import ShieldCheck from '@lucide/svelte/icons/shield-check';
	import UserRoundCheck from '@lucide/svelte/icons/user-round-check';
	import Wine from '@lucide/svelte/icons/wine';
	import Card from '../ui/Card.svelte';

	interface Props {
		standard: Standard;
	}

	let { standard }: Props = $props();

	const icons = {
		craft: Award,
		hygiene: ShieldCheck,
		lounge: Wine,
		exclusive: UserRoundCheck
	} as const;

	const Icon = $derived(icons[standard.icon]);
	const titleId = $derived(`standard-${standard.id}-title`);
</script>

<Card as="article" aria-labelledby={titleId} class="flex h-full flex-col">
	<div class="mb-6 grid size-12 place-items-center rounded-lg bg-surface-raised text-primary">
		<Icon class="size-6" aria-hidden="true" />
	</div>
	<h3 id={titleId} class="mb-3 font-display text-headline-sm text-text">{standard.title}</h3>
	<p class="text-sm leading-relaxed text-muted">{standard.description}</p>
</Card>

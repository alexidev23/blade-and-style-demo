<script lang="ts">
	import Star from '@lucide/svelte/icons/star';
	import type { HTMLAttributes } from 'svelte/elements';

	type Size = 'sm' | 'md';

	interface Props extends HTMLAttributes<HTMLSpanElement> {
		rating: number;
		max?: number;
		size?: Size;
	}

	let { rating, max = 5, size = 'md', class: className, ...rest }: Props = $props();

	const sizes: Record<Size, string> = {
		sm: 'size-4.5',
		md: 'size-5'
	};

	const filled = $derived(Math.min(max, Math.max(0, Math.round(rating))));
	const indices = $derived(Array.from({ length: max }, (_, i) => i));
	const label = $derived(`Calificación: ${rating.toLocaleString('es-AR')} de ${max}`);
</script>

<span
	role="img"
	aria-label={label}
	class={['inline-flex items-center gap-1 text-primary', className]}
	{...rest}
>
	{#each indices as index (index)}
		<Star class={[sizes[size], index < filled ? 'fill-current' : 'text-muted/40']} />
	{/each}
</span>

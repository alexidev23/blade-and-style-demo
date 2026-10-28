<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Padding = 'none' | 'md' | 'lg';
	type Tone = 'default' | 'highlight';
	type Tag = 'div' | 'article' | 'li';

	interface Props extends HTMLAttributes<HTMLElement> {
		as?: Tag;
		padding?: Padding;
		tone?: Tone;
		children: Snippet;
	}

	let {
		as = 'div',
		padding = 'md',
		tone = 'default',
		class: className,
		children,
		...rest
	}: Props = $props();

	const paddings: Record<Padding, string> = {
		none: '',
		md: 'p-6',
		lg: 'p-8'
	};

	const tones: Record<Tone, string> = {
		default: 'border-primary/12 bg-surface',
		highlight: 'border-primary/40 bg-surface-raised'
	};
</script>

<svelte:element
	this={as}
	class={['rounded-lg border shadow-card', tones[tone], paddings[padding], className]}
	{...rest}
>
	{@render children()}
</svelte:element>

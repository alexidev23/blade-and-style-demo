<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Padding = 'none' | 'md' | 'lg';
	type Tag = 'div' | 'article' | 'li';

	interface Props extends HTMLAttributes<HTMLElement> {
		as?: Tag;
		padding?: Padding;
		children: Snippet;
	}

	let { as = 'div', padding = 'md', class: className, children, ...rest }: Props = $props();

	const paddings: Record<Padding, string> = {
		none: '',
		md: 'p-6',
		lg: 'p-8'
	};
</script>

<svelte:element
	this={as}
	class={[
		'rounded-lg border border-primary/12 bg-surface shadow-card',
		paddings[padding],
		className
	]}
	{...rest}
>
	{@render children()}
</svelte:element>

<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	type Align = 'start' | 'center';

	interface Props extends HTMLAttributes<HTMLElement> {
		title: string;
		eyebrow?: string;
		description?: string;
		align?: Align;
		titleId?: string;
	}

	let {
		title,
		eyebrow,
		description,
		align = 'start',
		titleId,
		class: className,
		...rest
	}: Props = $props();

	const layouts: Record<Align, string> = {
		start: 'flex flex-col items-start justify-between gap-6 md:flex-row md:items-end',
		center: 'mx-auto max-w-2xl text-center'
	};
</script>

<header class={['mb-12 md:mb-16', layouts[align], className]} {...rest}>
	<div>
		{#if eyebrow}
			<p class="mb-2 text-sm font-semibold tracking-widest text-primary uppercase">{eyebrow}</p>
		{/if}
		<h2 id={titleId} class="font-display text-headline-md text-text md:text-headline-lg">
			{title}
		</h2>
	</div>
	{#if description}
		<p class={['text-muted', align === 'center' ? 'mt-4' : 'max-w-md']}>{description}</p>
	{/if}
</header>

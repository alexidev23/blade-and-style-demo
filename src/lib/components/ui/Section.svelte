<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Tone = 'base' | 'deep';
	type Spacing = 'md' | 'lg';

	interface Props extends HTMLAttributes<HTMLElement> {
		tone?: Tone;
		spacing?: Spacing;
		children: Snippet;
	}

	let { tone = 'base', spacing = 'lg', class: className, children, ...rest }: Props = $props();

	const tones: Record<Tone, string> = {
		base: '',
		deep: 'bg-canvas-deep'
	};

	const spacings: Record<Spacing, string> = {
		md: 'py-12',
		lg: 'py-24'
	};
</script>

<section class={['w-full', tones[tone], spacings[spacing], className]} {...rest}>
	<div class="mx-auto max-w-7xl px-6 lg:px-12">
		{@render children()}
	</div>
</section>

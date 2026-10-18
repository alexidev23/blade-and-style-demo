<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type Variant = 'primary' | 'secondary';

	interface Props extends HTMLButtonAttributes {
		variant?: Variant;
		children: Snippet;
	}

	let {
		variant = 'primary',
		type = 'button',
		class: className,
		children,
		...rest
	}: Props = $props();

	const variants: Record<Variant, string> = {
		primary: 'bg-primary text-on-primary enabled:hover:bg-champagne enabled:hover:shadow-glow',
		secondary: 'bg-surface-raised text-text enabled:hover:bg-primary enabled:hover:text-on-primary'
	};
</script>

<button
	{type}
	class={[
		'inline-flex cursor-pointer items-center justify-center gap-2 rounded-sm px-6 py-3 font-semibold tracking-wide transition',
		'[&_svg]:size-4 [&_svg]:shrink-0',
		'disabled:cursor-not-allowed disabled:opacity-50',
		variants[variant],
		className
	]}
	{...rest}
>
	{@render children()}
</button>

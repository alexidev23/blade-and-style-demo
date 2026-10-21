<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Variant = 'primary' | 'subtle' | 'neutral';

	interface Props extends HTMLAttributes<HTMLSpanElement> {
		variant?: Variant;
		children: Snippet;
	}

	let { variant = 'primary', class: className, children, ...rest }: Props = $props();

	const variants: Record<Variant, string> = {
		primary: 'bg-primary text-on-primary',
		subtle: 'bg-primary/10 text-primary',
		neutral: 'bg-surface-raised text-text'
	};
</script>

<span
	class={[
		'inline-flex items-center gap-2 rounded-sm px-3 py-1.5 text-xs font-semibold tracking-wider uppercase',
		'[&_svg]:size-4 [&_svg]:shrink-0',
		variants[variant],
		className
	]}
	{...rest}
>
	{@render children()}
</span>

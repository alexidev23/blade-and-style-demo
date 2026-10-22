<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	type Variant = 'nav' | 'footer';

	interface Props extends HTMLAnchorAttributes {
		variant?: Variant;
		current?: boolean;
		children: Snippet;
	}

	let {
		variant = 'nav',
		current = false,
		href,
		class: className,
		children,
		...rest
	}: Props = $props();

	const isExternal = $derived(!!href && /^https?:\/\//.test(href));

	const variants: Record<Variant, string> = {
		nav: 'text-base font-medium tracking-wide',
		footer: 'text-sm'
	};
</script>

<a
	{href}
	target={isExternal ? '_blank' : undefined}
	rel={isExternal ? 'noopener noreferrer' : undefined}
	aria-current={current ? 'location' : undefined}
	class={[
		'inline-flex items-center gap-2 transition-colors',
		'[&_svg]:size-4 [&_svg]:shrink-0',
		variants[variant],
		current ? 'text-primary' : 'text-muted hover:text-primary',
		className
	]}
	{...rest}
>
	{@render children()}
</a>

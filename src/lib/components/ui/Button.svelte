<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import { isExternal } from '../../../utils/links';

	type Variant = 'primary' | 'secondary';

	type AsButton = Base & HTMLButtonAttributes & { href?: never };
	type AsAnchor = Base & HTMLAnchorAttributes & { href: string };
	type Props = AsButton | AsAnchor;
	type Size = 'md' | 'sm';

	type Base = { variant?: Variant; size?: Size; children: Snippet };

	let { variant = 'primary', size = 'md', class: className, children, ...rest }: Props = $props();

	const sizes: Record<Size, string> = {
		md: 'px-6 py-3',
		sm: 'px-4 py-2'
	};

	const variants: Record<Variant, string> = {
		primary:
			'bg-primary text-on-primary not-disabled:hover:bg-champagne not-disabled:hover:shadow-glow',
		secondary:
			'bg-surface-raised text-text not-disabled:hover:bg-primary not-disabled:hover:text-on-primary'
	};

	const classes = $derived([
		'inline-flex cursor-pointer items-center justify-center gap-2 rounded-sm px-6 py-3 font-semibold tracking-wide transition',
		'[&_svg]:size-4 [&_svg]:shrink-0',
		'disabled:cursor-not-allowed disabled:opacity-50',
		variants[variant],
		className
	]);
</script>

{#if rest.href !== undefined}
	<a
		class={classes}
		target={isExternal(rest.href) ? '_blank' : undefined}
		rel={isExternal(rest.href) ? 'noopener noreferrer' : undefined}
		{...rest}
	>
		{@render children()}
	</a>
{:else}
	<button type="button" class={classes} {...rest}>
		{@render children()}
	</button>
{/if}

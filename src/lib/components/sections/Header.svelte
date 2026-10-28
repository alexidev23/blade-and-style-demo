<script lang="ts">
	import { navItems, site } from '#lib/data/site.ts';
	import Calendar from '@lucide/svelte/icons/calendar';
	import Menu from '@lucide/svelte/icons/menu';
	import Scissors from '@lucide/svelte/icons/scissors';
	import X from '@lucide/svelte/icons/x';
	import { MediaQuery } from 'svelte/reactivity';
	import { slide } from 'svelte/transition';
	import Button from '../ui/Button.svelte';
	import Link from '../ui/Link.svelte';

	interface Props {
		onbook: () => void;
	}

	let { onbook }: Props = $props();

	let menuOpen = $state(false);
	let activeId = $state('inicio');

	const reduceMotion = new MediaQuery('(prefers-reduced-motion: reduce)');
	const activeLabel = $derived(navItems.find((item) => item.id === activeId)?.label ?? '');

	function closeMenu() {
		menuOpen = false;
	}

	// Scrollspy: marca como activa la sección que cruza el centro de la pantalla.
	$effect(() => {
		const sections = navItems
			.map((item) => document.getElementById(item.id))
			.filter((el): el is HTMLElement => el !== null);

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) activeId = entry.target.id;
				}
			},
			{ rootMargin: '-45% 0px -50% 0px' }
		);

		sections.forEach((section) => observer.observe(section));
		return () => observer.disconnect();
	});
</script>

<svelte:window
	onkeydown={(event) => {
		if (event.key === 'Escape') closeMenu();
	}}
/>

<header class="fixed inset-x-0 top-0 z-50 border-b border-primary/12 bg-canvas/85 backdrop-blur-xl">
	<div class="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6 lg:h-20 lg:px-12">
		<div class="flex min-w-0 items-center gap-2">
			<button
				type="button"
				class="-ml-3 grid size-11 shrink-0 cursor-pointer place-items-center text-text transition-colors hover:text-primary lg:hidden"
				aria-expanded={menuOpen}
				aria-controls="mobile-menu"
				aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
				onclick={() => (menuOpen = !menuOpen)}
			>
				{#if menuOpen}
					<X class="size-6" />
				{:else}
					<Menu class="size-6" />
				{/if}
			</button>

			<a
				href="#inicio"
				class="flex min-w-0 items-center gap-3"
				aria-label="{site.name}, ir al inicio"
			>
				<Scissors class="size-7 shrink-0 text-primary" />
				<span class="flex min-w-0 flex-col gap-0.5">
					<span
						class="truncate font-display text-headline-sm leading-none tracking-wide text-primary"
					>
						{site.name}
					</span>
					<span class="hidden text-sm tracking-widest text-muted uppercase lg:block">
						{site.tagline}
					</span>
					<span class="text-sm tracking-widest text-muted uppercase lg:hidden" aria-hidden="true">
						{activeLabel}
					</span>
				</span>
			</a>
		</div>

		<nav aria-label="Principal" class="hidden items-center gap-8 lg:flex">
			{#each navItems as item (item.id)}
				<Link href="#{item.id}" current={activeId === item.id}>{item.label}</Link>
			{/each}
		</nav>

		<Button size="sm" class="shrink-0 uppercase" aria-label="Reservar cita" onclick={onbook}>
			<Calendar />
			<span class="hidden sm:inline">Reservar cita</span>
			<span class="sm:hidden">Cita</span>
		</Button>
	</div>

	{#if menuOpen}
		<nav
			id="mobile-menu"
			aria-label="Menú móvil"
			class="border-t border-primary/12 lg:hidden"
			transition:slide={{ duration: reduceMotion.current ? 0 : 200 }}
		>
			<ul class="mx-auto flex max-w-7xl flex-col px-6 py-2">
				{#each navItems as item (item.id)}
					<li>
						<Link
							href="#{item.id}"
							current={activeId === item.id}
							class="w-full py-3"
							onclick={closeMenu}
						>
							{item.label}
						</Link>
					</li>
				{/each}
			</ul>
		</nav>
	{/if}
</header>

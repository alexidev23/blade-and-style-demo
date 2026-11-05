<script lang="ts">
	import { site } from '#lib/data/site.ts';
	import Camera from '@lucide/svelte/icons/camera';
	import MessageCircle from '@lucide/svelte/icons/message-circle';
	import Scissors from '@lucide/svelte/icons/scissors';
	import Video from '@lucide/svelte/icons/video';
	import Link from '../ui/Link.svelte';

	const socialIcons = {
		instagram: Camera,
		youtube: Video,
		whatsapp: MessageCircle
	} as const;

	const legalLinks = [
		{ label: 'Privacidad', href: '#' },
		{ label: 'Términos del servicio', href: '#' },
		{ label: 'Aviso legal', href: '#' }
	];

	const year = new Date().getFullYear();
	const phoneHref = `tel:${site.phone.replace(/\s/g, '')}`;
</script>

<footer class="w-full border-t border-primary/12 bg-canvas-deep text-text">
	<div class="mx-auto max-w-7xl px-6 py-16 lg:px-12">
		<div class="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
			<div class="space-y-4">
				<a
					href="#inicio"
					class="inline-flex items-center gap-3"
					aria-label="{site.name}, ir al inicio"
				>
					<Scissors class="size-7 shrink-0 text-primary" />
					<span class="font-display text-headline-sm tracking-wide text-primary">
						{site.name}
					</span>
				</a>
				<p class="max-w-sm text-sm leading-relaxed text-muted">
					Maestría artesanal en el cuidado personal masculino. Un ritual de distinción, cortesía de
					la vieja escuela y relajación exclusiva en {site.city}.
				</p>
			</div>

			<div>
				<h2 class="mb-3 font-display text-headline-sm text-primary">Horarios de atención</h2>
				<ul class="space-y-2 text-sm text-muted">
					{#each site.hours as entry (entry.days)}
						<li>
							<span class="font-semibold text-text">{entry.days}:</span>
							{entry.hours}
						</li>
					{/each}
				</ul>
			</div>

			<div>
				<h2 class="mb-3 font-display text-headline-sm text-primary">Ubicación</h2>
				<address class="space-y-2 text-sm text-muted not-italic">
					<p class="font-semibold text-text">{site.address.street}</p>
					<p>{site.address.city}, {site.address.province} ({site.address.postalCode})</p>
					<p>
						<a href={phoneHref} class="transition-colors hover:text-primary">Tel: {site.phone}</a>
					</p>
					<p>
						<a href="mailto:{site.email}" class="transition-colors hover:text-primary">
							{site.email}
						</a>
					</p>
				</address>
			</div>

			<div class="space-y-4">
				<h2 class="font-display text-headline-sm text-primary">Comunidad &amp; redes</h2>
				<p class="text-sm leading-relaxed text-muted">
					Seguí nuestras publicaciones de estilo, técnicas clásicas y cortes de autor.
				</p>
				<ul class="flex items-center gap-3">
					{#each site.social as link (link.id)}
						{@const Icon = socialIcons[link.id]}
						<li>
							<!-- eslint-disable svelte/no-navigation-without-resolve -- URLs externas definidas en site.ts -->
							<a
								href={link.href}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={link.label}
								class="grid size-10 place-items-center rounded-sm bg-surface text-primary transition-colors hover:bg-primary hover:text-on-primary"
							>
								<Icon class="size-5" />
							</a>
							<!-- eslint-enable svelte/no-navigation-without-resolve -->
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<div
			class="mt-16 flex flex-col items-center justify-between gap-4 border-t border-primary/12 pt-8 md:flex-row"
		>
			<p class="text-xs text-muted">
				© {year}
				{site.name}. Todos los derechos reservados. Excelencia en barbería tradicional.
			</p>
			<ul class="flex flex-wrap items-center justify-center gap-6">
				{#each legalLinks as link (link.label)}
					<li>
						<Link variant="footer" href={link.href}>{link.label}</Link>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</footer>

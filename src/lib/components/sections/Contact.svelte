<script lang="ts">
	import { site } from '#lib/data/site.ts';
	import Clock from '@lucide/svelte/icons/clock';
	import Mail from '@lucide/svelte/icons/mail';
	import MapPin from '@lucide/svelte/icons/map-pin';
	import Phone from '@lucide/svelte/icons/phone';
	import Button from '../ui/Button.svelte';
	import Card from '../ui/Card.svelte';
	import Section from '../ui/Section.svelte';
	import SectionHeading from '../ui/SectionHeading.svelte';

	const phoneHref = `tel:${site.phone.replace(/\s/g, '')}`;
	const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
		`${site.address.street}, ${site.address.city}, ${site.address.province}, Argentina`
	)}`;
</script>

<Section id="ubicacion" aria-labelledby="ubicacion-title">
	<SectionHeading titleId="ubicacion-title" eyebrow="Visítanos" title="Ubicación & contacto" />

	<div class="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
		<Card padding="lg" class="flex flex-col justify-between gap-8 lg:col-span-5">
			<div class="space-y-8">
				<div class="flex items-start gap-4">
					<div
						class="grid size-10 shrink-0 place-items-center rounded-lg bg-surface-raised text-primary"
					>
						<MapPin class="size-5" aria-hidden="true" />
					</div>
					<div>
						<p class="font-semibold text-text">Dirección</p>
						<p class="mt-0.5 text-sm text-muted">{site.address.street}</p>
						<p class="text-sm text-muted">
							{site.address.city}, {site.address.province} ({site.address.postalCode})
						</p>
					</div>
				</div>

				<div class="flex items-start gap-4">
					<div
						class="grid size-10 shrink-0 place-items-center rounded-lg bg-surface-raised text-primary"
					>
						<Phone class="size-5" aria-hidden="true" />
					</div>
					<div>
						<p class="font-semibold text-text">Teléfono &amp; WhatsApp</p>
						<a
							href={phoneHref}
							class="mt-0.5 block text-sm font-semibold tracking-wide text-primary transition-colors hover:text-champagne"
						>
							{site.phone}
						</a>
						<p class="text-sm text-muted">Atención en horario comercial</p>
					</div>
				</div>

				<div class="flex items-start gap-4">
					<div
						class="grid size-10 shrink-0 place-items-center rounded-lg bg-surface-raised text-primary"
					>
						<Mail class="size-5" aria-hidden="true" />
					</div>
					<div>
						<p class="font-semibold text-text">Correo electrónico</p>
						<a
							href="mailto:{site.email}"
							class="mt-0.5 block text-sm text-muted transition-colors hover:text-primary"
						>
							{site.email}
						</a>
					</div>
				</div>

				<div class="flex items-start gap-4">
					<div
						class="grid size-10 shrink-0 place-items-center rounded-lg bg-surface-raised text-primary"
					>
						<Clock class="size-5" aria-hidden="true" />
					</div>
					<div class="w-full">
						<p class="mb-2 font-semibold text-text">Horario detallado</p>
						<div class="space-y-1.5 text-sm">
							{#each site.hours as entry (entry.days)}
								<div
									class="flex justify-between gap-4 rounded-sm bg-surface-raised/50 px-3 py-1 text-muted"
								>
									<span>{entry.days}</span>
									<span class="font-semibold text-text">{entry.hours}</span>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>

			<Button variant="secondary" href={mapsUrl} class="w-full text-sm uppercase">
				Abrir en Google Maps
			</Button>
		</Card>

		<div
			class="relative min-h-[420px] overflow-hidden rounded-lg border border-primary/12 bg-surface shadow-card lg:col-span-7 lg:min-h-[460px]"
		>
			<svg
				class="absolute inset-0 size-full"
				viewBox="0 0 800 600"
				preserveAspectRatio="xMidYMid slice"
				aria-hidden="true"
			>
				<defs>
					<pattern id="map-grid" width="80" height="80" patternUnits="userSpaceOnUse">
						<path d="M80 0H0V80" fill="none" stroke="#1d2027" stroke-width="1" />
					</pattern>
				</defs>
				<rect width="800" height="600" fill="#131519" />
				<rect width="800" height="600" fill="url(#map-grid)" />
				<circle cx="400" cy="300" r="160" fill="#c89b53" fill-opacity="0.04" />
				<g stroke="#262a33" stroke-width="18" stroke-linecap="round">
					<path d="M-20 150H820" />
					<path d="M-20 340H820" />
					<path d="M-20 500H820" />
					<path d="M170 -20V620" />
					<path d="M420 -20V620" />
					<path d="M650 -20V620" />
				</g>
				<path
					d="M-40 620L500 120L860 40"
					fill="none"
					stroke="#2e323d"
					stroke-width="26"
					stroke-linecap="round"
				/>
				<path
					d="M-40 620L500 120L860 40"
					fill="none"
					stroke="#c89b53"
					stroke-opacity="0.22"
					stroke-width="10"
					stroke-linecap="round"
				/>
			</svg>

			<div
				class="pointer-events-none absolute inset-0 bg-linear-to-t from-canvas/90 via-transparent to-transparent"
			></div>

			<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
				<div
					class="grid size-12 place-items-center rounded-full bg-primary text-on-primary shadow-glow"
				>
					<MapPin class="size-6" aria-hidden="true" />
				</div>
			</div>

			<div
				class="absolute inset-x-6 bottom-6 flex flex-col items-center justify-between gap-4 rounded-lg bg-surface-raised/95 p-6 shadow-card backdrop-blur-md sm:flex-row"
			>
				<div class="flex items-center gap-4 text-center sm:text-left">
					<div
						class="grid size-12 shrink-0 place-items-center rounded-full bg-primary text-on-primary shadow-glow"
					>
						<MapPin class="size-6" aria-hidden="true" />
					</div>
					<div>
						<p class="font-semibold text-text">{site.name}</p>
						<p class="text-sm text-muted">{site.address.street}, {site.address.city}</p>
					</div>
				</div>
				<Button href={mapsUrl} size="sm" class="w-full text-sm uppercase sm:w-auto">
					Cómo llegar
				</Button>
			</div>
		</div>
	</div>
</Section>

<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import Calendar from '@lucide/svelte/icons/calendar';
	import Scissors from '@lucide/svelte/icons/scissors';
	import heroImage from '#lib/assets/hero.jpg';
	import { site } from '#lib/data/site.ts';
	import Badge from '../ui/Badge.svelte';
	import Button from '../ui/Button.svelte';
	import Card from '../ui/Card.svelte';
	import StarRating from '../ui/StarRating.svelte';

	const ratingText = site.rating.toLocaleString('es-AR');
</script>

<section id="inicio" aria-labelledby="hero-title" class="relative w-full overflow-hidden">
	<!-- Halos dorados decorativos: gradientes, no blur, para cuidar el rendimiento -->
	<div
		aria-hidden="true"
		class="pointer-events-none absolute inset-0 bg-[radial-gradient(40rem_30rem_at_0%_0%,rgb(200_155_83/0.12),transparent),radial-gradient(40rem_40rem_at_100%_60%,rgb(200_155_83/0.07),transparent)]"
	></div>

	<div class="relative mx-auto max-w-7xl px-6 pt-12 pb-24 lg:px-12">
		<div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
			<div class="flex flex-col items-start lg:col-span-7 lg:pr-8">
				<Badge variant="neutral" class="mb-6">
					<span aria-hidden="true" class="size-2 rounded-full bg-primary motion-safe:animate-pulse"
					></span>
					{site.hoursSummary}
				</Badge>

				<h1
					id="hero-title"
					class="mb-6 font-display text-display-sm tracking-tight text-text md:text-display"
				>
					El arte del corte clásico &amp; cuidado masculino de élite
				</h1>

				<p class="mb-8 max-w-xl text-lg leading-relaxed text-muted">
					Un espacio exclusivo en el corazón de {site.city}, donde la tradición del afeitado a
					navaja se encuentra con el estilo contemporáneo. Calma, destreza y distinción en cada
					detalle.
				</p>

				<div class="mb-10 flex flex-wrap items-center gap-4">
					<Button href="#reserva" class="uppercase">
						<Calendar />
						Reservar cita online
					</Button>
					<Button href="#servicios" variant="secondary" class="uppercase">
						Explorar servicios
						<ArrowRight />
					</Button>
				</div>

				<Card padding="none" class="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3">
					<StarRating rating={site.rating} />
					<span aria-hidden="true" class="hidden h-4 w-px bg-primary/25 sm:block"></span>
					<p class="flex flex-wrap items-baseline gap-x-1.5">
						<span class="font-bold">{ratingText} / 5</span>
						<span class="text-sm text-muted">
							más de {site.reviewCount} clientes satisfechos
						</span>
					</p>
				</Card>
			</div>

			<div class="relative aspect-4/5 overflow-hidden rounded-lg shadow-card lg:col-span-5">
				<img
					src={heroImage}
					alt="Interior de una barbería clásica con sillón de cuero y luz cálida"
					width="800"
					height="1000"
					fetchpriority="high"
					decoding="async"
					class="size-full object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:hover:scale-105"
				/>
				<div
					aria-hidden="true"
					class="pointer-events-none absolute inset-0 bg-linear-to-t from-canvas via-transparent to-transparent opacity-80"
				></div>

				<div
					class="absolute inset-x-6 bottom-6 flex items-center justify-between gap-4 rounded-lg border border-primary/12 bg-surface-raised/90 p-4 backdrop-blur-md"
				>
					<div class="flex items-center gap-3">
						<div
							class="grid size-10 shrink-0 place-items-center rounded-sm bg-primary/20 text-primary"
						>
							<Scissors class="size-5" />
						</div>
						<div>
							<p class="leading-tight font-semibold">Tradición artesanal</p>
							<p class="text-sm tracking-wider text-muted uppercase">
								Navaja &amp; toalla caliente
							</p>
						</div>
					</div>
					<span class="hidden font-display text-headline-sm tracking-wide text-primary sm:block">
						EST. {site.founded}
					</span>
				</div>
			</div>
		</div>
	</div>
</section>

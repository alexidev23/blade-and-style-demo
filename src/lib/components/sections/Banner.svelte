<script lang="ts">
	import Gift from '@lucide/svelte/icons/gift';
	import Badge from '../ui/Badge.svelte';
	import Button from '../ui/Button.svelte';
	import Section from '../ui/Section.svelte';
</script>

<Section spacing="md" aria-labelledby="promo-title">
	<div
		class="relative overflow-hidden rounded-lg bg-linear-to-r from-surface-raised via-surface to-surface-raised p-8 shadow-card lg:p-12"
	>
		<div
			class="pointer-events-none absolute -right-20 -bottom-20 size-80 rounded-full bg-primary/10 blur-[90px]"
			aria-hidden="true"
		></div>

		<div class="relative flex flex-col items-center justify-between gap-8 lg:flex-row">
			<div class="max-w-2xl text-center lg:text-left">
				<Badge variant="subtle" class="mb-4">
					<Gift aria-hidden="true" />
					Membresía &amp; bienvenida
				</Badge>
				<h2 id="promo-title" class="mb-2 font-display text-headline-md text-text">
					15% de descuento en tu primera visita al reservar online
				</h2>
				<p class="text-sm leading-relaxed text-muted">
					Aplicá el código de cortesía al confirmar tu reserva online o presentalo al llegar a
					recepción para disfrutar de tu tarifa preferencial.
				</p>
			</div>

			<div class="flex shrink-0 flex-col items-center gap-4 sm:flex-row">
				<span
					class="rounded-sm bg-surface-raised px-6 py-3 font-mono text-base font-semibold tracking-widest break-all text-primary uppercase select-all sm:text-lg"
				>
					<span class="sr-only">Código de descuento: </span>
					WELCOMEBARBER
				</span>
				<Button href="#reserva" class="text-sm uppercase">Aplicar y reservar</Button>
			</div>
		</div>
	</div>
</Section>

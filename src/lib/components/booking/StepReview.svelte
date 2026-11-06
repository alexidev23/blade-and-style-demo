<script lang="ts">
	import type { Barber, Service } from '#lib/types.ts';
	import CircleCheckBig from '@lucide/svelte/icons/circle-check-big';
	import { formatBookingDate, formatPrice } from '../../../utils/format';
	import Button from '../ui/Button.svelte';

	interface Props {
		service: Service;
		date: string;
		barber?: Barber;
		timeSlots: string[];
		selectedTime: string;
		isClosed: boolean;
		onSelectTime: (time: string) => void;
		onModify: () => void;
		onContinue: () => void;
	}

	let {
		service,
		date,
		barber,
		timeSlots,
		selectedTime,
		isClosed,
		onSelectTime,
		onModify,
		onContinue
	}: Props = $props();

	let heading = $state<HTMLHeadingElement>();

	$effect(() => {
		heading?.focus();
	});
</script>

<div class="mb-5 grid size-14 place-items-center rounded-full bg-primary/15 text-primary">
	<CircleCheckBig class="size-7" aria-hidden="true" />
</div>
<h3
	bind:this={heading}
	id="booking-modal-title"
	tabindex="-1"
	class="mb-2 font-display text-headline-sm text-text focus:outline-none"
>
	¡Horario disponible!
</h3>
<p class="mb-6 text-sm leading-relaxed text-muted">
	Reservamos provisionalmente tu turno con {barber?.name ?? 'cualquier maestro disponible'}. Elegí
	un horario y completá tus datos para confirmar.
</p>

<div class="mb-6 space-y-2 rounded-sm bg-surface/60 p-4 text-sm">
	<div class="flex justify-between gap-4">
		<span class="text-muted">Servicio</span>
		<span class="text-right font-semibold text-text">{service.name}</span>
	</div>
	<div class="flex justify-between gap-4">
		<span class="text-muted">Fecha</span>
		<span class="text-right font-semibold text-text">{formatBookingDate(date)}</span>
	</div>
	<div class="flex justify-between gap-4">
		<span class="text-muted">Duración</span>
		<span class="text-right font-semibold text-text">{service.durationMin} min</span>
	</div>
	<div class="flex justify-between gap-4">
		<span class="text-muted">Inversión</span>
		<span class="text-right font-display text-headline-sm text-primary">
			{formatPrice(service.price)}
		</span>
	</div>
</div>

{#if isClosed}
	<p class="mb-4 rounded-sm bg-surface p-3 text-sm text-muted">
		Los domingos permanecemos cerrados. Cerrá este modal y elegí otra fecha.
	</p>
{:else}
	<p class="mb-2 text-sm font-semibold tracking-wider text-muted uppercase">Horario</p>
	<div class="mb-6 grid grid-cols-4 gap-2 sm:grid-cols-6">
		{#each timeSlots as time (time)}
			<button
				type="button"
				aria-pressed={selectedTime === time}
				onclick={() => onSelectTime(time)}
				class={[
					'rounded-sm border px-2 py-2 text-sm font-semibold transition-colors',
					selectedTime === time
						? 'border-primary bg-primary text-on-primary'
						: 'border-line-strong bg-surface text-muted hover:border-primary/40 hover:text-text'
				]}
			>
				{time}
			</button>
		{/each}
	</div>
{/if}

<div class="flex gap-3">
	<Button variant="secondary" class="flex-1 text-sm uppercase" onclick={onModify}>Modificar</Button>
	<Button
		class="flex-1 text-sm uppercase"
		disabled={!selectedTime || isClosed}
		onclick={onContinue}
	>
		Continuar
	</Button>
</div>

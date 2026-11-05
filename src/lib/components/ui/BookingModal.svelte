<script lang="ts">
	import { barbers } from '#lib/data/barbers.ts';
	import { services } from '#lib/data/services.ts';
	import { site } from '#lib/data/site.ts';
	import type { BookingDraft } from '#lib/types.ts';
	import { formatBookingDate, formatPrice } from '../../../utils/format';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import CalendarDays from '@lucide/svelte/icons/calendar-days';
	import Check from '@lucide/svelte/icons/check';
	import CircleCheckBig from '@lucide/svelte/icons/circle-check-big';
	import Clock from '@lucide/svelte/icons/clock';
	import Scissors from '@lucide/svelte/icons/scissors';
	import UserRound from '@lucide/svelte/icons/user-round';
	import X from '@lucide/svelte/icons/x';
	import Button from './Button.svelte';

	type Step = 'review' | 'details' | 'done';

	interface Props {
		open: boolean;
		draft: BookingDraft | null;
		onclose: () => void;
	}

	let { open, draft, onclose }: Props = $props();

	const timeSlots = [
		'10:00',
		'11:00',
		'12:00',
		'13:00',
		'14:00',
		'15:00',
		'16:00',
		'17:00',
		'18:00',
		'19:00',
		'20:00'
	];

	let dialog = $state<HTMLDialogElement>();
	let step = $state<Step>('review');
	let selectedTime = $state('');
	let name = $state('');
	let phone = $state('');

	const service = $derived(services.find((item) => item.id === draft?.serviceId));
	const barber = $derived(barbers.find((item) => item.id === draft?.barberId));
	const isClosed = $derived(draft ? new Date(`${draft.date}T00:00:00`).getDay() === 0 : false);
	const firstName = $derived(name.trim().split(/\s+/)[0] ?? '');

	$effect(() => {
		if (!dialog) return;
		if (open && !dialog.open) dialog.showModal();
		else if (!open && dialog.open) dialog.close();
	});

	$effect(() => {
		if (!open) return;
		step = 'review';
		selectedTime = '';
		name = '';
		phone = '';
	});

	function handleConfirm(event: SubmitEvent) {
		event.preventDefault();
		step = 'done';
	}
</script>

<dialog
	bind:this={dialog}
	{onclose}
	onclick={(event) => {
		if (event.target === dialog) onclose();
	}}
	aria-labelledby="booking-modal-title"
	class="m-auto max-h-[90dvh] w-[min(92vw,30rem)] overflow-y-auto rounded-lg border border-primary/12 bg-surface-raised p-0 text-text shadow-card backdrop:bg-canvas-deep/80 backdrop:backdrop-blur-sm"
>
	{#if draft && service}
		<div class="relative p-6 sm:p-8">
			<button
				type="button"
				onclick={onclose}
				aria-label="Cerrar"
				class="absolute top-4 right-4 grid size-9 cursor-pointer place-items-center rounded-sm text-muted transition-colors hover:bg-surface hover:text-text"
			>
				<X class="size-5" aria-hidden="true" />
			</button>

			{#if step === 'review'}
				<div class="mb-5 grid size-14 place-items-center rounded-full bg-primary/15 text-primary">
					<CircleCheckBig class="size-7" aria-hidden="true" />
				</div>
				<h3 id="booking-modal-title" class="mb-2 font-display text-headline-sm text-text">
					¡Horario disponible!
				</h3>
				<p class="mb-6 text-sm leading-relaxed text-muted">
					Reservamos provisionalmente tu turno con {barber?.name ?? 'cualquier maestro disponible'}.
					Elegí un horario y completá tus datos para confirmar.
				</p>

				<div class="mb-6 space-y-2 rounded-sm bg-surface/60 p-4 text-sm">
					<div class="flex justify-between gap-4">
						<span class="text-muted">Servicio</span>
						<span class="text-right font-semibold text-text">{service.name}</span>
					</div>
					<div class="flex justify-between gap-4">
						<span class="text-muted">Fecha</span>
						<span class="text-right font-semibold text-text">{formatBookingDate(draft.date)}</span>
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
								onclick={() => (selectedTime = time)}
								class={[
									'rounded-sm border px-2 py-2 text-sm font-semibold transition-colors',
									selectedTime === time
										? 'border-primary bg-primary text-on-primary'
										: 'border-primary/12 bg-surface text-muted hover:border-primary/40 hover:text-text'
								]}
							>
								{time}
							</button>
						{/each}
					</div>
				{/if}

				<div class="flex gap-3">
					<Button variant="secondary" class="flex-1 text-sm uppercase" onclick={onclose}>
						Modificar
					</Button>
					<Button
						class="flex-1 text-sm uppercase"
						disabled={!selectedTime || isClosed}
						onclick={() => (step = 'details')}
					>
						Continuar
					</Button>
				</div>
			{:else if step === 'details'}
				<h3 id="booking-modal-title" class="mb-2 font-display text-headline-sm text-text">
					Completá tus datos
				</h3>
				<p class="mb-6 text-sm text-muted">
					{formatBookingDate(draft.date)} · {selectedTime} h · {service.name}
				</p>

				<form class="space-y-4" onsubmit={handleConfirm}>
					<div>
						<label
							for="booking-name"
							class="mb-1.5 block text-sm font-semibold tracking-wider text-muted uppercase"
						>
							Nombre y apellido
						</label>
						<input
							id="booking-name"
							name="name"
							bind:value={name}
							required
							autocomplete="name"
							class="h-12 w-full rounded-sm border border-primary/12 bg-surface px-4 text-text transition-colors focus:border-primary"
						/>
					</div>
					<div>
						<label
							for="booking-phone"
							class="mb-1.5 block text-sm font-semibold tracking-wider text-muted uppercase"
						>
							Teléfono / WhatsApp
						</label>
						<input
							id="booking-phone"
							name="phone"
							type="tel"
							bind:value={phone}
							required
							autocomplete="tel"
							placeholder="+54 351 000-0000"
							class="h-12 w-full rounded-sm border border-primary/12 bg-surface px-4 text-text transition-colors focus:border-primary"
						/>
					</div>

					<div class="flex gap-3 pt-2">
						<Button
							variant="secondary"
							class="flex-1 text-sm uppercase"
							onclick={() => (step = 'review')}
						>
							<ArrowLeft />
							Volver
						</Button>
						<Button type="submit" class="flex-1 text-sm uppercase">Confirmar turno</Button>
					</div>
				</form>
			{:else}
				<div class="py-2 text-center">
					<div
						class="mx-auto mb-4 grid size-16 place-items-center rounded-full bg-primary text-on-primary shadow-glow"
					>
						<Check class="size-8" aria-hidden="true" />
					</div>
					<h3 id="booking-modal-title" class="mb-2 font-display text-headline-md text-text">
						Turno confirmado
					</h3>
					<p class="mx-auto mb-6 max-w-sm text-sm leading-relaxed text-muted">
						Gracias, {firstName}. Te esperamos en {site.name}.
					</p>

					<div class="mb-6 space-y-2 rounded-sm bg-surface/60 p-4 text-left text-sm">
						<div class="flex items-center gap-2 text-muted">
							<CalendarDays class="size-4 shrink-0 text-primary" aria-hidden="true" />
							<span>{formatBookingDate(draft.date)}</span>
						</div>
						<div class="flex items-center gap-2 text-muted">
							<Clock class="size-4 shrink-0 text-primary" aria-hidden="true" />
							<span>{selectedTime} h</span>
						</div>
						<div class="flex items-center gap-2 text-muted">
							<Scissors class="size-4 shrink-0 text-primary" aria-hidden="true" />
							<span>{service.name}</span>
						</div>
						<div class="flex items-center gap-2 text-muted">
							<UserRound class="size-4 shrink-0 text-primary" aria-hidden="true" />
							<span>{barber?.name ?? 'Cualquier maestro disponible'}</span>
						</div>
					</div>

					<p class="mb-6 text-sm text-muted">
						Te enviamos la confirmación por WhatsApp al <span class="text-text">{phone}</span>.
					</p>

					<Button class="w-full text-sm uppercase" onclick={onclose}>Listo</Button>
				</div>
			{/if}
		</div>
	{/if}
</dialog>

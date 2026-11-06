<script lang="ts">
	import { barbers } from '#lib/data/barbers.ts';
	import { services } from '#lib/data/services.ts';
	import { site } from '#lib/data/site.ts';
	import type { BookingDraft } from '#lib/types.ts';
	import X from '@lucide/svelte/icons/x';
	import StepDetails from '../booking/StepDetails.svelte';
	import StepReview from '../booking/StepReview.svelte';
	import StepSuccess from '../booking/StepSuccess.svelte';
	import Button from './Button.svelte';

	type Step = 'review' | 'details' | 'done';

	interface Props {
		draft: BookingDraft | null;
		onClose: () => void;
	}

	let { draft, onClose }: Props = $props();

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

	const open = $derived(draft !== null);
	const service = $derived(services.find((item) => item.id === draft?.serviceId));
	const barber = $derived(barbers.find((item) => item.id === draft?.barberId));
	const isClosed = $derived(draft ? new Date(`${draft.date}T00:00:00`).getDay() === 0 : false);
	const firstName = $derived(name.split(' ')[0] ?? '');

	$effect(() => {
		if (!dialog) return;
		if (open && !dialog.open) dialog.showModal();
		else if (!open && dialog.open) dialog.close();
	});

	// El <dialog> nativo atrapa el foco, pero no bloquea el scroll del documento.
	$effect(() => {
		if (!open) return;
		const root = document.documentElement;
		const previous = root.style.overflow;
		root.style.overflow = 'hidden';
		return () => {
			root.style.overflow = previous;
		};
	});

	function handleConfirm(details: { name: string; phone: string }) {
		name = details.name;
		phone = details.phone;
		step = 'done';
	}
</script>

<dialog
	bind:this={dialog}
	oncancel={(event) => {
		event.preventDefault();
		onClose();
	}}
	onclick={(event) => {
		if (event.target === dialog) onClose();
	}}
	aria-labelledby="booking-modal-title"
	class="m-auto max-h-[90dvh] w-[min(92vw,30rem)] overflow-y-auto rounded-lg border border-primary/12 bg-surface-raised p-0 text-text shadow-card backdrop:bg-canvas-deep/80 backdrop:backdrop-blur-sm"
>
	{#if draft && service}
		<div class="relative p-6 sm:p-8">
			<button
				type="button"
				onclick={onClose}
				aria-label="Cerrar"
				class="absolute top-4 right-4 grid size-9 cursor-pointer place-items-center rounded-sm text-muted transition-colors hover:bg-surface hover:text-text"
			>
				<X class="size-5" aria-hidden="true" />
			</button>

			{#if step === 'review'}
				<StepReview
					{service}
					date={draft.date}
					{barber}
					{timeSlots}
					{selectedTime}
					{isClosed}
					onSelectTime={(time) => (selectedTime = time)}
					onModify={onClose}
					onContinue={() => (step = 'details')}
				/>
			{:else if step === 'details'}
				<StepDetails
					date={draft.date}
					serviceName={service.name}
					{selectedTime}
					onBack={() => (step = 'review')}
					onConfirm={handleConfirm}
				/>
			{:else}
				<StepSuccess
					{firstName}
					siteName={site.name}
					date={draft.date}
					{selectedTime}
					serviceName={service.name}
					barberName={barber?.name}
					{phone}
					{onClose}
				/>
			{/if}
		</div>
	{:else}
		<div class="p-6 text-center sm:p-8">
			<h3 id="booking-modal-title" class="mb-2 font-display text-headline-sm text-text">
				No pudimos preparar tu reserva
			</h3>
			<p class="mb-6 text-sm text-muted">Cerrá este mensaje y probá elegir el turno de nuevo.</p>
			<Button class="w-full text-sm uppercase" onclick={onClose}>Cerrar</Button>
		</div>
	{/if}
</dialog>

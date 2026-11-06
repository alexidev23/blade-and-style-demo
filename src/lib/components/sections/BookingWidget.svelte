<script lang="ts">
	import { barbers } from '#lib/data/barbers.ts';
	import { services } from '#lib/data/services.ts';
	import type { BookingDraft } from '#lib/types.ts';
	import CalendarDays from '@lucide/svelte/icons/calendar-days';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import Clock from '@lucide/svelte/icons/clock';
	import Scissors from '@lucide/svelte/icons/scissors';
	import UserRound from '@lucide/svelte/icons/user-round';
	import { onMount } from 'svelte';
	import { getBarbersForService, resolveBookingSelection } from '../../../utils/booking';
	import { todayISO } from '../../../utils/format';
	import Button from '../ui/Button.svelte';
	import Card from '../ui/Card.svelte';
	import Section from '../ui/Section.svelte';

	interface Props {
		onsearch: (draft: BookingDraft) => void;
	}

	let { onsearch }: Props = $props();

	let today = $state('');
	let date = $state('');
	let serviceId = $state(services[0]?.id ?? '');
	let barberId = $state('');

	const barberOptions = $derived(getBarbersForService(serviceId, barbers));

	onMount(() => {
		today = todayISO();
		date = today;
	});

	function handleServiceChange(event: Event) {
		serviceId = (event.currentTarget as HTMLSelectElement).value;
		if (!getBarbersForService(serviceId, barbers).some((barber) => barber.id === barberId)) {
			barberId = '';
		}
	}

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		onsearch({ ...resolveBookingSelection({ serviceId, barberId }, services, barbers), date });
	}
</script>

<Section id="reserva" spacing="md" aria-labelledby="reserva-title">
	<Card padding="lg">
		<div
			class="flex flex-col gap-4 border-b border-primary/12 pb-6 lg:flex-row lg:items-center lg:justify-between"
		>
			<div>
				<p class="text-sm font-semibold tracking-widest text-primary uppercase">
					Citas online express
				</p>
				<h2
					id="reserva-title"
					class="mt-1 font-display text-headline-md text-text md:text-headline-lg"
				>
					Reservá tu turno en segundos
				</h2>
			</div>
			<p class="flex items-center gap-2 text-sm text-muted">
				<Clock class="size-4 shrink-0 text-primary" aria-hidden="true" />
				Confirmación inmediata por SMS / WhatsApp
			</p>
		</div>

		<form
			class="grid grid-cols-1 items-end gap-4 pt-6 md:grid-cols-2 lg:grid-cols-4"
			onsubmit={handleSubmit}
		>
			<div class="flex flex-col gap-1.5">
				<label
					for="booking-date"
					class="flex items-center gap-2 text-sm font-semibold tracking-wider text-muted uppercase"
				>
					<CalendarDays class="size-4 text-primary" aria-hidden="true" />
					Paso 1 · Fecha
				</label>
				<input
					id="booking-date"
					name="date"
					type="date"
					required
					min={today}
					bind:value={date}
					class="h-12 w-full rounded-sm border border-primary/12 bg-surface-raised px-4 text-text transition-colors focus:border-primary"
				/>
			</div>

			<div class="flex flex-col gap-1.5">
				<label
					for="booking-service"
					class="flex items-center gap-2 text-sm font-semibold tracking-wider text-muted uppercase"
				>
					<Scissors class="size-4 text-primary" aria-hidden="true" />
					Paso 2 · Servicio
				</label>
				<div class="relative">
					<select
						id="booking-service"
						name="service"
						required
						value={serviceId}
						onchange={handleServiceChange}
						class="h-12 w-full cursor-pointer appearance-none rounded-sm border border-primary/12 bg-surface-raised pr-10 pl-4 text-text transition-colors focus:border-primary"
					>
						{#each services as service (service.id)}
							<option value={service.id}>
								{service.name} ({service.durationMin} min)
							</option>
						{/each}
					</select>
					<ChevronDown
						class="pointer-events-none absolute top-4 right-3 size-4 text-muted"
						aria-hidden="true"
					/>
				</div>
			</div>

			<div class="flex flex-col gap-1.5">
				<label
					for="booking-barber"
					class="flex items-center gap-2 text-sm font-semibold tracking-wider text-muted uppercase"
				>
					<UserRound class="size-4 text-primary" aria-hidden="true" />
					Paso 3 · Barbero
				</label>
				<div class="relative">
					<select
						id="booking-barber"
						name="barber"
						bind:value={barberId}
						class="h-12 w-full cursor-pointer appearance-none rounded-sm border border-primary/12 bg-surface-raised pr-10 pl-4 text-text transition-colors focus:border-primary"
					>
						<option value="">Cualquier maestro disponible</option>
						{#each barberOptions as barber (barber.id)}
							<option value={barber.id}>{barber.name}</option>
						{/each}
					</select>
					<ChevronDown
						class="pointer-events-none absolute top-4 right-3 size-4 text-muted"
						aria-hidden="true"
					/>
				</div>
			</div>

			<Button type="submit" class="h-12 w-full text-sm uppercase">Ver disponibilidad</Button>
		</form>
	</Card>
</Section>

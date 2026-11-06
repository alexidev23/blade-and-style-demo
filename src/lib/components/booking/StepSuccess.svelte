<script lang="ts">
	import CalendarDays from '@lucide/svelte/icons/calendar-days';
	import Check from '@lucide/svelte/icons/check';
	import Clock from '@lucide/svelte/icons/clock';
	import Scissors from '@lucide/svelte/icons/scissors';
	import UserRound from '@lucide/svelte/icons/user-round';
	import { formatBookingDate } from '../../../utils/format';
	import Button from '../ui/Button.svelte';

	interface Props {
		firstName: string;
		siteName: string;
		date: string;
		selectedTime: string;
		serviceName: string;
		barberName?: string;
		phone: string;
		onClose: () => void;
	}

	let { firstName, siteName, date, selectedTime, serviceName, barberName, phone, onClose }: Props =
		$props();

	let heading = $state<HTMLHeadingElement>();

	$effect(() => {
		heading?.focus();
	});
</script>

<div class="py-2 text-center">
	<div
		class="mx-auto mb-4 grid size-16 place-items-center rounded-full bg-primary text-on-primary shadow-glow"
	>
		<Check class="size-8" aria-hidden="true" />
	</div>
	<h3
		bind:this={heading}
		id="booking-modal-title"
		tabindex="-1"
		class="mb-2 font-display text-headline-md text-text focus:outline-none"
	>
		Turno confirmado
	</h3>
	<p class="mx-auto mb-6 max-w-sm text-sm leading-relaxed text-muted">
		Gracias, {firstName}. Te esperamos en {siteName}.
	</p>

	<div class="mb-6 space-y-2 rounded-sm bg-surface/60 p-4 text-left text-sm">
		<div class="flex items-center gap-2 text-muted">
			<CalendarDays class="size-4 shrink-0 text-primary" aria-hidden="true" />
			<span>{formatBookingDate(date)}</span>
		</div>
		<div class="flex items-center gap-2 text-muted">
			<Clock class="size-4 shrink-0 text-primary" aria-hidden="true" />
			<span>{selectedTime} h</span>
		</div>
		<div class="flex items-center gap-2 text-muted">
			<Scissors class="size-4 shrink-0 text-primary" aria-hidden="true" />
			<span>{serviceName}</span>
		</div>
		<div class="flex items-center gap-2 text-muted">
			<UserRound class="size-4 shrink-0 text-primary" aria-hidden="true" />
			<span>{barberName ?? 'Cualquier maestro disponible'}</span>
		</div>
	</div>

	<p class="mb-6 text-sm text-muted">
		Te enviamos la confirmación por WhatsApp al <span class="text-text">{phone}</span>.
	</p>

	<Button class="w-full text-sm uppercase" onclick={onClose}>Listo</Button>
</div>

<script lang="ts">
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import { formatBookingDate } from '../../../utils/format';
	import Button from '../ui/Button.svelte';

	interface Props {
		date: string;
		serviceName: string;
		selectedTime: string;
		onBack: () => void;
		onConfirm: (details: { name: string; phone: string }) => void;
	}

	let { date, serviceName, selectedTime, onBack, onConfirm }: Props = $props();

	let heading = $state<HTMLHeadingElement>();
	let name = $state('');
	let phone = $state('');

	$effect(() => {
		heading?.focus();
	});

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		onConfirm({ name: name.trim(), phone: phone.trim() });
	}
</script>

<h3
	bind:this={heading}
	id="booking-modal-title"
	tabindex="-1"
	class="mb-2 font-display text-headline-sm text-text focus:outline-none"
>
	Completá tus datos
</h3>
<p class="mb-6 text-sm text-muted">
	{formatBookingDate(date)} · {selectedTime} h · {serviceName}
</p>

<form class="space-y-4" onsubmit={handleSubmit}>
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
		<Button variant="secondary" class="flex-1 text-sm uppercase" onclick={onBack}>
			<ArrowLeft />
			Volver
		</Button>
		<Button type="submit" class="flex-1 text-sm uppercase">Confirmar turno</Button>
	</div>
</form>

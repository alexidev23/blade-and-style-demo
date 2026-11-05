<script lang="ts">
	import type { Testimonial } from '#lib/types.ts';
	import Card from '../ui/Card.svelte';
	import StarRating from '../ui/StarRating.svelte';

	interface Props {
		testimonial: Testimonial;
	}

	let { testimonial }: Props = $props();
</script>

<Card as="article" padding="lg" class="h-full">
	<figure class="flex h-full flex-col justify-between gap-6">
		<div>
			<StarRating rating={testimonial.rating} size="sm" />
			<blockquote class="mt-4 text-sm leading-relaxed text-muted italic">
				“{testimonial.quote}”
			</blockquote>
		</div>

		<figcaption class="flex items-center gap-4 rounded-sm bg-surface-raised/60 p-3">
			<span
				class="grid size-10 shrink-0 place-items-center rounded-full bg-primary/20 text-sm font-bold text-primary"
				aria-hidden="true"
			>
				{testimonial.initials}
			</span>
			<span>
				<span class="block font-semibold text-text">{testimonial.author}</span>
				<span class="block text-xs tracking-wider text-muted uppercase">
					Cliente verificado · {testimonial.location}
				</span>
			</span>
		</figcaption>
	</figure>
</Card>

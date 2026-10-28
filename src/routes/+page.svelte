<script lang="ts">
	import Header from '#lib/components/sections/Header.svelte';
</script>

<Header onbook={() => console.log('abrir modal')} />

<main class="pt-16 lg:pt-20">
	{#each ['inicio', 'servicios', 'barberos', 'estandares', 'ubicacion'] as id (id)}
		<section {id} class="grid h-screen place-items-center border-b border-primary/20 text-3xl">
			{id}
		</section>
	{/each}
</main>

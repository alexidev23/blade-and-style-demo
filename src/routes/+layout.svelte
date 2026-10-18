<script lang="ts">
	import '@fontsource-variable/eb-garamond';
	import '@fontsource-variable/hanken-grotesk';
	import './layout.css';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<svelte:head>
	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
	<link rel="icon" href="/favicon.ico" sizes="48x48" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
	<meta name="theme-color" content="#121316" />
</svelte:head>

{@render children()}

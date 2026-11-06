<script lang="ts">
	import { site } from '#lib/data/site.ts';

	const title = $derived(`${site.name} | ${site.tagline} en ${site.city}`);
	const canonical = $derived(`${site.url}/`);
	const image = $derived(`${site.url}/icon-512.png`);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={site.description} />
	<link rel="canonical" href={canonical} />
	<link rel="manifest" href="/manifest.webmanifest" />

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={site.name} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={site.description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:locale" content="es_AR" />
	<meta property="og:image" content={image} />

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={site.description} />
	<meta name="twitter:image" content={image} />
</svelte:head>

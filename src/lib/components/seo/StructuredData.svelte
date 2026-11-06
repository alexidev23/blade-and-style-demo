<script lang="ts">
	import { site } from '#lib/data/site.ts';

	// Datos de demostración: el JSON-LD refleja exactamente lo visible en la página.
	const schema = {
		'@context': 'https://schema.org',
		'@type': 'HairSalon',
		name: site.name,
		description: site.description,
		url: site.url,
		telephone: site.phone,
		email: site.email,
		priceRange: site.priceRange,
		address: {
			'@type': 'PostalAddress',
			streetAddress: site.address.street,
			addressLocality: site.address.city,
			addressRegion: site.address.province,
			postalCode: site.address.postalCode,
			addressCountry: 'AR'
		},
		openingHours: site.openingHours,
		sameAs: site.social.filter((link) => link.id !== 'whatsapp').map((link) => link.href)
	};

	// Las etiquetas se arman por partes para no cerrar el bloque <script> de Svelte.
	const openTag = '<' + 'script type="application/ld+json">';
	const closeTag = '<' + '/script>';
	const json = JSON.stringify(schema).replace(/</g, '\\u003c');
</script>

<!-- eslint-disable-next-line svelte/no-at-html-tags -- JSON-LD estático, con "<" escapado en json -->
{@html `${openTag}${json}${closeTag}`}

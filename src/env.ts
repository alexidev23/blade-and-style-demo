import { defineEnvVars } from '@sveltejs/kit/env';

/**
 * Variables de entorno del sitio.
 * PUBLIC_SITE_URL permite apuntar canonical, sitemap y robots a otro origen al desplegar.
 * En la demo se usa el origen de Vercel como valor por defecto.
 */
export const variables = defineEnvVars({
	PUBLIC_SITE_URL: {
		public: true,
		description: 'Origen público del sitio, sin barra final.',
		schema: (value: string | undefined) =>
			value && value.trim()
				? value.trim().replace(/\/+$/, '')
				: 'https://blade-and-style-demo.vercel.app'
	}
});

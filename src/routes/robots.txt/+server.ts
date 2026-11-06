import { siteUrl } from '#lib/data/site.ts';

export const prerender = true;

export function GET() {
	const body = [
		'# Demo: se permite el rastreo completo del sitio.',
		'User-agent: *',
		'Allow: /',
		'',
		`Sitemap: ${siteUrl}/sitemap.xml`,
		''
	].join('\n');

	return new Response(body, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' }
	});
}

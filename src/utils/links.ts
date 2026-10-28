export const isExternal = (href?: string | null) => !!href && /^https?:\/\//.test(href);

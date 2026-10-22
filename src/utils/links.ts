export const isExternal = (href?: string) => !!href && /^https?:\/\//.test(href);

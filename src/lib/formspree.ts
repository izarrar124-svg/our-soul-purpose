export function getFormspreeEndpoint(): string | null {
  const id = process.env.NEXT_PUBLIC_FORMSPREE_ID?.trim();
  return id ? `https://formspree.io/f/${id}` : null;
}

export function isFormConfigured(): boolean {
  return getFormspreeEndpoint() !== null;
}

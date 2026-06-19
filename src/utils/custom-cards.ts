interface RegisterCardParams {
  type: string;
  name: string;
  description: string;
}

export function registerCustomCard(params: RegisterCardParams): void {
  const windowWithCards = window as Window & { customCards?: unknown[] };
  windowWithCards.customCards = windowWithCards.customCards || [];
  windowWithCards.customCards.push({
    ...params,
    preview: true,
  });
}

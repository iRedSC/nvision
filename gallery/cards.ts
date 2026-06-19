import type { LovelaceCardConfig } from "../src/types";
import type { HomeAssistant } from "../src/types";

interface RegisteredCard {
  type: string;
  name: string;
  description: string;
}

export interface GalleryCard {
  type: string;
  name: string;
  description: string;
  config: LovelaceCardConfig;
}

export function getRegisteredCards(): RegisteredCard[] {
  const windowWithCards = window as Window & {
    customCards?: RegisteredCard[];
  };
  return windowWithCards.customCards ?? [];
}

export function buildGalleryCards(hass: HomeAssistant): GalleryCard[] {
  const ids = Object.keys(hass.states);
  const fallback = ids;

  return getRegisteredCards().map((card) => {
    const element = customElements.get(card.type) as {
      getStubConfig?: (
        hass: HomeAssistant,
        entities: string[],
        entitiesFallback: string[]
      ) => LovelaceCardConfig;
    } | null;

    const config = element?.getStubConfig
      ? element.getStubConfig(hass, ids, fallback)
      : {
          type: `custom:${card.type}`,
          entity: ids[0],
        };

    return {
      type: card.type,
      name: card.name,
      description: card.description,
      config,
    };
  });
}

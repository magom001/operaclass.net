import type { Schema, Attribute } from '@strapi/strapi';

export interface PianistYouTubeLink extends Schema.Component {
  collectionName: 'components_pianist_you_tube_links';
  info: {
    displayName: 'YouTubeLink';
    icon: 'play';
  };
  attributes: {
    url: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'pianist.you-tube-link': PianistYouTubeLink;
    }
  }
}

import type { Schema, Attribute } from '@strapi/strapi';

export interface PianistContactInfo extends Schema.Component {
  collectionName: 'components_pianist_contact_infos';
  info: {
    displayName: 'ContactInfo';
    icon: 'phone';
    description: '';
  };
  attributes: {
    type: Attribute.Enumeration<
      [
        'telegram',
        'whatsapp',
        'phone',
        'email',
        'facebook',
        'instagram',
        'vk',
        'url',
        'linkedin'
      ]
    > &
      Attribute.Required;
    data: Attribute.String & Attribute.Required;
  };
}

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
      'pianist.contact-info': PianistContactInfo;
      'pianist.you-tube-link': PianistYouTubeLink;
    }
  }
}

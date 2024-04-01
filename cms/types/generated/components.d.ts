import type { Schema, Attribute } from '@strapi/strapi';

export interface GenericBio extends Schema.Component {
  collectionName: 'components_generic_bios';
  info: {
    displayName: 'Bio';
  };
  attributes: {
    content: Attribute.Blocks & Attribute.Required;
  };
}

export interface GenericBlogContent extends Schema.Component {
  collectionName: 'components_generic_blog_contents';
  info: {
    displayName: 'BlogContent';
  };
  attributes: {
    text: Attribute.Blocks & Attribute.Required;
  };
}

export interface GenericGallery extends Schema.Component {
  collectionName: 'components_generic_galleries';
  info: {
    displayName: 'Gallery';
    description: '';
  };
  attributes: {
    images: Attribute.Media;
  };
}

export interface GenericImageUrl extends Schema.Component {
  collectionName: 'components_generic_image_urls';
  info: {
    displayName: 'ImageUrl';
    description: '';
  };
  attributes: {
    images: Attribute.Media;
  };
}

export interface GenericVideoGallery extends Schema.Component {
  collectionName: 'components_generic_video_galleries';
  info: {
    displayName: 'VideoGallery';
    icon: 'slideshow';
    description: '';
  };
  attributes: {
    videos: Attribute.Component<'pianist.you-tube-link', true>;
  };
}

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

export interface PianistRecommendation extends Schema.Component {
  collectionName: 'components_pianist_recommendations';
  info: {
    displayName: 'Recommendation';
    icon: 'manyToMany';
  };
  attributes: {
    name: Attribute.String;
    profileLink: Attribute.String;
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
      'generic.bio': GenericBio;
      'generic.blog-content': GenericBlogContent;
      'generic.gallery': GenericGallery;
      'generic.image-url': GenericImageUrl;
      'generic.video-gallery': GenericVideoGallery;
      'pianist.contact-info': PianistContactInfo;
      'pianist.recommendation': PianistRecommendation;
      'pianist.you-tube-link': PianistYouTubeLink;
    }
  }
}

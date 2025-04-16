import { MetadataRoute } from 'next';
import { headers } from 'next/headers';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await  headers();
  const host = headersList.get('host'); // Read the host header

  console.log('Host:', host); // Log the host for debugging
  // Allow indexing only if the host is 'operaclass.net'
  if (host === 'operaclass.net' || host === 'www.operaclass.net') {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
      },
      sitemap: `https://${host}/sitemap.xml`, // Optional: Point to your sitemap
    };
  } else {
    // Disallow indexing for all other hosts (like the default Azure ones)
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }
}

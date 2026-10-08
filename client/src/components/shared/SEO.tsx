import React, { useEffect } from 'react';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  structuredData?: Record<string, any>;
}

export const SEO: React.FC<SEOProps> = ({
  title = 'ZANSTA — Next-Gen Creative Agency & Engineering Engine',
  description = 'ZANSTA engineers enterprise web platforms, generative AI agent systems, high-speed full-stack apps, and ultra-fluid digital experiences for market leaders.',
  keywords = 'ZANSTA, software agency, web development, generative AI tools, MERN stack, Next.js, full stack developer, AI agents, high performance web apps, Bhilai, India',
  canonicalUrl = window.location.href,
  ogImage = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
  ogType = 'website',
  structuredData,
}) => {
  const fullTitle = title.includes('ZANSTA') ? title : `${title} | ZANSTA Engineering Agency`;

  useEffect(() => {
    // 1. Update Title
    document.title = fullTitle;

    // Helper to set or update meta tag
    const setMetaTag = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', keywords);
    setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMetaTag('name', 'author', 'MD Zaved Akhtar & ZANSTA Core Team');

    // 3. OpenGraph Tags (Facebook, LinkedIn, Discord, Slack)
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:image', ogImage);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:site_name', 'ZANSTA Platform');
    setMetaTag('property', 'og:locale', 'en_US');

    // 4. Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage);

    // 5. Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 6. JSON-LD Structured Data for Google Rich Snippets
    const jsonLdId = 'zansta-structured-data';
    let scriptEl = document.getElementById(jsonLdId) as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = jsonLdId;
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }

    const defaultJsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': 'https://zansta.dev/#organization',
          name: 'ZANSTA',
          url: 'https://zansta.dev',
          logo: 'https://zansta.dev/favicon.svg',
          description: 'Next-Gen Creative Agency & Software Engineering Engine',
          email: 'zanstacom@gmail.com',
          telephone: '+91-6202888431',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Kohka',
            addressLocality: 'Bhilai',
            addressRegion: 'Chhattisgarh',
            postalCode: '490023',
            addressCountry: 'IN',
          },
          founder: {
            '@type': 'Person',
            name: 'MD Zaved Akhtar',
            jobTitle: 'Founder & Full-Stack / AI Engineer',
            sameAs: [
              'https://github.com/mdzavedakhtar',
              'https://www.linkedin.com/in/md-zaved-akhtar-22013828b',
            ],
          },
          sameAs: [
            'https://github.com/mdzavedakhtar/ZANSTA',
            'https://www.linkedin.com/in/md-zaved-akhtar-22013828b',
          ],
        },
        {
          '@type': 'WebSite',
          '@id': 'https://zansta.dev/#website',
          url: 'https://zansta.dev',
          name: 'ZANSTA — Engineering Agency',
          publisher: { '@id': 'https://zansta.dev/#organization' },
        },
        structuredData ? structuredData : {},
      ],
    };

    scriptEl.textContent = JSON.stringify(defaultJsonLd);
  }, [fullTitle, description, keywords, canonicalUrl, ogImage, ogType, structuredData]);

  return null;
};

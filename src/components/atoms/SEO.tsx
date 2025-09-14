import Head from 'next/head';
import { PERSONAL_INFO } from '@/constants/personal';
import { SEOProps } from '@/types';

interface SEOComponentProps extends SEOProps {
  children?: React.ReactNode;
}

const SEO: React.FC<SEOComponentProps> = ({
  title,
  description,
  keywords = [],
  ogImage,
  canonicalUrl,
  children,
}) => {
  const siteTitle = title 
    ? `${title} | ${PERSONAL_INFO.name}` 
    : `${PERSONAL_INFO.name} - ${PERSONAL_INFO.title}`;
  
  const siteDescription = description || PERSONAL_INFO.bio;
  
  const defaultKeywords = [
    'frontend developer',
    'react developer',
    'next.js developer',
    'typescript developer',
    'web developer',
    'mobile developer',
    'react native developer',
    'javascript developer',
    'portfolio',
    PERSONAL_INFO.name.toLowerCase(),
  ];
  
  const allKeywords = [...defaultKeywords, ...keywords].join(', ');
  
  const defaultOgImage = '/images/og-image.jpg';
  const imageUrl = ogImage || defaultOgImage;
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PERSONAL_INFO.name,
    jobTitle: PERSONAL_INFO.title,
    description: PERSONAL_INFO.bio,
    email: PERSONAL_INFO.email,
    telephone: PERSONAL_INFO.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: PERSONAL_INFO.location,
      addressCountry: 'IN',
    },
    sameAs: [
      PERSONAL_INFO.github,
      PERSONAL_INFO.linkedin,
    ],
    url: PERSONAL_INFO.portfolio,
    image: imageUrl,
    alumniOf: {
      '@type': 'Organization',
      name: 'Engineering College',
    },
    worksFor: [
      {
        '@type': 'Organization',
        name: 'Play Games24x7',
      },
    ],
    knowsAbout: [
      'React.js',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'React Native',
      'Frontend Development',
      'Web Development',
      'Mobile Development',
    ],
  };

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={allKeywords} />
      <meta name="author" content={PERSONAL_INFO.name} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={canonicalUrl || PERSONAL_INFO.portfolio} />
      <meta property="og:site_name" content={`${PERSONAL_INFO.name} Portfolio`} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:creator" content="@akash_gupta" />
      
      {/* Favicon and Icons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Theme Color */}
      <meta name="theme-color" content="#2563eb" />
      <meta name="msapplication-TileColor" content="#2563eb" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Additional Meta Tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      
      {children}
    </Head>
  );
};

export default SEO;

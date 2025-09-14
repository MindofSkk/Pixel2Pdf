import React from "react";
import { Helmet } from "react-helmet-async";

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  url?: string;
  ogImage?: string;
  twitterImage?: string;
  faqSchema?: object;      // New: FAQ schema
  ratingSchema?: object;   // New: Rating schema
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  url,
  ogImage,
  twitterImage,
  faqSchema,
  ratingSchema,
}) => {
  return (
    <Helmet>
      {/* Basic Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content="index, follow" />
      {url && <link rel="canonical" href={url} />}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {url && <meta property="og:url" content={url} />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Pixel2PDF" />
      {ogImage && <meta property="og:image" content={ogImage} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {twitterImage && <meta name="twitter:image" content={twitterImage} />}

      {/* Structured Data */}
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
      {ratingSchema && (
        <script type="application/ld+json">
          {JSON.stringify(ratingSchema)}
        </script>
      )}
    </Helmet>
  );
};

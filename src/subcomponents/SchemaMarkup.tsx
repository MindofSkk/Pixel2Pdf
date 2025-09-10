import React from "react";

interface SchemaProps {
  name: string;
  description: string;
  ratingValue: string;
  reviewCount: string;
}

const SchemaMarkup: React.FC<SchemaProps> = ({
  name,
  description,
  ratingValue,
  reviewCount,
}) => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": name,
    "operatingSystem": "Any",
    "applicationCategory": "UtilityApplication",
    "description": description,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": ratingValue,
      "reviewCount": reviewCount,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};

export default SchemaMarkup;

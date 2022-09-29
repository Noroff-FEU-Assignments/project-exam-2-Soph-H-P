import React from 'react';
import { Helmet } from 'react-helmet';

/**
 * MetaData uses react-helmet to create metadata for the page
 * including the title and metaDescription
 * @param {Object} props
 * @param {string} props.title the title for the page
 * @param {string} props.metaDescription the description for the metadata
 * @example <MetaData title="Home | Birds of Østfold" metaDescription="Please enjoy looking at all the recent sightings"/>
 * @returns {React.ReactElement}
 */

const MetaData = ({
  title,
  metaDescription,
}: {
  title: string;
  metaDescription: string;
}): React.ReactElement => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <link rel="canonical" href="http://soph-web-dev.eu/bird-finder" />
      <meta name="description" content={metaDescription} />
    </Helmet>
  );
};

export default MetaData;


import { Helmet } from 'react-helmet';


/**
 * MetaData uses react-helmet to create metadata for the page
 * including the title and metaDescription
 * @param {string} title the title for the page
 * @property {string} metaDescription the description for the metadata
 * @returns {any}
 */


const MetaData = ({title, metaDescription}: {title: string, metaDescription: string}): React.ReactElement => {
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

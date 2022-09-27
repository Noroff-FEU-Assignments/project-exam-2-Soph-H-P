
import { Helmet } from 'react-helmet';

const MetaData = ({title, description}: {title: string, description: string}) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <link rel="canonical" href="http://soph-web-dev.eu/bird-finder" />
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default MetaData;

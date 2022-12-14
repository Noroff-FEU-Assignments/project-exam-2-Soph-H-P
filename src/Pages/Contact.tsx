import MetaData from '../components/common/MetaData';
import ContactForm from '../components/forms/ContactForm';
import { PageContainer } from '../components/layout/PageContainer/index.styled';

/**
 * Main page component for the Contact page
 * @example <Contact />
 * @returns {React.ReactElement}
 */

const Contact = (): React.ReactElement => {
  return (
    <PageContainer $containsForm={true} $hasBird={true}>
      <MetaData
        title="Contact | Birds of Østfold"
        metaDescription="Send us a message and we will get back to you as soon as possible"
      />
      <ContactForm />
    </PageContainer>
  );
};

export default Contact;

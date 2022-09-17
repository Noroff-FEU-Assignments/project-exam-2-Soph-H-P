import React from 'react'
import ContactForm from '../components/forms/ContactForm'
import { PageContainer } from '../components/layout/PageContainer/index.styled'

const Contact = () => {
  return (
    <PageContainer $containsForm={true} $hasBird={true}>
      <ContactForm />
    </PageContainer>
  )
}

export default Contact
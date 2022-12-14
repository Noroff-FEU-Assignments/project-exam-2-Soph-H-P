import { Button, Form, Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

import useSubmitContactForm from '../../../hooks/useSubmitContactForm';
import PageTitle from '../../typography/PageTitle';
import FormMessage from '../FormMessage';
import { StyledForm } from '../StyledForm/index.styled';

/**
 * The Contact form uses antd forms to take user information and send it to the admin email
 * uses useSubmitContactForm to send the s
 *
 * @example <ContectForm />
 * @returns {React.ReactElement}
 */

const ContectForm = (): React.ReactElement => {
  const [form] = Form.useForm();

  const { messageIsSent, formError, isSending, submitForm } = useSubmitContactForm(form);

  return (
    <StyledForm form={form} initialValues={{ remember: true }} onFinish={submitForm}>
      <PageTitle>Contact</PageTitle>
      <label htmlFor="full-name">Name</label>
      <Form.Item
        name="full-name"
        rules={[{ required: true, message: 'Please write your name' }]}
      >
        <Input placeholder="Newt Scamander" />
      </Form.Item>
      <label htmlFor="email">Email</label>
      <Form.Item
        name="email"
        rules={[
          {
            type: 'email',
            message: 'This is not valid E-mail!',
          },
          { required: true, message: 'Please input your email' },
        ]}
      >
        <Input placeholder="example@gmail.com" />
      </Form.Item>
      <label htmlFor="subject">Subject</label>
      <Form.Item
        name="subject"
        rules={[{ required: true, message: 'Please add a subject' }]}
      >
        <Input placeholder="Where can I find..." />
      </Form.Item>
      <label htmlFor="message">Message</label>
      <Form.Item
        name="message"
        rules={[{ required: true, message: 'Please write something to us' }]}
      >
        <TextArea rows={4} placeholder="Message character limit 250" maxLength={250} />
      </Form.Item>

      {formError && <FormMessage error={true}>{formError}</FormMessage>}
      {messageIsSent && (
        <FormMessage>
          Your message has been sent. Please expect a reply in 2 - 3 working days.
        </FormMessage>
      )}
      <Form.Item>
        <Button type="primary" htmlType="submit" size="large">
          {isSending ? 'Sending...' : 'Send'}
        </Button>
      </Form.Item>
    </StyledForm>
  );
};

export default ContectForm;

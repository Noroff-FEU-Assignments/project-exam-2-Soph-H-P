import { StyledForm } from '../StyledForm/index.styled';
import { Button, DatePicker, Form, Input } from 'antd';
import { RangePickerProps } from 'antd/lib/date-picker';
import moment from 'moment';
import FormMessage from '../FormMessage';
import useSubmitEvent from '../../../hooks/useSubmitEvent';

const EventsForm = () => {
  const [form] = Form.useForm();
  const { formError, formIsSubmitted, isSubmitting, submitForm } = useSubmitEvent(form);

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Prevents user from selecting a past day
    return current && current < moment().startOf('day');
  };

  return (
    <StyledForm
      form={form}
      initialValues={{ remember: true }}
      onFinish={(data) => submitForm(data)}
      $isEventsForm={true}
    >
      <h1>Add a new event</h1>
      <label htmlFor="eventTitle">What is the event?</label>
      <Form.Item
        name="eventTitle"
        rules={[{ required: true, message: 'Please give the event a title' }]}
      >
        <Input placeholder="Bird ringing" />
      </Form.Item>
      <label htmlFor="date">When is the event?</label>
      <Form.Item name="date" rules={[{ required: true, message: 'Please add the date' }]}>
        <DatePicker
          format={'dddd Do MM YYYY - HH:mm'}
          showTime
          disabledDate={disabledDate}
        />
      </Form.Item>
      <label htmlFor="location">Where is the event?</label>
      <Form.Item name="location" rules={[{ required: true, message: 'Please add the location' }]}>
        <Input placeholder="Meet outside the townhall, Fredrikstad" />
      </Form.Item>
      <label htmlFor="participants">Who can join this event?</label>
      <Form.Item
        name="participants"
        rules={[{ required: true, message: 'Please let everyone know who can come to this event' }]}
      >
        <Input placeholder="Everyone welcome" />
      </Form.Item>

      <Button loading={isSubmitting} type="primary" htmlType="submit" className="login-form-button">
        {isSubmitting ? 'Submitting' : 'Submit'}
      </Button>
      {formError && <FormMessage error={true}>{formError}</FormMessage>}
      {formIsSubmitted && <FormMessage>Event has been added</FormMessage>}
    </StyledForm>
  );
};

export default EventsForm;

import { StyledForm } from '../StyledForm/index.styled';
import { Button, DatePicker, Form, Input, message, Popconfirm } from 'antd';
import { RangePickerProps } from 'antd/lib/date-picker';
import moment from 'moment';
import FormMessage from '../FormMessage';
import theme from '../../../styles/theme';
import useSubmitEvent from '../../../hooks/useSubmitEvent';
import { EventInterface } from '../../../hooks/useEvents';

const EditEventsForm = ({ currentEvent }: { currentEvent: EventInterface }) => {
  const [form] = Form.useForm();
  const { formError, formIsSubmitted, isSubmitting, submitUpdateForm, deleteEvent, isDeleting } =
    useSubmitEvent(form);


  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Prevents user from selecting a past day
    return current && current < moment().endOf('day');
  };

  const text = 'Are you sure you want to delete this sighting?';

  const confirm = () => {
    message.info('Sighting deleted');
    deleteEvent(currentEvent.id);
  };

  return (
    <StyledForm
      form={form}
      onFinish={(data) => submitUpdateForm(data, currentEvent.id)}
      style={{ width: '100%', background: theme.colors.primaryHighlightColor }}
    >
      <h1>Edit this event</h1>
      <label htmlFor="eventTitle">What is the event?</label>
      <Form.Item
        name="eventTitle"
        rules={[{ required: true, message: 'Please give the event a title' }]}
        initialValue={currentEvent.attributes.eventTitle}
      >
        <Input placeholder="Bird ringing" />
      </Form.Item>
      <label htmlFor="date">When is the event?</label>
      <Form.Item
        initialValue={moment(currentEvent.attributes.date)}
        name="date"
        rules={[{ required: true, message: 'Please add the date' }]}
      >
        <DatePicker
        format={'dddd Do MM YYYY - HH:mm'} 
          defaultValue={moment(currentEvent.attributes.date)}
          showTime
          disabledDate={disabledDate}
        />
      </Form.Item>
      <label htmlFor="location">Where is the event?</label>
      <Form.Item
        initialValue={currentEvent.attributes.location}
        name="location"
        rules={[{ required: true, message: 'Please add the location' }]}
      >
        <Input placeholder="Meet outside the townhall, Fredrikstad" />
      </Form.Item>
      <label htmlFor="participants">Who can join this event?</label>
      <Form.Item
        initialValue={currentEvent.attributes.participants}
        name="participants"
        rules={[{ required: true, message: 'Please let everyone know who can come to this event' }]}
      >
        <Input placeholder="Everyone welcome" />
      </Form.Item>

      <Button loading={isSubmitting} type="primary" htmlType="submit" size="large">
        {isSubmitting ? 'Saving' : 'Save changes'}
      </Button>
      <Popconfirm placement="top" title={text} onConfirm={confirm} okText="Delete now" cancelText="Cancel">
      <Button
        loading={isDeleting}
        type="ghost"
        danger={true}
      >
        {isDeleting ? 'Deleting' : 'Delete'}
      </Button>
      </Popconfirm>
      {formError && <FormMessage error={true}>{formError}</FormMessage>}
      {formIsSubmitted && <FormMessage>{formIsSubmitted}</FormMessage>}
    </StyledForm>
  );
};

export default EditEventsForm;

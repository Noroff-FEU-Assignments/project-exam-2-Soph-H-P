import { StyledForm } from '../StyledForm/index.styled';
import { Button, DatePicker, Form, Input, message, Popconfirm } from 'antd';
import { RangePickerProps } from 'antd/lib/date-picker';
import type { Moment } from 'moment';
import moment from 'moment';
import FormMessage from '../FormMessage';
import theme from '../../../styles/theme';
import useSubmitEvent from '../../../hooks/useSubmitEvent';
import { EventInterface } from '../../../hooks/useEvents';
import { Dispatch } from 'react';

/**
 * The Edit events form takes an event as a prop which is used to populate the form
 * with the current sighting information which can then be edited and then saved
 * using the useSubmitEvent hook
 *
 *@param {Object} props
 *@param {EventInterface} props.currentEvent
 *
 * @example <EditEventsForm currentEvent={currentEvent} />
 * @returns {React.ReactElement}
 *
 */

interface EventData {
  eventTitle: string;
  date: string;
  location: string;
  participants: string;
}

const EditEventsForm = ({
  currentEvent,
  setVisibleEvents,
}: {
  currentEvent: EventInterface;
  setVisibleEvents: Dispatch<React.SetStateAction<EventInterface[] | null | undefined>>;
}): React.ReactElement => {
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
    setVisibleEvents((events) => {
      return events?.filter((event) => event.id !== currentEvent.id) || null;
    });
  };

  const handleFinish = (data: EventData) => {
    submitUpdateForm(data, currentEvent.id)
    setVisibleEvents((events) => {
      const updatedEvents = events?.map((event) => {
        if (event.id === currentEvent.id) {
          return {
            ...event,
            attributes: {
              ...event.attributes,
              eventTitle: data.eventTitle,
              location: data.location,
              participants: data.participants,
              date: data.date,
            },
          };
        } else {
          return event;
        }
      });
      return updatedEvents;
    });
  };

  return (
    <StyledForm
      form={form}
      onFinish={(data: any) => {
        handleFinish(data);
      }}
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
      <Popconfirm
        placement="top"
        title={text}
        onConfirm={confirm}
        okText="Delete now"
        cancelText="Cancel"
      >
        <Button loading={isDeleting} type="ghost" danger={true}>
          {isDeleting ? 'Deleting' : 'Delete'}
        </Button>
      </Popconfirm>
      {formError && <FormMessage error={true}>{formError}</FormMessage>}
      {formIsSubmitted && <FormMessage>{formIsSubmitted}</FormMessage>}
    </StyledForm>
  );
};

export default EditEventsForm;

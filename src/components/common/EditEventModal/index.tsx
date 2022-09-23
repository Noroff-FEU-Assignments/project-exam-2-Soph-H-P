import moment from 'moment';
import { EventInterface } from '../../../hooks/useEvents';
import EditEventsForm from '../../forms/EditEventsForm';
import { StyledModal } from './index.styled';

const EditEventModal = ({
  isOpen,
  handleCancel,
  currentEvent,
}: {
  isOpen: boolean;
  handleCancel: () => void;
  currentEvent?: EventInterface | null;
}) => {
  const date = moment(currentEvent?.attributes.date).format('dddd Do MMM YYYY');
  return (
    <StyledModal visible={isOpen} title={null} footer={null} onCancel={handleCancel}>
      {currentEvent && (
        <EditEventsForm currentEvent={currentEvent} />
      )}
    </StyledModal>
  );
};

export default EditEventModal;

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
  return (
    <StyledModal visible={isOpen} title={null} footer={null} onCancel={handleCancel}>
      {currentEvent && <EditEventsForm currentEvent={currentEvent} />}
    </StyledModal>
  );
};

export default EditEventModal;

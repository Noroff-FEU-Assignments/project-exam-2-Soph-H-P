import { Dispatch, SetStateAction } from 'react';
import { EventInterface } from '../../../hooks/useEvents';
import EditEventsForm from '../../forms/EditEventsForm';
import { StyledModal } from './index.styled';

/**
 * Creates a modal that opens and closes
 *
 * @param {Object} props
 * @param {boolean} props.isOpen
 * @param {() => void} props.handleCancel
 * @param {EventInterface | null} props.currentEvent
 * @example <EditEventModal isOpen={isOpen} handleCancel={handleCancel}/>
 * returns an event modal with edit form
 * @returns {React.ReactElement}
 */

const EditEventModal = ({
  isOpen,
  setIsOpen,
  handleCancel,
  currentEvent,
  setVisibleEvents,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
  handleCancel: () => void;
  setVisibleEvents: Dispatch<React.SetStateAction<EventInterface[] | null | undefined>>;
  currentEvent?: EventInterface | null;
}): React.ReactElement => {
  return (
    <StyledModal visible={isOpen} title={null} footer={null} onCancel={handleCancel}>
      {currentEvent && (
        <EditEventsForm
          currentEvent={currentEvent}
          setVisibleEvents={setVisibleEvents}
          setIsOpen={setIsOpen}
        />
      )}
    </StyledModal>
  );
};

export default EditEventModal;

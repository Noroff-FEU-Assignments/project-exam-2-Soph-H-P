import moment from 'moment';

import { EventInterface } from '../../../hooks/useEvents';
import { StyledModal } from './index.styled';

/**
 * Creates a modal that opens and closes
 *
 * @param {Object} props
 * @param {boolean} props.isOpen
 * @param {() => void} props.handleCancel
 * @param {EventInterface | null} props.currentEvent
 * @example <EventModal isOpen={isOpen} handleCancel={handleCancel}/>
 * returns an event modal with the event details
 * @returns {React.ReactElement}
 */

const EventModal = ({
  isOpen,
  handleCancel,
  currentEvent,
}: {
  isOpen: boolean;
  handleCancel: () => void;
  currentEvent?: EventInterface | null;
}): React.ReactElement => {
  const date = moment(currentEvent?.attributes.date).format('dddd Do MMM YYYY');
  return (
    <StyledModal visible={isOpen} title={null} footer={null} onCancel={handleCancel}>
      {currentEvent && (
        <>
          <h1>{currentEvent.attributes.eventTitle}</h1>
          <p>
            <span>When: </span>
            {date}
          </p>
          <p>
            <span>Where: </span>
            {currentEvent.attributes.location}
          </p>
          <p>
            <span>Who: </span>
            {currentEvent.attributes.participants}
          </p>
        </>
      )}
    </StyledModal>
  );
};

export default EventModal;

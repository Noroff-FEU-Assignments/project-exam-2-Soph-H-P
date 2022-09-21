import moment from 'moment';
import { EventInterface } from '../../../hooks/useEvents';
import theme from '../../../styles/theme';
import { StyledModal } from './index.styled';

const EventModal = ({
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
    <StyledModal
      visible={isOpen}
      title={null}
      footer={null}
      onCancel={handleCancel}
      maskStyle={{ backgroundColor: theme.colors.darkFontColor, opacity: 0.03 }}
    >
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

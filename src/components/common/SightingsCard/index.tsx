import useNearestLocation from '../../../hooks/useNearestLocation';
import { SightingInterface } from '../../../hooks/useSightings';
import StatusIcon from '../StatusIcon';
import { ImageWrapper, StyledCardContainer } from './index.styled';

const SightingsCard = ({ sighting }: { sighting: SightingInterface }) => {
  const imageSrc = sighting.attributes.photos.data[0].attributes.url;
  const species = sighting.attributes.species;
  const when = sighting.attributes.date;
  const lat = sighting.attributes.lat;
  const lng = sighting.attributes.lng;
  const who = sighting.attributes.username;
  const status = sighting.attributes.userStatus;


  const getWhenSightedValue = (when: string) => {
    const whenAsDate = new Date(when);
    const timeNow = new Date();
    const whenAsTime = whenAsDate.getTime();
    const nowAsTime = timeNow.getTime();
    //find hours difference
    const difference = parseInt(((nowAsTime - whenAsTime) / 1000 / 60 / 60).toFixed(0));

    if (difference <= 0) {
      return 'Just now';
    } else if (difference <= 24) {
      return `${difference} hours ago`;
    } else {
      const differenceDays = (difference / 24).toFixed(0);
      return `${differenceDays} days ago`;
    }
  };

  const { location } = useNearestLocation(lat, lng);

  return (
    <StyledCardContainer>
      <ImageWrapper $height={200}>
        <img src={imageSrc} alt={species} />
      </ImageWrapper>
      <h2>{species}</h2>
      <p>
        <span>Sighted: </span>
        {getWhenSightedValue(when)}
      </p>
      <p>
        <span>Where: </span>
        {location}
      </p>
      <p>
        <span>Sighted by: </span>
        {who}
        <StatusIcon status={status} />
      </p>
    </StyledCardContainer>
  );
};

export default SightingsCard;

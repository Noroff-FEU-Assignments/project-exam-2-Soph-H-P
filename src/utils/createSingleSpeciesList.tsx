import { SightingInterface } from '../hooks/useSightings';

const createSingleSpeciesList = (sightings: SightingInterface[]) => {
  const speciesList: string[] = [];
  sightings.forEach((sighting) => {
    if (speciesList.length === 0) {
      speciesList.push(sighting.attributes.species);
    } else {
      if (!speciesList.includes(sighting.attributes.species)) {
        speciesList.push(sighting.attributes.species);
      }
    }
  });
  return speciesList;
};

export default createSingleSpeciesList;

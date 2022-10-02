import { SightingInterface } from '../hooks/useSightings';

/**
 * creates a list of each species logged so far, this is to be used in the
 * dropdown search to help users find sightings, and to prevent spelling errors when
 * logging a new sighting.
 * @param {SightingInterface[]} sightings
 * @example createSingleSpeciesList(sightings)
 * @returns {string[]}
 */

const createSingleSpeciesList = (sightings: SightingInterface[]): string[] => {
  const speciesList: string[] = [];
  sightings.forEach(sighting => {
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

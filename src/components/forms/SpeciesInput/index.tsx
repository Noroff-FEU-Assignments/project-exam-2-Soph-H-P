import { Form, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import useSightings from '../../../hooks/useSightings';
import { birdsOnlyUrl } from '../../../constants/api';
import createSingleSpeciesList from '../../../utils/createSingleSpeciesList';
import { StyledSelect } from './index.styled';
import { SpeciesNotFound } from '../SearchForm';

/**
 * The Species Input creates a list of birds from all the current sightings, it
 * then displayes matching options depending on the users search terms if there is not
 * a bird that matches the search the item is automatically added to the list
 *
 *
 *@param {Object} props
 *@param {string| undefined} props.initialValue the value to be initially set if supplied
 * @example <SpeciesInput initialValue="Magpie" />
 * @returns {React.ReactElement | null}
 */

const SpeciesInput = ({ initialValue }: { initialValue?: string }): React.ReactElement | null => {
  const [species, setSpecies] = useState<string>('');
  const [speciesInputValue, setSpeciesInputValue] = useState<string>('');
  const { sightings } = useSightings(birdsOnlyUrl);
  const [singleListSightings, setSingleListSightings] = useState<string[]>([]);
  const { Option } = Select;

  useEffect(() => {
    if (sightings) {
      setSingleListSightings(createSingleSpeciesList(sightings));
    }
  }, [sightings]);

  useEffect(() => {
    setSingleListSightings([...singleListSightings, species]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [species]);

  useEffect(() => {
    if (singleListSightings.length > 1) {
      if (singleListSightings.includes(speciesInputValue.toLowerCase())) {
      } else if (speciesInputValue.length > 1) {
        const previousValue = speciesInputValue.substring(0, speciesInputValue.length - 1);
        const filterOutPrevious = singleListSightings.filter(
          (sighting) => sighting.toLowerCase() !== previousValue.toLowerCase()
        );
        setSingleListSightings(filterOutPrevious);
        setSpecies(speciesInputValue.toLowerCase());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speciesInputValue]);

  if (!sightings) {
    return null;
  }

  const onSpeciesSearchChange = (event: React.KeyboardEvent<HTMLDivElement>) => {
    //@ts-ignore
    setSpeciesInputValue(event.target.value);
  };

  return (
    <>
      <label htmlFor="species">{initialValue ? 'Bird species' : 'What bird did you see?'}</label>
      <Form.Item
        initialValue={initialValue && initialValue}
        name="species"
        rules={[{ required: true, message: 'Please tell us the species' }]}
      >
        <StyledSelect
          showSearch
          style={{ width: '100%' }}
          placeholder="Mute swan"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option!.children as unknown as string).includes(input.toLowerCase())
          }
          filterSort={(optionA, optionB) =>
            (optionA!.children as unknown as string).localeCompare(
              (optionB!.children as unknown as string).toLowerCase()
            )
          }
          onKeyUp={(e) => onSpeciesSearchChange(e)}
          notFoundContent={<SpeciesNotFound add={true} />}
          autoClearSearchValue={false}
          dropdownRender={(menu) => <>{menu}</>}
        >
          {singleListSightings.map((species: string) => (
            <Option key={species}>{species}</Option>
          ))}
        </StyledSelect>
      </Form.Item>
    </>
  );
};

export default SpeciesInput;

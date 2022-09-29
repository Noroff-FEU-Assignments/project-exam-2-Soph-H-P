import { Button, Divider, Form, Input, InputRef, Select, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import useSightings from '../../../hooks/useSightings';
import { birdsOnlyUrl } from '../../../constants/api';
import createSingleSpeciesList from '../../../utils/createSingleSpeciesList';
import { StyledSelect } from './index.styled';
import { SpeciesNotFound } from '../SearchForm';

/**
 * The Species Input creates a list of birds from all the current sightings, it
 * then displayes matching options depending on the users search terms if there is not
 * a bird that matches the search the user can then add this to the list and select it
 *
 *
 *@param {Object} props
 *@param {string| undefined} props.initialValue the value to be initially set if supplied
 *
 * @example <SpeciesInput initialValue="Magpie" />
 * @returns {React.ReactElement | null}
 */

const SpeciesInput = ({ initialValue }: { initialValue?: string }): React.ReactElement | null => {
  const [species, setSpecies] = useState('');
  const inputRef = useRef<InputRef>(null);
  const { sightings } = useSightings(birdsOnlyUrl);
  const [singleListSightings, setSingleListSightings] = useState<string[]>([]);
  const { Option } = Select;

  useEffect(() => {
    if (sightings) {
      const speciesList: string[] = createSingleSpeciesList(sightings);
      setSingleListSightings(speciesList);
    }
  }, [sightings]);

  if (!sightings) {
    return null;
  }

  const onSpeciesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpecies(event.target.value.toLowerCase());
  };

  const addSpecies = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setSingleListSightings([...singleListSightings, species]);
    setSpecies('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const addNewSpeciesOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.currentTarget.value !== '') {
      e.preventDefault();
      e.stopPropagation();
      setSingleListSightings([...singleListSightings, species]);
      setSpecies('');
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
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
          notFoundContent={<SpeciesNotFound add={true} />}
          autoClearSearchValue={false}
          dropdownRender={(menu) => (
            <>
              {menu}
              <Divider style={{ margin: '8px 0' }} />
              <Space style={{ padding: '0 8px 4px' }}>
                <Input
                  placeholder="Mute swan"
                  ref={inputRef}
                  value={species}
                  onChange={onSpeciesChange}
                  onPressEnter={(e) => {
                    addNewSpeciesOnEnter(e);
                  }}
                />
                <Button type="text" icon={<PlusOutlined />} onClick={addSpecies}>
                  Add species
                </Button>
              </Space>
            </>
          )}
        >
          {singleListSightings.map((species: string, index) => (
            <Option key={species}>{species}</Option>
          ))}
        </StyledSelect>
      </Form.Item>
    </>
  );
};

export default SpeciesInput;

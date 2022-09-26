import { Button, Divider, Form, Input, InputRef, Select, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import useSightings from '../../../hooks/useSightings';
import { birdsOnlyUrl } from '../../../constants/api';
import createSingleSpeciesList from '../../../utils/createSingleSpeciesList';
import { NotFoundContainer, StyledSelect } from './index.styled';
import LogoImage from '../../../svgs/LogoImage';

const SpeciesNotFound = () => {
  return (
    <NotFoundContainer>
      <LogoImage />
      <p>That species is not in the list yet, please add it below.</p>
    </NotFoundContainer>
  );
};

const SpeciesInput = () => {
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
      <label htmlFor="species">What bird did you see?</label>
      <Form.Item name="species" rules={[{ required: true, message: 'Please tell us the species' }]}>
        <StyledSelect
          showSearch
          style={{ width: '100%' }}
          placeholder="Mute swan"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option!.children as unknown as string).includes(input.toLowerCase())
          }
          filterSort={(optionA, optionB) =>
            (optionA!.children as unknown as string)
              .localeCompare((optionB!.children as unknown as string).toLowerCase())
          }
          notFoundContent={<SpeciesNotFound />}
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

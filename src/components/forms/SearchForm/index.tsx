import { Button, Form, Select } from 'antd';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { birdsOnlyUrl } from '../../../constants/api';
import useSightings from '../../../hooks/useSightings';
import { StyledSearchForm, StyledSelect } from './index.styled';
import { SearchOutlined } from '@ant-design/icons';

const SearchForm = ({
  setSearchValue,
}: {
  setSearchValue: Dispatch<SetStateAction<string[] | null>>;
}) => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const { sightings } = useSightings(birdsOnlyUrl);
  const [singleListSightings, setSingleListSightings] = useState<string[]>([]);

  useEffect(() => {
    if (sightings) {
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
      setSingleListSightings(speciesList);
    }
  }, [sightings]);

  if (!sightings) {
    return null;
  }

  const handleChange = (e: any) => {
    form.setFieldsValue({
      search: e,
    });
    setSearchValue(e);
  };

  const onFinish = (values: any) => {
    setSearchValue(values.search);
  };

  return (
    <StyledSearchForm onFinish={onFinish} form={form}>
      <Form.Item name="search">
        <StyledSelect
          mode="multiple"
          size={'large'}
          placeholder="Search for a bird"
          defaultValue={[]}
          onChange={handleChange}
          style={{ width: '100%' }}
        >
          {singleListSightings.map((species, index) => {
            return (
              <Option key={index} value={species}>
                {species}
              </Option>
            );
          })}
        </StyledSelect>
      </Form.Item>
      <Form.Item>
        <Button icon={<SearchOutlined />} htmlType="submit" type="ghost" />
      </Form.Item>
    </StyledSearchForm>
  );
};

export default SearchForm;

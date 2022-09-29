import { Button, Form, Select } from 'antd';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { birdsOnlyUrl } from '../../../constants/api';
import useSightings from '../../../hooks/useSightings';
import { StyledSearchForm, StyledSelect } from './index.styled';
import { SearchOutlined } from '@ant-design/icons';
import { NotFoundContainer } from '../SpeciesInput/index.styled';
import LogoImage from '../../../svgs/LogoImage';

/**
 * The Search form creates a list of birds from all the current sightings, it
 * then displayes matching options depending on the users search terms
 *
 * there is a state shown when there are no matching options in the list
 *
 *@param {Object} props
 *@param {Dispatch<SetStateAction<string[] | null>>} props.setSearchValue state setter for the search value
 *
 * @example <SearchForm setSearchValue={setSearchValue} />
 * @returns {React.ReactElement}
 */

interface SearchFormInterface {
  search: string[] | [];
}

export const SpeciesNotFound = ({ add }: { add?: boolean }): React.ReactElement => {
  return (
    <NotFoundContainer>
      <LogoImage />
      <p>
        {add
          ? 'That species is not in the list yet, please add it below.'
          : 'That species has not yet been sighted.'}{' '}
      </p>
    </NotFoundContainer>
  );
};

const SearchForm = ({
  setSearchValue,
}: {
  setSearchValue: Dispatch<SetStateAction<string[] | null>>;
}): React.ReactElement | null => {
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

  const handleChange = (e: string[] | []) => {
    form.setFieldsValue({
      search: e,
    });
    setSearchValue(e);
  };

  const onFinish = (values: SearchFormInterface) => {
    setSearchValue(values.search);
  };

  return (
    <StyledSearchForm onFinish={(values) => onFinish(values as SearchFormInterface)} form={form}>
      <Form.Item name="search">
        <StyledSelect
          mode="multiple"
          size={'large'}
          placeholder="Search for a bird"
          onChange={(e) => handleChange(e as string[])}
          style={{ width: '100%' }}
          notFoundContent={<SpeciesNotFound />}
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

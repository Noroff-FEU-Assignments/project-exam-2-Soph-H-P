import { StyledForm } from '../StyledForm/index.styled';
import { Button, DatePicker, Form, Input, Switch, UploadFile } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import useSubmitSightingsForm from '../../../hooks/useSubmitSightingsForm';
import { RangePickerProps } from 'antd/lib/date-picker';
import moment from 'moment';
import { useEffect, useState } from 'react';
import UploadInput from '../UploadInput';
import { useUserState } from '../../../context/UserContext';
import FormMessage from '../FormMessage';
import LocationInput from '../../mapComponents/LocationInput';
import { LatLngLiteral } from 'leaflet';
import SpeciesInput from '../SpeciesInput';
import PageTitle from '../../typography/PageTitle';
import { StyledFormContainer } from './index.styled';
import { Link } from 'react-router-dom';

/**
 * Sightings form component renders a form taking information form a user of a bird sighting
 *
 *
 * @example <SightingsForm />
 * @returns {React.ReactElement}
 */

const SightingsForm = (): React.ReactElement => {
  const [form] = Form.useForm();
  const [image, setImage] = useState<File | undefined>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [position, setPosition] = useState<LatLngLiteral | null>(null);
  const [newSightingId, setNewSightingId] = useState<number | null>(null);
  const { formError, formIsSubmitted, isSubmitting, submitForm } = useSubmitSightingsForm(
    form,
    setFileList,
    setPosition,
    position
  );
  const { userInfo } = useUserState();

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Prevents user from selecting a future day
    return current && current > moment().endOf('day');
  };

  useEffect(() => {
    if (position) {
      form.setFieldsValue({
        lat: position.lat,
        lng: position.lng,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position]);

  return (
    <StyledForm
      form={form}
      initialValues={{ remember: true }}
      onFinish={(data) => submitForm(data, setNewSightingId, image)}
      style={{ width: 800 }}
    >
      <PageTitle>Add Sighting</PageTitle>
      <StyledFormContainer>
        <div>
          <SpeciesInput />
          <label htmlFor="date">When did you see it?</label>
          <Form.Item
            name="date"
            rules={[{ required: true, message: 'Please tell us when you saw this bird' }]}
          >
            <DatePicker format={'dddd Do MM YYYY - HH:mm'} showTime disabledDate={disabledDate} />
          </Form.Item>
          <label htmlFor="description">Description</label>
          <Form.Item
            name="description"
            rules={[{ required: true, message: 'Please tell us about the sighting' }]}
          >
            <TextArea rows={4} placeholder="Description character limit 250" maxLength={250} />
          </Form.Item>
          <label htmlFor="public">Who should see this sighting?</label>
          <Form.Item valuePropName="checked" name="public" initialValue={true}>
            <Switch
              defaultChecked
              checkedChildren="Members"
              unCheckedChildren="Public"
              disabled={userInfo ? false : true}
            />
          </Form.Item>
          {userInfo && (
            <>
              {userInfo.user && (
                <>
                  <Form.Item
                    name="userId"
                    initialValue={userInfo.user.toString()}
                    style={{ display: 'none' }}
                  >
                    <Input disabled />
                  </Form.Item>
                  <Form.Item
                    name="user"
                    initialValue={userInfo.profileId}
                    style={{ display: 'none' }}
                  >
                    <Input disabled />
                  </Form.Item>
                  <Form.Item
                    name="username"
                    initialValue={userInfo.username}
                    style={{ display: 'none' }}
                  >
                    <Input disabled />
                  </Form.Item>
                </>
              )}
              {userInfo.userRole === 'admin' && (
                <Form.Item name="varified" initialValue={true} style={{ display: 'none' }}>
                  <Input disabled />
                </Form.Item>
              )}
            </>
          )}
        </div>

        <div>
          <label htmlFor="location">Where did you see it?</label>
          <LocationInput position={position} setPosition={setPosition} />

          <Form.Item
            style={{ marginTop: -30 }}
            name="lat"
            rules={[{ required: true, message: 'Please show where you saw the bird' }]}
          >
            <Input placeholder="latitude" disabled style={{ display: 'none' }} />
          </Form.Item>

          <Form.Item name="lng" style={{ display: 'none' }}>
            <Input placeholder="longitude" disabled />
          </Form.Item>

          <UploadInput setImage={setImage} fileList={fileList} setFileList={setFileList} />
        </div>
      </StyledFormContainer>
      <Button loading={isSubmitting} type="primary" htmlType="submit" size="large">
        {isSubmitting ? 'Submitting' : 'Submit'}
      </Button>
      {formError && <FormMessage error={true}>{formError}</FormMessage>}
      {formIsSubmitted && userInfo && userInfo.userRole === 'admin' && (
        <FormMessage>
          Your sighting has been submitted
          <Link to={`/sighting/${newSightingId}`}>View new sighting</Link>
        </FormMessage>
      )}
      {formIsSubmitted && userInfo && userInfo.userRole !== 'admin' && (
        <FormMessage>
          Your sighting has been submitted and will be visible after it is accepted by a moderator.
          <Link to={`/sighting/${newSightingId}`}>View new sighting</Link>
        </FormMessage>
      )}
      {formIsSubmitted && !userInfo && (
        <FormMessage>
          Your sighting has been submitted and will be visible after it is accepted by a moderator.
        </FormMessage>
      )}
    </StyledForm>
  );
};

export default SightingsForm;

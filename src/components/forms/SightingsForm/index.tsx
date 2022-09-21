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
import LocationInput from '../../common/mapComponents/LocationInput';
import { LatLngLiteral } from 'leaflet';
import SpeciesInput from '../SpeciesInput';

const SightingsForm = () => {
  const [form] = Form.useForm();
  const [image, setImage] = useState<File | undefined>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [position, setPosition] = useState<LatLngLiteral | null>(null);
  const { formError, formIsSubmitted, isSubmitting, submitForm } = useSubmitSightingsForm(
    form,
    setFileList,
    setPosition
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
      onFinish={(data) => submitForm(data, image)}
    >
      <SpeciesInput />
      <label htmlFor="date">When did you see it?</label>
      <Form.Item
        name="date"
        rules={[{ required: true, message: 'Please tell us when you saw this bird' }]}
      >
        <DatePicker
          format={'dddd Do MM YYYY - HH:mm'}
          showTime
          disabledDate={disabledDate}
          onChange={(e) => console.log(e)}
        />
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
          checkedChildren="Members only"
          unCheckedChildren="Public"
          disabled={userInfo ? false : true}
        />
      </Form.Item>
      {userInfo && (
        <>
          {userInfo.id && (
            <>
              <Form.Item
                name="userId"
                initialValue={userInfo.id.toString()}
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
      <label htmlFor="location">Where did you see it?</label>
      <LocationInput position={position} setPosition={setPosition} />
      <Form.Item name="lat" style={{ display: 'none' }}>
        <Input placeholder="Mute Swan" disabled />
      </Form.Item>
      <Form.Item name="lng" style={{ display: 'none' }}>
        <Input placeholder="Mute Swan" disabled />
      </Form.Item>
      <label htmlFor="photos">Add a photo</label>
      <UploadInput setImage={setImage} fileList={fileList} setFileList={setFileList} />
      <Button loading={isSubmitting} type="primary" htmlType="submit" className="login-form-button">
        {isSubmitting ? 'Submitting' : 'Submit'}
      </Button>
      {formError && <FormMessage error={true}>{formError}</FormMessage>}
      {formIsSubmitted && (
        <FormMessage>
          {userInfo && userInfo.userRole === 'admin'
            ? 'Your sighting has been submitted'
            : 'Your sighting has been submitted and will be visible after it is accepted by a moderator.'}
        </FormMessage>
      )}
    </StyledForm>
  );
};

export default SightingsForm;

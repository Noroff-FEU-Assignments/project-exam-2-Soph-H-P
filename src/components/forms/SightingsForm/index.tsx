import { StyledForm } from '../StyledForm/index.styled';
import { Button, DatePicker, Form, Input, Switch, UploadFile } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import useSubmitSightingsForm from '../../../hooks/useSubmitSightingsForm';
import { RangePickerProps } from 'antd/lib/date-picker';
import moment from 'moment';
import { useState } from 'react';
import UploadInput from '../UploadInput';
import Loader from '../../common/Loader';

const SightingsForm = () => {
  const [form] = Form.useForm();
  const [image, setImage] = useState<File | undefined>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { isSubmitting, submitForm } = useSubmitSightingsForm(form, setFileList);

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select a future day
    return current && current > moment().endOf('day');
  };

  return (
    <StyledForm
      form={form}
      initialValues={{ remember: true }}
      onFinish={(data) => submitForm(data, image)}
    >
      <label htmlFor="species">What bird did you see?</label>
      <Form.Item name="species" rules={[{ required: true, message: 'Please tell us the species' }]}>
        <Input placeholder="Mute Swan" />
      </Form.Item>
      <label htmlFor="date">When did you see it?</label>
      <Form.Item name="date" rules={[{ required: true, message: 'Please tell us the species' }]}>
        <DatePicker showTime disabledDate={disabledDate} />
      </Form.Item>
      <label htmlFor="description">Description</label>
      <Form.Item
        name="description"
        rules={[{ required: true, message: 'Please tell us about the sighting' }]}
      >
        <TextArea rows={4} placeholder="Description character limit 250" maxLength={250} />
      </Form.Item>
      <label htmlFor="public">Who should see this sighting?</label>
      <Form.Item valuePropName="checked" name="public">
        <Switch defaultChecked checkedChildren="Public" unCheckedChildren="Members only" />
      </Form.Item>
      <label htmlFor="lat">lat</label>
      <Form.Item name="lat" rules={[{ required: true, message: 'Please tell us the species' }]}>
        <Input placeholder="Mute Swan" />
      </Form.Item>
      <label htmlFor="lng">lng</label>
      <Form.Item name="lng" rules={[{ required: true, message: 'Please tell us the species' }]}>
        <Input placeholder="Mute Swan" />
      </Form.Item>
      <label htmlFor="userId">userId</label>
      <Form.Item name="userId" rules={[{ required: true, message: 'Please tell us the species' }]}>
        <Input placeholder="Mute Swan" />
      </Form.Item>
      <label htmlFor="photos">Photo</label>
      <UploadInput setImage={setImage} fileList={fileList} setFileList={setFileList} />
      <Button loading={isSubmitting} type="primary" htmlType="submit" className="login-form-button">
        {isSubmitting ? 'Submitting' : 'Submit'}
      </Button>
    </StyledForm>
  );
};

export default SightingsForm;

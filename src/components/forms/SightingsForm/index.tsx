import { StyledForm } from '../StyledForm/index.styled';
import FormError from '../FormError';
import { Button, DatePicker, DatePickerProps, Form, Input, Switch, Upload } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import useSubmitSightingsForm from '../../../hooks/useSubmitSightingsForm';
import { RangePickerProps } from 'antd/lib/date-picker';
import moment from 'moment';
import API, { uploadImageUrlEndpoint } from '../../../constants/api';
import useUploadImage from '../../../hooks/useUploadImage';
import UploadInput from '../UploadInput';
import { useEffect, useState } from 'react';

const SightingsForm = () => {
  const [form] = Form.useForm();
  const [image, setImage] = useState<File | undefined>();
  const { formIsSubmitted, formError, isSubmitting, submitForm } = useSubmitSightingsForm(form);
  // const { imageIsUploaded, uploadError, isUploading, uploadImage } = useUploadImage();

  // const onChange = (
  //   value: DatePickerProps['value'],
  //   dateString: [string, string] | string,
  // ) => {
  //   console.log('Selected Time: ', value);
  //   console.log('Formatted Selected Time: ', dateString);
  // };

  // const onOk = (value: DatePickerProps['value']) => {
  //   console.log('onOk: ', value);
  // };

  const uploadImage = (data: any) => {
    setImage(data.file);
  };

  useEffect(() => {
    console.log(image);
  }, [image]);

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days in the future
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
      <Form.Item
        valuePropName="checked"
        name="public"
        rules={[{ required: true, message: 'Please tell us the species' }]}
      >
        <Switch checkedChildren="Public" unCheckedChildren="Members only" defaultChecked />
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
      {/* <Form.Item
        name="photos"
        valuePropName="fileList"
        rules={[{ required: true, message: 'Please tell us the species' }]}
      > */}
      {/* <UploadInput /> */}
      <Upload
        customRequest={uploadImage}
        listType="picture-card"
        onPreview={() => console.log('preview')}
        onChange={() => console.log('change')}
      >
        <div>
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      </Upload>
      {/* </Form.Item> */}
      {/* <Form.Item name="userId" rules={[{ required: true, message: 'Please tell us the species' }]}>
        <Input placeholder="Mute Swan" />
      </Form.Item> */}
      <label htmlFor="varified">varified</label>
      <Form.Item
        name="varified"
        rules={[{ required: true, message: 'Please tell us the species' }]}
      >
        <Input placeholder="Mute Swan" />
      </Form.Item>
      {/* <label htmlFor="photos">photos</label>
      <Form.Item name="photos" rules={[{ required: true, message: 'Please tell us the species' }]}>
        <Input placeholder="Mute Swan" />
      </Form.Item> */}
      {/*  <label htmlFor="email">Email</label>
      <Form.Item
        name="email"
        rules={[
          {
            type: 'email',
            message: 'This is not valid E-mail!',
          },
          { required: true, message: 'Please input your email' },
        ]}
      >
        <Input placeholder="example@gmail.com" />
      </Form.Item>
      <label htmlFor="subject">Subject</label>
      <Form.Item name="subject" rules={[{ required: true, message: 'Please add a subject' }]}>
        <Input placeholder="Where can I find..." />
      </Form.Item>
      <label htmlFor="message">Message</label>
      <Form.Item
        name="message"
        rules={[{ required: true, message: 'Please write something to us' }]}
      >
        <TextArea rows={4} placeholder="Message character limit 250" maxLength={250} />
      </Form.Item>

      {formError && <FormError>{formError}</FormError>}
      {formIsSubmitted && (
        <FormError>
          Your message has been sent. Please expect a reply in 2 - 3 working days.
        </FormError>
      )}*/}
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          {isSubmitting ? 'Sending...' : 'Send'}
        </Button>
      </Form.Item>
    </StyledForm>
  );
};

export default SightingsForm;

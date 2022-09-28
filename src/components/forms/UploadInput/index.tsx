import { FileImageOutlined } from '@ant-design/icons';
import { Modal, Upload, UploadFile, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import { RcFile } from 'antd/lib/upload';
import { Dispatch, SetStateAction, useState } from 'react';
import { StyledFormItem } from './index.styled';

const UploadInput = ({
  fileList,
  setFileList,
  setImage,
}: {
  fileList: UploadFile<File>[];
  setFileList: Dispatch<SetStateAction<UploadFile<File>[]>>;
  setImage: Dispatch<SetStateAction<File | undefined>>;
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  // @ts-ignore: unknown object
  const uploadImageFile = ({ file, onSuccess }) => {
    setImage(file);

    setTimeout(() => {
      onSuccess('ok');
    }, 10);
  };

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <div>
      <FileImageOutlined style={{ fontSize: '30px' }} />
      <div style={{ marginTop: 8 }}>Click or drag image here</div>
    </div>
  );

  return (
    <StyledFormItem>
      <label htmlFor="photos">Add a photo</label>
      <ImgCrop rotate aspect={3 / 2}>
        <Upload
          // @ts-ignore: custom request
          customRequest={uploadImageFile}
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
      </ImgCrop>
      <Modal visible={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </StyledFormItem>
  );
};

export default UploadInput;

import { Form, Modal, Upload, UploadFile, UploadProps } from 'antd';
import { RcFile } from 'antd/lib/upload';
import React, { useCallback, useEffect, useState } from 'react';
import useUploadImage from '../../../hooks/useUploadImage';
import { PlusOutlined } from '@ant-design/icons';

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const UploadInput = () => {
  const { imageIsUploaded, uploadError, isUploading, uploadImage } = useUploadImage();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    // imageIsUploaded && console.log(fileList);
    if (imageIsUploaded) {
      const newFileList = fileList.map((file) => {
        return { ...file, status: 'success' };
      });
      // @ts-ignore: unknown object
      setFileList(newFileList);
    } else if (uploadError) {
      const newFileList = fileList.map((file) => {
        return { ...file, status: 'error' };
      });
      // @ts-ignore: unknown object
      setFileList(newFileList);
    }
  }, [fileList, imageIsUploaded, uploadError]);

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

  const handleRemove = () => {};

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Form.Item name="photo" rules={[{ required: true, message: 'Please tell us the species' }]}>
      <Upload
        // customRequest={uploadImage}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={handleRemove}
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
      <Modal visible={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </Form.Item>
  );

  //   const [fileList, setFileList] = useState<UploadFile[]>();

  //   console.log(fileList);

  //   const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
  //     setFileList(newFileList);
  //   };

  //   const onPreview = async (file: UploadFile) => {
  //     let src = file.url as string;
  //     if (!src) {
  //       src = await new Promise((resolve) => {
  //         const reader = new FileReader();
  //         reader.readAsDataURL(file.originFileObj as RcFile);
  //         reader.onload = () => resolve(reader.result as string);
  //       });
  //     }
  //     const image = new Image();
  //     image.src = src;
  //     const imgWindow = window.open(src);
  //     imgWindow?.document.write(image.outerHTML);
  //   };

  //   return (
  //     <Upload
  //       customRequest={uploadImage}
  //       fileList={fileList}
  //       listType="picture-card"
  //       onPreview={onPreview}
  //       onChange={onChange}
  //     >
  //       <div>{fileList && fileList.length < 5 && '+ Upload'}</div>
  //     </Upload>
  //   );
};

export default UploadInput;

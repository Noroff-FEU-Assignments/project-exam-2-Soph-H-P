import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Popconfirm,
  Switch,
  UploadFile,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import API, { includingImagesQuery, sightingsEndpoint } from '../../../constants/api';
import { useUserState } from '../../../context/UserContext';
import useDeleteSighting from '../../../hooks/useDeleteSighting';
import useSingleSighting from '../../../hooks/useSingleSighting';
import useSubmitSightingsForm from '../../../hooks/useSubmitSightingsForm';
import ApiErrorMessage from '../../common/ApiErrorMessage';
import Cta from '../../common/Cta';
import Loader from '../../common/Loader';
import { PageContainer } from '../../layout/PageContainer/index.styled';
import LocationInput from '../../mapComponents/LocationInput';
import PageTitle from '../../typography/PageTitle';
import FormMessage from '../FormMessage';
import SpeciesInput from '../SpeciesInput';
import { StyledForm } from '../StyledForm/index.styled';
import UploadInput from '../UploadInput';
import { StyledFormContainer } from './index.styled';

/**
 * The Edit sightings form takes the id of a sighting and uses this to get the
 * sightings data from the api. This is then used to populate the form which can then
 * be edited by admin members
 *
 *@param {Object} props
 *@param {string} props.sightingId
 *
 * @example <EditSightingsForm sightingsId={id} />
 * @returns {React.ReactElement}
 */

const EditSightingsForm = ({
  sightingId,
}: {
  sightingId: string;
}): React.ReactElement => {
  const [form] = Form.useForm();
  const [image, setImage] = useState<File | undefined>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { formError, isSaving, updateSighting, formIsSubmitted } = useSubmitSightingsForm(
    form,
    setFileList,
  );
  const {
    deleteSighting,
    isDeleting,
    error: deleteError,
    isDeleted,
  } = useDeleteSighting();
  const { userInfo } = useUserState();
  const navigate = useNavigate();
  const url = `${API}${sightingsEndpoint}/${sightingId}?${includingImagesQuery}`;
  const { sighting, isLoading, error } = useSingleSighting(url);

  useEffect(() => {
    if (sighting?.attributes.photos.data) {
      setFileList([
        {
          uid: '-1',
          name: sighting?.attributes.species || '',
          status: 'done',
          url: sighting?.attributes.photos.data[0].attributes.url,
        },
      ]);
    }
  }, [sighting]);

  useEffect(() => {
    if (isDeleted) {
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleted]);

  if (isLoading) {
    return <Loader size={100} />;
  }

  if (error) {
    return (
      <PageContainer>
        <ApiErrorMessage message={error} hasGif={true} />
        <Cta toHome={true} />
      </PageContainer>
    );
  }

  if (sighting) {
    const {
      date,
      lat,
      lng,
      nearestLocation,
      species,
      description,
      photos,
      public: isPublic,
    } = sighting.attributes;
    const imageId = (photos.data && photos.data[0].id) || undefined;

    const when = moment(date);

    const text = 'Are you sure you want to delete this sighting?';

    const confirm = () => {
      message.info('Sighting deleted');

      deleteSighting(sighting.id, imageId);
    };
    return (
      <StyledForm
        form={form}
        initialValues={{ remember: true }}
        onFinish={data => updateSighting(data, sighting.id, imageId, image)}
        style={{ width: 800 }}
      >
        <PageTitle>Edit or Delete Sighting</PageTitle>
        <StyledFormContainer>
          <div>
            <SpeciesInput initialValue={species} />
            <label htmlFor="date">It was seen</label>
            <Form.Item name="date">
              <DatePicker
                defaultValue={when}
                format={'dddd Do MM YYYY - HH:mm'}
                disabled
              />
            </Form.Item>
            <label htmlFor="description">Description</label>
            <Form.Item
              initialValue={description}
              name="description"
              rules={[{ required: true, message: 'Please tell us about the sighting' }]}
            >
              <TextArea
                rows={4}
                placeholder="Description character limit 250"
                maxLength={250}
              />
            </Form.Item>
            <label htmlFor="public">Who should see this sighting?</label>
            <Form.Item valuePropName="checked" name="public">
              <Switch
                defaultChecked={isPublic}
                checkedChildren="Members"
                unCheckedChildren="Public"
              />
            </Form.Item>
            {userInfo && (
              <>
                {userInfo.userRole === 'admin' && (
                  <Form.Item
                    name="varified"
                    initialValue={true}
                    style={{ display: 'none' }}
                  >
                    <Input disabled />
                  </Form.Item>
                )}
              </>
            )}
          </div>

          <div>
            <label htmlFor="location">It was seen near: {nearestLocation}</label>
            <LocationInput position={{ lat: lat, lng: lng }} />
            <UploadInput
              setImage={setImage}
              fileList={fileList}
              setFileList={setFileList}
            />
          </div>
        </StyledFormContainer>
        <Button loading={isSaving} type="primary" htmlType="submit" size="large">
          {isSaving ? 'Saving changes' : 'Save changes'}
        </Button>
        <Popconfirm
          placement="top"
          title={text}
          onConfirm={confirm}
          okText="Delete now"
          cancelText="Cancel"
        >
          <Button
            loading={isDeleting}
            type="ghost"
            danger={true}
            style={{ marginTop: 20 }}
          >
            {isDeleting ? 'Deleting' : 'Delete'}
          </Button>
        </Popconfirm>
        {formError && <FormMessage error={true}>{formError}</FormMessage>}
        {deleteError && <FormMessage error={true}>{deleteError}</FormMessage>}
        {formIsSubmitted && (
          <FormMessage>
            This sighting has been updated.{' '}
            <Link to={`/sighting/${sighting.id}`}>View updated sighting</Link>
          </FormMessage>
        )}
      </StyledForm>
    );
  }

  return <StyledForm />;
};

export default EditSightingsForm;

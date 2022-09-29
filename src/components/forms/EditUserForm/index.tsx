import { StyledForm } from '../StyledForm/index.styled';
import { Button, Form, Input, Switch, message, Popconfirm } from 'antd';
import useUser from '../../../hooks/useUser';
import FormMessage from '../FormMessage';
import useGetUser from '../../../hooks/useGetUser';
import Loader from '../../common/Loader';
import { PageContainer } from '../../layout/PageContainer/index.styled';
import ApiErrorMessage from '../../common/ApiErrorMessage';
import Cta from '../../common/Cta';
import { useEffect } from 'react';

/**
 * The Edit user form takes the id of a user and uses this to get the
 * user data from the api. This is then used to populate the form which can then
 * be edited by admin members. Mainly used to change the admin status of users
 *
 *@param {Object} props
 *@param {string} props.userId
 *
 * @example <EditUserForm userId={id} />
 * @returns {React.ReactElement}
 */

const EditUserForm = ({ userId }: { userId: string }): React.ReactElement => {
  const [form] = Form.useForm();

  const { user, error, isLoading, getUser } = useGetUser();

  useEffect(() => {
    getUser(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const { formIsSubmitted, formError, isSubmitting, submitUpdateForm, deleteUser, isDeleting } =
    useUser(form);

  const handleChange = (e: boolean) => {
    const value = e === true ? 'admin' : 'member';
    form.setFieldsValue({
      userRole: value,
    });
  };

  const text = 'Are you sure you want to delete this user it cannot be undone?';

  const confirm = () => {
    message.info('User deleted');
    deleteUser(userId);
  };

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

  if (user) {
    return (
      <StyledForm
        form={form}
        initialValues={{ remember: true }}
        $isUserEdit={true}
        onFinish={(data) => submitUpdateForm(data, userId)}
      >
        <label htmlFor="username">Username</label>
        <Form.Item
          name="username"
          initialValue={user.username}
          rules={[
            {
              pattern: new RegExp(/^[A-Za-z0-9][A-Za-z0-9]*$/),
              message: 'Please do not use spaces or symbols in your username',
            },
            {
              required: true,
              message: 'Please input your username',
            },
            {
              max: 20,
              message: 'Cannot be more than 15 characters',
            },
          ]}
        >
          <Input type="text" placeholder="BlueFootedSophie" />
        </Form.Item>
        <Form.Item style={{ display: 'none' }} name="userRole" initialValue={user.userRole}>
          <Input disabled />
        </Form.Item>
        <label htmlFor="switch">User role</label>
        <Switch
          defaultChecked={user.userRole === 'admin' ? true : false}
          checkedChildren="Member"
          unCheckedChildren="Admin"
          onChange={handleChange}
        />
        {formError && <FormMessage error={true}>{formError}</FormMessage>}
        {formIsSubmitted && <FormMessage>Event has been saved</FormMessage>}
        <Form.Item style={{ marginTop: 20 }}>
          <Button type="primary" htmlType="submit" size="large">
            {isSubmitting ? 'Saving...' : 'Save changes'}
          </Button>
        </Form.Item>
        <Popconfirm
          placement="top"
          title={text}
          onConfirm={confirm}
          okText="Delete user"
          cancelText="Cancel"
        >
          <Button danger={true} type="ghost">
            {isDeleting ? 'Deleting...' : 'Delete user'}
          </Button>
        </Popconfirm>
      </StyledForm>
    );
  }

  return <StyledForm />;
};

export default EditUserForm;

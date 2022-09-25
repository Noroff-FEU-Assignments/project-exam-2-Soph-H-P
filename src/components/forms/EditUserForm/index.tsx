import { StyledForm } from '../StyledForm/index.styled';
import FormError from '../FormMessage';
import { Button, Form, Input, Switch, message, Popconfirm } from 'antd';
import useUser from '../../../hooks/useUser';
import FormMessage from '../FormMessage';
import useGetUser from '../../../hooks/useGetUser';
import Loader from '../../common/Loader';
import { PageContainer } from '../../layout/PageContainer/index.styled';
import ApiErrorMessage from '../../common/ApiErrorMessage';
import Cta from '../../common/Cta';

const EditUserForm = ({ userId }: { userId: string }) => {
  const [form] = Form.useForm();

  const { user, error, isLoading } = useGetUser(userId);

  const { formIsSubmitted, formError, isSubmitting, submitUpdateForm, deleteUser, isDeleting } =
    useUser(form);

  const handleChange = (e: any) => {
    console.log(e);
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
        {formError && <FormError>{formError}</FormError>}
        {formIsSubmitted && <FormMessage>Event has been saved</FormMessage>}
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            {isSubmitting ? 'Saving...' : 'Save changes'}
          </Button>
        </Form.Item>
        <Popconfirm placement="top" title={text} onConfirm={confirm} okText="Yes" cancelText="No">
          <Button danger={true} type="ghost" className="login-form-button">
            {isDeleting ? 'Deleting...' : 'Delete user'}
          </Button>
        </Popconfirm>
      </StyledForm>
    );
  }

  return null;
};

export default EditUserForm;

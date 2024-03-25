import { Anchor, Button, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconAt, IconLock } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

import { useLogin } from '../api';

export const LoginForm: React.FC = () => {
  const form = useForm({ initialValues: { username: '', password: '' } });
  const loginMutation = useLogin();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await loginMutation.mutateAsync(
      { data: form.values },
      {
        onError: ({ response, message }) => {
          if (response?.data.errors) {
            form.setErrors(response.data.errors);
          } else {
            notifications.show({
              message,
              color: 'red',
            });
          }
        },
      }
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <TextInput
          name="username"
          placeholder="Username"
          leftSection={<IconAt size={14} />}
          {...form.getInputProps('username')}
        />
      </div>
      <div className="mb-2">
        <PasswordInput
          name="password"
          placeholder="Password"
          leftSection={<IconLock size={14} />}
          {...form.getInputProps('password')}
        />
      </div>

      <div className="mb-4 flex justify-end text-sm">
        <Anchor component={Link} to="/">
          Lupa Password?
        </Anchor>
      </div>

      <Button type="submit" fullWidth loading={loginMutation.isPending}>
        Masuk
      </Button>
    </form>
  );
};

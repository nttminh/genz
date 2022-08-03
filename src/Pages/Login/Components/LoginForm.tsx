import { Alert, Button, PasswordInput, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'tabler-icons-react';

type Props = {
	form: UseFormReturnType<{
		taiKhoan: string;
		matKhau: string;
	}>;
	handleLogin: () => Promise<void>;
	setIsForgotPassword: (value: React.SetStateAction<boolean>) => void;
	error: string;
};

const LoginForm = ({
	form,
	handleLogin,
	setIsForgotPassword,
	error,
}: Props) => {
	return (
		<div className="p-4 md:w-1/2 mx-auto">
			<TextInput
				label="Tài khoản"
				placeholder="Tài khoản"
				{...form.getInputProps('taiKhoan')}
			/>
			<PasswordInput
				mt="md"
				label="Mật khẩu"
				placeholder="Mật khẩu"
				{...form.getInputProps('matKhau')}
			/>
			<div className="text-center">
				<Button mt="md" radius="sm" onClick={handleLogin}>
					Đăng nhập
				</Button>
				<Link
					to="/register"
					className="block mt-4 text-sm brightness-75"
				>
					Đăng ký
				</Link>
				<Link
					to="#"
					className="block mt-4 text-sm brightness-75"
					onClick={() => setIsForgotPassword(true)}
				>
					Quên mật khẩu
				</Link>
			</div>
			{error && (
				<Alert
					mt={16}
					icon={<AlertCircle />}
					withCloseButton
					closeButtonLabel="Close alert"
					radius="sm"
				>
					{error}
				</Alert>
			)}
		</div>
	);
};

export default LoginForm;

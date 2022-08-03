import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import {
	Button,
	Code,
	Group,
	PasswordInput,
	Stepper,
	TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { FieldErrors } from 'react-hook-form';
import userAPI from 'Services/userAPI';
import { DangKiParams } from 'Interface/user';

// Register fields: taiKhoan, matKhau, email, hoTen, soDt

// validation schema
const schema = object({
	taiKhoan: string()
		.required('Tài khoản không được để trống')
		.matches(
			/^[a-zA-Z0-9]{5,}$/,
			'Tài khoản chỉ gồm chữ hoa, thường, số và ít nhất 5 kí tự'
		),
	matKhau: string()
		.required('Mật khẩu không được để trống')
		.matches(
			/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
			'Mật khẩu ít nhất một chữ cái, một số và ít nhất 8 kí tự'
		),
	email: string()
		.required('Email không được để trống')
		.email('Email không đúng định dạng'),
	hoTen: string().required('Họ tên không được để trống'),
	soDt: string().required('Số điện thoại không được để trống'),
});

interface RegisterValues {
	taiKhoan: string;
	matKhau: string;
	email: string;
	hoTen: string;
	soDt: string;
}

const Register = () => {
	const [active, setActive] = useState(0);
	const [response, setResponse] = useState<DangKiParams | null>(null);
	const [error, setError] = useState('');
	const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);

	const form = useForm({
		initialValues: {
			taiKhoan: '',
			matKhau: '',
			hoTen: '',
			email: '',
			soDt: '',
			maNhom: 'GP06',
		},

		validate: (values) => {
			if (active === 0) {
				return {
					username:
						values.taiKhoan.trim().length < 6
							? 'Username must include at least 6 characters'
							: null,
					password:
						values.matKhau.length < 6
							? 'Password must include at least 6 characters'
							: null,
				};
			}

			if (active === 1) {
				return {
					name:
						values.hoTen.trim().length < 2
							? 'Name must include at least 2 characters'
							: null,
					email: /^\S+@\S+$/.test(values.email)
						? null
						: 'Invalid email',
				};
			}

			return {};
		},
	});

	const nextStep = () =>
		setActive((current) => {
			if (form.validate().hasErrors) {
				return current;
			}
			return current < 3 ? current + 1 : current;
		});

	const prevStep = () =>
		setActive((current) => (current > 0 ? current - 1 : current));

	const handleRegister = async () => {
		try {
			const data = await userAPI.register(form.values);
			console.log(typeof data);
			if (typeof data === 'string') {
				setError(data);
				setResponse(null);
			}
			if (typeof data === 'object') {
				setResponse(data);
				setError('');
				setIsRegisterSuccess(true);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="p-4 md:w-1/2 mx-auto">
			<Stepper active={active} breakpoint="sm">
				<Stepper.Step label="Bước 1" description="Profile settings">
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
				</Stepper.Step>

				<Stepper.Step label="Bước 2" description="Personal information">
					<TextInput
						label="Họ và tên"
						placeholder="Họ và tên"
						{...form.getInputProps('hoTen')}
					/>
					<TextInput
						mt="md"
						label="Email"
						placeholder="Email"
						{...form.getInputProps('email')}
					/>
				</Stepper.Step>

				<Stepper.Step label="Hoàn tất" description="Phone number">
					<TextInput
						label="Số điện thoại"
						placeholder="0923 456 789"
						{...form.getInputProps('soDt')}
					/>
				</Stepper.Step>
				<Stepper.Completed>
					{error && (
						<div>
							<h2>{error} Vui lòng chỉnh sửa lại thông tin</h2>
						</div>
					)}
					{response && (
						<div className="text-center">
							<h2 className="mb-4">
								Đăng kí thành công, sử dụng tài khoản bên dưới
								để đăng nhập
							</h2>
							<Code p={8}>{response?.taiKhoan}</Code>
						</div>
					)}
				</Stepper.Completed>
			</Stepper>

			<Group position="right" mt="xl">
				{!isRegisterSuccess && active !== 0 && (
					<Button variant="default" onClick={prevStep}>
						Back
					</Button>
				)}
				{!isRegisterSuccess && active < 2 && (
					<Button onClick={nextStep}>Next step</Button>
				)}
				{!isRegisterSuccess && active === 2 && (
					<Button
						onClick={() => {
							nextStep();
							handleRegister();
						}}
					>
						Đăng kí
					</Button>
				)}
			</Group>
		</div>
	);
};
export default Register;

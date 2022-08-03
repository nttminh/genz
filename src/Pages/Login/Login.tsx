// Một số thư viện làm việc với form trong React: formik, react-final-form, react-hook-form

import {
	Alert,
	Button,
	Code,
	Group,
	PasswordInput,
	Stepper,
	TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { AppDispatch, RootState } from 'configStore';
import { useEffect, useState } from 'react';
import { FieldErrors } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import userAPI from 'Services/userAPI';
import { login } from 'Slices/auth';
import { AlertCircle } from 'tabler-icons-react';
import ForgotPasswordForm from './Components/ForgotPasswordForm';
import LoginForm from './Components/LoginForm';

interface LoginValues {
	taiKhoan: string;
	matKhau: string;
}

const Login = () => {
	const form = useForm({
		initialValues: {
			taiKhoan: '',
			matKhau: '',
		},
		validate: (values) => {
			return {
				taiKhoan:
					values.taiKhoan.trim().length < 6
						? 'Username must include at least 6 characters'
						: null,
				matKhau:
					values.matKhau.length < 6
						? 'Password must include at least 6 characters'
						: null,
			};
		},
	});
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const { user, error } = useSelector((state: RootState) => state.auth);
	const [isForgotPassword, setIsForgotPassword] = useState(false);

	const handleLogin = async () => {
		if (form.validate().hasErrors) {
			return;
		}
		console.log(form.values);
		dispatch(login(form.values));
	};

	useEffect(() => {
		if (Object.keys(user).length !== 0) {
			navigate(-1);
		}
		return () => {};
	}, [user]);

	if (isForgotPassword) return <ForgotPasswordForm setIsForgotPassword={setIsForgotPassword} />;

	return (
		<LoginForm
			form={form}
			handleLogin={handleLogin}
			setIsForgotPassword={setIsForgotPassword}
			error={error}
		/>
	);
};

export default Login;

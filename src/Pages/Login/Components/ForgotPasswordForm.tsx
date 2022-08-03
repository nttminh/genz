import { Button, CheckIcon, Notification, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, CircleCheck } from 'tabler-icons-react';

type Props = {
	setIsForgotPassword: React.Dispatch<React.SetStateAction<boolean>>;
};

const ForgotPasswordForm = ({ setIsForgotPassword }: Props) => {
	const form = useForm({
		initialValues: {
			email: '',
		},
		validate: {
			email: (value) =>
				value === ''
					? 'Email chưa được nhập'
					: !/^\S+@\S+$/.test(value)
					? 'Sai định dạng email'
					: null,
		},
	});
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isNotificationShowed, setIsNotificationShowed] = useState(false);

	const handleSubmit = () => {
		setIsSubmitted(true);
		setTimeout(() => {
			setIsNotificationShowed(true);
		}, 1000);
	};

	return (
		<div className="p-4 ">
			<Link
				to="#"
				className="brightness-75"
				onClick={() => setIsForgotPassword(false)}
			>
				{'<'} Đăng nhập
			</Link>
			<div className="md:w-1/2 mx-auto text-center mt-8">
				<form onSubmit={form.onSubmit((values) => handleSubmit())}>
					<TextInput
						disabled={isSubmitted}
						label="Email khôi phục"
						placeholder="Email"
						{...form.getInputProps('email')}
					/>

					<Button type="submit" mt="sm" disabled={isSubmitted}>
						Khôi phục mật khẩu
					</Button>
				</form>

				{isNotificationShowed && (
					<Notification
						mt="md"
						icon={<Check size={18} />}
						color="teal"
						title="Đã gửi yêu cầu khôi phục"
						onClose={() => setIsNotificationShowed(false)}
					>
						Bạn sẽ nhận được email khôi phục nếu email có tồn tại
						trong hệ thống.
					</Notification>
				)}
			</div>
		</div>
	);
};

export default ForgotPasswordForm;

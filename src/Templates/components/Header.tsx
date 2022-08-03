import { AppDispatch, RootState } from 'configStore';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { logout } from 'Slices/auth';

type Props = {
	horizontal?: boolean;
};

const Header = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { user, error } = useSelector((state: RootState) => state.auth);
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();

	const handleToggleOpen = () => {
		setIsOpen((prev) => !prev);
	};

	const handleLogin = () => {
		navigate('/login');
		setIsOpen(false);
	};

	const handleLogout = () => {
		dispatch(logout());
		setIsOpen(false);
	};

	return (
		<>
			<div>
				<nav className="relative px-4 py-4 flex lg:justify-between items-center bg-gradient-to-b from-black to-transparent z-50">
					<div className="lg:hidden">
						<button
							className="navbar-burger flex items-center p-3 focus:outline-none hover:text-red-700 focus:text-gray-50"
							onClick={handleToggleOpen}
						>
							<svg
								stroke="currentColor"
								fill="currentColor"
								strokeWidth="0"
								viewBox="0 0 512 512"
								className="w-6 h-6"
								height="1em"
								width="1em"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M32 96v64h448V96H32zm0 128v64h448v-64H32zm0 128v64h448v-64H32z"></path>
							</svg>
						</button>
					</div>
					<Link className="text-3xl font-bold leading-none" to="/">
						{/* <svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-8 w-8 hover:text-green-600"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
								clipRule="evenodd"
							/>
						</svg> */}
						{/* <BrandLogo /> */}
						GenZ
					</Link>
					<ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-8">
						<li>
							<NavLink
								className={({ isActive }) =>
									`text-sm ${
										isActive ? 'text-red-700' : 'text-white'
									} font-medium px-2 py-2`
								}
								to="/"
							>
								Home
							</NavLink>
						</li>
						<li>
							<NavLink
								className={({ isActive }) =>
									`text-sm ${
										isActive ? 'text-red-700' : 'text-white'
									} font-medium px-2 py-2`
								}
								to="/contact"
							>
								Contact
							</NavLink>
						</li>
						<li>
							<NavLink
								className={({ isActive }) =>
									`text-sm ${
										isActive ? 'text-red-700' : 'text-white'
									} font-medium px-2 py-2`
								}
								to="register"
							>
								Register
							</NavLink>
						</li>
					</ul>
					{Object.keys(user).length === 0 ? (
						<button
							className="hidden lg:inline-block py-2 px-8 bg-white hover:bg-red-600 text-sm text-center text-gray-800 hover:text-white font-bold 
    transform active:scale-75 transition-transform duration-700 focus:outline-none"
							onClick={handleLogin}
						>
							Đăng nhập
						</button>
					) : (
						<button
							className="hidden lg:inline-block py-2 px-8 bg-white hover:bg-red-600 text-sm text-center text-gray-800 hover:text-white font-bold 
    transform active:scale-75 transition-transform duration-700 focus:outline-none"
							onClick={handleLogout}
						>
							Đăng xuất
						</button>
					)}
				</nav>
				<div
					className={`navbar-menu relative z-50 ${
						isOpen ? '' : 'hidden'
					}`}
				>
					<div
						className="navbar-backdrop fixed inset-0 bg-black opacity-80"
						onClick={handleToggleOpen}
					/>
					<nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-background overflow-y-auto">
						<div className="flex items-center mb-8">
							<Link
								className="mr-auto text-3xl font-bold leading-none"
								to="/"
							>
								{/* <svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-8 w-8"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fillRule="evenodd"
										d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
										clipRule="evenodd"
									/>
								</svg> */}
								GenZ
							</Link>
							<button
								className="navbar-close focus:outline-none"
								onClick={handleToggleOpen}
							>
								<svg
									className="h-6 w-6 text-gray-400 cursor-pointer hover:text-red-600 "
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>
						<div>
							<ul>
								<li className="mb-1 inline-flex group rounded w-full">
									<div className="flex w-1 group-hover:bg-red-800 scale-y-0 group-hover:scale-100 transition-transform origin-top rounded-full duration-400 ease-in"></div>
									<NavLink
										className={({ isActive }) =>
											`flex w-full p-4 text-sm font-semibold ${
												isActive
													? 'text-red-600'
													: 'text-gray-500'
											} group-hover:text-red-600`
										}
										to="/"
										onClick={handleToggleOpen}
									>
										Home
									</NavLink>
								</li>
								<li className="mb-1 inline-flex group rounded w-full">
									<div className="flex w-1 group-hover:bg-red-800 scale-y-0 group-hover:scale-100 transition-transform origin-top rounded-full duration-400 ease-in"></div>
									<NavLink
										className={({ isActive }) =>
											`flex w-full p-4 text-sm font-semibold ${
												isActive
													? 'text-red-600'
													: 'text-gray-500'
											} group-hover:text-red-600`
										}
										to="/contact"
										onClick={handleToggleOpen}
									>
										Contact
									</NavLink>
								</li>
								<li className="mb-1 inline-flex group rounded w-full">
									<div className="flex w-1 group-hover:bg-red-800 scale-y-0 group-hover:scale-100 transition-transform origin-top rounded-full duration-400 ease-in"></div>
									<NavLink
										className={({ isActive }) =>
											`flex w-full p-4 text-sm font-semibold ${
												isActive
													? 'text-red-600'
													: 'text-gray-500'
											} group-hover:text-red-600`
										}
										to="/register"
										onClick={handleToggleOpen}
									>
										Register
									</NavLink>
								</li>
							</ul>
						</div>
						<div className="mt-auto">
							<div className="pt-6">
								{Object.keys(user).length === 0 ? (
									<button
										className="w-full py-3 px-4 bg-white hover:bg-red-600 text-sm text-center text-gray-800 hover:text-white font-bold  hover:shadow-md transform transition-transform duration-700 focus:outline-none"
										onClick={handleLogin}
									>
										Đăng nhập
									</button>
								) : (
									<button
										className="w-full py-3 px-4 bg-white hover:bg-red-600 text-sm text-center text-gray-800 hover:text-white font-bold  hover:shadow-md transform transition-transform duration-700 focus:outline-none"
										onClick={handleLogout}
									>
										Đăng xuất
									</button>
								)}
							</div>
						</div>
					</nav>
				</div>
			</div>
		</>
	);
};

export default Header;

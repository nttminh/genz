import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../logo2.svg';
import { motion } from "framer-motion";

type Props = {};

const Footer = (props: Props) => {
	return (
		<motion.footer
			className="p-4 rounded-lg shadow md:px-6 md:py-8"
			layout
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<div className=" sm:flex sm:items-center sm:justify-between">
				<Link
					to="/"
					className="flex justify-center items-center mb-4 sm:mb-0"
				>
					<img
						src="/logo2.svg"
						className="mr-3 h-8"
						alt="GenZ Logo"
					/>

					<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
						GenZ
					</span>
				</Link>
				<ul className="flex flex-wrap justify-center items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
					<li>
						<a
							href="https://github.com/nttminh/genz#readme"
							className="mr-4 hover:underline md:mr-6 "
						>
							About
						</a>
					</li>
					{/* <li>
						<Link to="#" className="mr-4 hover:underline md:mr-6">
							Privacy Policy
						</Link>
					</li>
					<li>
						<Link to="#" className="mr-4 hover:underline md:mr-6 ">
							Licensing
						</Link>
					</li> */}
					<li>
						<a
							href="https://www.facebook.com/profile.php?id=100010410335268"
							className="hover:underline"
						>
							Contact
						</a>
					</li>
				</ul>
			</div>
			<hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
			<span className="block text-sm text-gray-500 text-center dark:text-gray-400">
				© 2022{' '}
				<Link to="/" className="hover:underline">
					GenZ
				</Link>
				. All Rights Reserved.
			</span>
		</motion.footer>
	);
};

export default Footer;

import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HomeTemplate from './Templates/HomeTemplate';
import HomePage from './Pages/HomePage/HomePage';
import Contact from './Pages/Contact/Contact';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import About from './Pages/About/About';
import Checkout from './Pages/Checkout/Checkout';
import ProtectedRoute from 'Routes/ProtectedRoute';

function App(): React.ReactElement {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="" element={<HomeTemplate />}>
					<Route path="contact" element={<Contact />} />
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
					<Route path="about" element={<About />} />
					<Route
						path="checkout"
						element={
							<ProtectedRoute>
								<Checkout />
							</ProtectedRoute>
						}
					/>
					<Route index element={<HomePage />} />
					<Route path="*" element={<Navigate to={''} />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;

//tsrfc: React.FC
//<TenComponent />: React.ReactElement

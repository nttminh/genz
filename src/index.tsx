import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { MantineProvider, Button, MantineThemeOverride } from '@mantine/core';

//setup redux
import store from './configStore';
// import Demo from "./_Playground/StyledComponents/Demo";
import './index.css';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

const myTheme: MantineThemeOverride = {
	colorScheme: 'dark',
	primaryColor: 'red',
	defaultRadius: 0,
	colors: {
		// override dark colors to change them for all components
		dark: [
			'#d5d7e0',
			'#acaebf',
			'#8c8fa3',
			'#666980',
			'#4d4f66',
			'#34354a',
			'#2b2c3d',
			'#000',
			'#0000',
			'#000',
		],
	},
};

root.render(
	<Provider store={store}>
		<MantineProvider theme={myTheme} withGlobalStyles withNormalizeCSS>
			<App />
		</MantineProvider>
	</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import './index.css';

import {
	MantineProvider,
	Button,
	MantineThemeOverride,
	createEmotionCache,
} from '@mantine/core';

//setup redux
import store from './configStore';
import { SkeletonTheme } from 'react-loading-skeleton';
// import Demo from "./_Playground/StyledComponents/Demo";

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
			'#797979',
			'#636363',
			'#434343',
			'#0d0d0d',
			'#000',
			'#0000',
			'#000',
		],
	},
};

const myCache = createEmotionCache({ key: 'mantine', prepend: false });

root.render(
	<Provider store={store}>
		<SkeletonTheme baseColor="#202020" highlightColor="#444">
			<MantineProvider
				theme={myTheme}
				withGlobalStyles
				withNormalizeCSS
				emotionCache={myCache}
			>
				<App />
			</MantineProvider>
		</SkeletonTheme>
	</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

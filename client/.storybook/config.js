import { configure } from '@storybook/react';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';

function loadStories() {
	const req = require.context('../src', true, /\.stories\.(js|jsx|ts|tsx)$/);
	req.keys().forEach(filename => req(filename));}

configure(loadStories, module);

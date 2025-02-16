import React from 'react';
import { Navbar } from './features/navbar/navbar'
import { Sections } from './features/sections/sections';
import { Tabs } from './features/tabs/tabs';
import { Tab } from './features/tab/components/tab';


function App() {
	return (
		<main>
			<Navbar/>
			<Sections/>
			<Tabs/>
			<Tab/>
		</main>
	);
}

export default App;

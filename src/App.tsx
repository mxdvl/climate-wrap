import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Overview } from "./sections/Overview";
import { Travel } from "./sections/Travel";
// 1. import `ChakraProvider` component

function App() {
	return (
		<ChakraProvider>
			<div className="App">
				<header className="App-header">HEADER HERE</header>

				<Overview />

				<Travel />

				{/* etc */}
			</div>
		</ChakraProvider>
	);
}

export default App;

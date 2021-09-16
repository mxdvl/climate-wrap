import "./App.css";
import { Overview } from "./sections/Overview";
import { Travel } from "./sections/Travel";

function App() {
	return (
		<div className="App">
			<header className="App-header">HEADER HERE</header>

			<Overview />

			<Travel />

			{/* etc */}
		</div>
	);
}

export default App;

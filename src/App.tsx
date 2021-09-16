import { Button, ChakraProvider, Stack } from "@chakra-ui/react";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Overview } from './sections/Overview';
import { Travel } from './sections/Travel';

export const App = (): JSX.Element => {
	return (
		<ChakraProvider>
			<Router>
				<div className="App">
					<header className="App-header">HEADER HERE</header>
					<nav>
						<Stack as="ul" direction="row" listStyleType="none">
							<li>
								<Button as={Link} to="/">
									Home
								</Button>
							</li>
							<li>
								<Button as={Link} to="/overview">
									Overview
								</Button>
							</li>
							<li>
								<Button as={Link} to="/travel">
									Travel
								</Button>
							</li>
						</Stack>
					</nav>
					<hr />
					BODY CONTENT
					<div>
						<Switch>
							<Route path="/overview">
								<Overview />
							</Route>
							<Route path="travel">
								<Travel />
							</Route>
						</Switch>
					</div>
				</div>
			</Router>
		</ChakraProvider>
	);
};

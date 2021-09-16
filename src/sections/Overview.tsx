const sections = ["Travel", "Community", "Home", "Spending", "Social"];

export const Overview = (): JSX.Element => (
	<div>
		<h3>OVERVIEW section</h3>
		<ul>
			{sections.map((section) => (
				<li>{section}</li>
			))}
		</ul>
	</div>
);

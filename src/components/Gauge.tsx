import './Gauge.css';

type Props = {
	score: number;
	title: string;
	average: number;
};

export const Gauge = ({ score, title, average }: Props) => (
	<div className="gauge">
		<div className="gauge__body">
			<div
				className="gauge__fill"
				style={{ transform: `rotate(${score / 2}turn)` }}
			></div>
			<div className="gauge__cover"></div>
			<hr
				className="gauge__lever"
				style={{ transform: `rotate(${average / 2}turn)` }}
			></hr>
		</div>
		<h3 style={{ textAlign: 'center' }}>{title}</h3>
	</div>
);

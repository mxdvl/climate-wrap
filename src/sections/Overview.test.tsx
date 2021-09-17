import { boxFromCarbon } from './Overview';

describe('boxFromCarbon', () => {
	it.each([
		[2500, 5, 5],
		[1600, 4, 4],
		[1200, 3, 4],
		[1000, 3, 3],
		[10, 1, 1],
	])('should work with %s kg C02, [%f,%f]', (co2, width, height) => {
		expect(boxFromCarbon(co2)).toEqual([width, height]);
	});
});

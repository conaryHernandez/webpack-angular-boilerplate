import { reverse } from '../../app/js/extras';

describe('the extras module', () => {

	describe('has a method called reverse which', () => {
		it('reverses the string that it is passed', () => {
			const result = reverse('test');

			expect(result).toEqual('tset');
		});
	});
});
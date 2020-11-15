import { render } from '@testing-library/react';
import React from 'react';
import Error from './Error';

describe("Error", () => {
	it('rernder Error', () => {
		const { container } = render((
			<Error />
			))
			expect(container).toHaveTextContent("재접속")
	})

})
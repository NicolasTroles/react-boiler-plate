import React from 'react';
import { render, cleanup } from 'test/provider';

import Login from './Login';

afterEach(cleanup);

test('<Login /> - Testando funcionamento do teste', () => {

    const { getByTestId } = render(<Login />);

    expect(getByTestId('title')).toHaveTextContent('Dispatcher');
});

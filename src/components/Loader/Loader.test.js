import React from 'react';
import { render } from '@testing-library/react';
import Loader from './Loader';

test('renders Loader component without errors', () => {
  render(<Loader />);
});

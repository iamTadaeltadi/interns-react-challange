import React from 'react';
import { render } from '@testing-library/react';
import ActorCard from './ActorCard';

const dummyActor = {
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  url: 'https://swapi.dev/api/people/1/'
};

test('renders actor card with dummy data', () => {
  const { getByText } = render(<ActorCard actor={dummyActor} />);

  expect(getByText('Luke Skywalker')).toBeInTheDocument();
  expect(getByText('Height: 172Cm')).toBeInTheDocument();
  expect(getByText('Mass: 77Kg')).toBeInTheDocument();
  expect(getByText('Hair Color: blond')).toBeInTheDocument();
  expect(document.querySelector('a')).toHaveAttribute('href', '/actor/1');
});

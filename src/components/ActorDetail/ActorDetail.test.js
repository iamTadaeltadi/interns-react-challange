import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ActorDetail from './ActorDetail';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useHistory: jest.fn(),
}));

jest.mock('react-query', () => ({
  ...jest.requireActual('react-query'),
  useQuery: jest.fn(),
}));

jest.mock('../Loader/Loader', () => () => <div data-testid="loader">Loading...</div>);
jest.mock('../ErrorBoundary/ErrorBoundary', () => ({ children }) => <div data-testid="error">{children}</div>);

const mockActor = {
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  gender: 'male',
  films: [
    { title: 'A New Hope', description: 'The first film in the Star Wars saga' },
    { title: 'The Empire Strikes Back', description: 'The second film in the Star Wars saga' },
  ],
};

const mockUseParams = jest.fn();
const mockUseHistory = jest.fn();
const mockUseQuery = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  mockUseParams.mockReturnValue({ id: '1' });
  mockUseHistory.mockReturnValue({});
  mockUseQuery.mockReturnValue({ data: mockActor, isLoading: false, error: null });
});

test('renders actor detail with films', () => {
  render(
    <Router>
      <ActorDetail />
    </Router>
  );

  expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  expect(screen.getByText('Height: 172Cm')).toBeInTheDocument();
  expect(screen.getByText('Mass: 77Kg')).toBeInTheDocument();
  expect(screen.getByText('Hair Color: blond')).toBeInTheDocument();
  expect(screen.getByText('Skin Color: fair')).toBeInTheDocument();
  expect(screen.getByText('Eye Color: blue')).toBeInTheDocument();
  expect(screen.getByText('Gender: male')).toBeInTheDocument();
  expect(screen.getByText('Films')).toBeInTheDocument();
  expect(screen.getByText('A New Hope')).toBeInTheDocument();
  expect(screen.getByText('The Empire Strikes Back')).toBeInTheDocument();
});

test('renders loader while loading', () => {
  mockUseQuery.mockReturnValue({ data: null, isLoading: true, error: null });
  
  render(
    <Router>
      <ActorDetail />
    </Router>
  );

  expect(screen.getByTestId('loader')).toBeInTheDocument();
});

test('renders error message if there is an error', () => {
  const errorMessage = 'Failed to load data';

  mockUseQuery.mockReturnValue({ data: null, isLoading: false, error: { message: errorMessage } });
  
  render(
    <Router>
      <ActorDetail />
    </Router>
  );

  expect(screen.getByText(errorMessage)).toBeInTheDocument();
});

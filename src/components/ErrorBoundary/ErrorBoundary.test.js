import React from 'react';
import { render } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

const DummyComponent = () => <div>Hello, world!</div>;

test('renders children when no error occurs', () => {
  const { getByText } = render(
    <ErrorBoundary>
      <DummyComponent />
    </ErrorBoundary>
  );

  expect(getByText('Hello, world!')).toBeInTheDocument();
});

test('renders error message when an error occurs', () => {
  // Mock console.error to prevent logging error messages to the console during the test
  const originalError = console.error;
  console.error = jest.fn();

  class ErrorComponent extends React.Component {
    componentDidMount() {
      throw new Error('Test error');
    }

    render() {
      return null;
    }
  }

  const { getByText } = render(
    <ErrorBoundary>
      <ErrorComponent />
    </ErrorBoundary>
  );

  expect(getByText('Something went wrong.')).toBeInTheDocument();

  // Restore console.error
  console.error = originalError;
});

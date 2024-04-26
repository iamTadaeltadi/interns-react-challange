import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: '' // Add errorMessage state
    };
  }

  static getDerivedStateFromError(error) {
    // Update state to trigger the error UI and set errorMessage
    return { hasError: true, errorMessage: error.toString() };
  }

  render() {
    if (this.state.hasError) {
      // Render the error message UI
      return (
        <div>
          <h2>Something went wrong.</h2>
          <p>{this.state.errorMessage}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

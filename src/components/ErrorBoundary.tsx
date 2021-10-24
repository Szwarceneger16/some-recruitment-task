import { Component, ReactNode } from 'react';
import { ErrorPage } from 'pages/error';

interface ErrorBoundaryInterface {
  hasError: boolean;
}

export class ErrorBoundary extends Component<unknown, ErrorBoundaryInterface> {
  constructor(props: unknown) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryInterface {
    return { hasError: true };
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return <ErrorPage />;
    }
    return this.props.children;
  }
}

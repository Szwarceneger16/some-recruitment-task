import React, { ReactPropTypes } from "react";

interface ErrorBoundaryInterface {
  hasError: Boolean;
}

export class ErrorBoundary extends React.Component<
  any,
  ErrorBoundaryInterface
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h2>Coś psozło nie tak</h2>;
    }
    return this.props.children;
  }
}

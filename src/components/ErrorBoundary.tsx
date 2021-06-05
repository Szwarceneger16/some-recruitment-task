import React, { ReactPropTypes } from "react";

export class ErrorBoundary extends React.Component {
  constructor(props: ReactPropTypes) {
    super(props);
    this.state : { hasError : Boolean} = { hasError: false };
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

import * as React from 'react';

export interface Props {
  fallback: React.ReactNode;
}
export interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }
  static defaultProps = {
    fallback: <h1>Something went wrong.</h1>,
  };

  static getDerivedStateFromError(): Partial<State> {
    return { hasError: true };
  }

  render(): React.ReactNode {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

// src/components/common/ErrorBoundary.tsx
import React from "react";

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Error caught in boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h2>⚠️ Oops! Something went wrong.</h2>
          <p>Try refreshing the page, or check back later.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

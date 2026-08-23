import { Component, type ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    console.error(error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary" role="alert">
          <p className="eyebrow">SOMETHING WENT WRONG</p>
          <h1>Unexpected error.</h1>
          <button type="button" className="button button--primary" onClick={() => window.location.reload()}>
            RELOAD PAGE
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

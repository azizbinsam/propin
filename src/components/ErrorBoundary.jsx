import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 bg-red-50 border border-red-200 rounded-xl">
          <h2 className="text-red-700 font-bold">Terjadi Error</h2>
          <pre className="text-sm text-red-600 mt-2 whitespace-pre-wrap">
            {this.state.error?.message || 'Unknown error'}
          </pre>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 btn-primary text-sm py-2"
          >
            Refresh Halaman
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
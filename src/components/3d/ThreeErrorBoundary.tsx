"use client";

import React, { Component, ReactNode } from "react";
import Typography from "@/components/atoms/Typography";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ThreeErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("3D Component Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex items-center justify-center h-full bg-slate-800/30 rounded-xl border border-red-500/20">
            <div className="text-center p-8">
              <div className="text-4xl mb-4">🔧</div>
              <Typography variant="h4" className="text-red-400 mb-2">
                3D Content Unavailable
              </Typography>
              <Typography variant="body2" className="text-gray-400 mb-4">
                Your browser may not support WebGL or Three.js
              </Typography>
              <Typography variant="caption" className="text-gray-500">
                Error: {this.state.error?.message}
              </Typography>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ThreeErrorBoundary;

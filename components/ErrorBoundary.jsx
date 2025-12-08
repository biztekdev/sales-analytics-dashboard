"use client"

import React from "react"
import MaintenancePage from "@/components/maintenance/MaintenancePage"

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
    this.reloadTimer = null
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo)
    
    // Auto reload after 30 seconds
    this.reloadTimer = setTimeout(() => {
      window.location.reload()
    }, 30000)
  }

  componentWillUnmount() {
    if (this.reloadTimer) {
      clearTimeout(this.reloadTimer)
    }
  }

  handleRetry = () => {
    if (this.reloadTimer) {
      clearTimeout(this.reloadTimer)
    }
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return <MaintenancePage onRetry={this.handleRetry} />
    }

    return this.props.children
  }
}

export default ErrorBoundary

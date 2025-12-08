import { useEffect } from "react"
import MaintenancePage from "@/components/maintenance/MaintenancePage"

function Error({ statusCode }) {
  useEffect(() => {
    // Auto reload after 30 seconds
    const timer = setTimeout(() => {
      window.location.reload()
    }, 30000)

    return () => clearTimeout(timer)
  }, [])

  const handleRetry = () => {
    window.location.reload()
  }

  return <MaintenancePage onRetry={handleRetry} />
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error

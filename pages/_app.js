import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme/theme-context";
import { SocketDataProvider } from "@/components/socket/socket-data-context";
import ErrorBoundary from "@/components/ErrorBoundary";
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/grid"

export default function App({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <SocketDataProvider>
          <Component {...pageProps} />
        </SocketDataProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

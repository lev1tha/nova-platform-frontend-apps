import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return
  }
  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  const { worker } = await import("./mocks/browser")
  return worker.start({
    onUnhandledRequest: "bypass", // Ignores unprocessed requests
  })
}

enableMocking()
  .then(() => {
    ReactDOM.createRoot(document.getElementById("root")!).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )
  })
  .catch((error) => {
    console.error("Failed to initialize the app:", error)
  })

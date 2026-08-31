"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          color: "#1a1a1a",
          background: "#f8f4ee",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "28rem", padding: "2rem" }}>
          <p
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#8b7355",
              marginBottom: "1rem",
            }}
          >
            Error
          </p>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: 300,
              marginBottom: "1.5rem",
            }}
          >
            Something went wrong
          </h1>
          <p style={{ fontSize: "1rem", color: "#6b6b6b", marginBottom: "2.5rem" }}>
            An unexpected error occurred. Please try again.
          </p>
          <button
            onClick={reset}
            style={{
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              padding: "0.875rem 2.5rem",
              background: "#1a1a1a",
              color: "#f8f4ee",
              border: "none",
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}

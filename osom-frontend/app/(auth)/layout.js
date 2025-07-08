// app/(auth)/layout.js

import { AuthProvider } from "../(main)/components/AuthContext"; // adjust if path differs

export default function AuthLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#000", color: "#fff" }}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

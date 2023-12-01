import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import { AuthProvider, ProtectedRoute } from "./contexts/auth";
import "@/styles/globals.css";

export const metadata = {
  title: "BKStudy",
  description: "Study more, learn more",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="vi">
      <body>
        <AuthProvider>
            <Navbar />
            <main className="app min-h-[27rem]">{children}</main>
            <Footer />
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;

import "@styles/globals.css";
import Nav from "@components/Nav";

export const metadata = {
  title: "BKStudy",
  description: "Study more, learn more",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="vi">
      <body>
        <Nav />
        <main className="app">
          {children}
        </main>

      </body>
    </html>
  );
};

export default RootLayout;

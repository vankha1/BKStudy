import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import "@/styles/globals.css"

export const metadata = {
  title: "BKStudy",
  description: "Study more, learn more",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="vi">
      <body>
        <Navbar/>
        <main className="app">
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
};

export default RootLayout;

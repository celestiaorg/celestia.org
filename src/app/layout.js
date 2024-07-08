import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import ScrollPositionProvider from "@/utils/scrollLock";
import "./styles/fonts.css";
import "./styles/globals.css";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={``}>
        <ScrollPositionProvider>
          <Nav />
          <main id={'main-content'}>
            {children}
          </main>
          <Footer />
        </ScrollPositionProvider>
      </body>
    </html>
  );
}

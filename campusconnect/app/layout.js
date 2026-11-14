import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";

const font = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "CampusConnect",
  description: "Student management portal",
};

const themeScript = `
  (function () {
    try {
      var t = localStorage.getItem("theme");
      if (!t) {
        t = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      }
      document.documentElement.dataset.theme = t;
    } catch (e) {}
  })();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={font.className}>{children}</body>
    </html>
  );
}
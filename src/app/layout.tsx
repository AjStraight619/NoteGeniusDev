import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import styles from "./page.module.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Finished Note",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body className={inter.className}>
        <div className={styles.navbar}>
          <div className={styles.logo}></div>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link href="/" className={styles.navLink}>
                Home
              </Link>
              <Link href="/create-note" className={styles.navLink}>
                Create Note
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.main}>{children}</div>
      </body>
    </html>
  );
}

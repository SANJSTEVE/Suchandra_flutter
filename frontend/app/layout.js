import './globals.css';

export const metadata = {
  title: 'Sanjaykumar S — Portfolio',
  description: 'Associate Software Engineer & Generative AI Engineer. Building production-ready AI systems and multi-agent workflows.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}



import { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import './globals.css'; // Assuming you have global styles set up here.

interface RootLayoutProps {
  children: ReactNode;
}
const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body>
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6 bg-gray-50">{children}</main>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;

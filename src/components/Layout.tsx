import { ReactNode } from 'react';
import Navbar from './Navbar';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>{children}</main>
      <footer className="border-t border-border py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="vintage-divider mb-6 mx-auto max-w-xs" />
          <p className="font-serif text-lg text-primary mb-1">家族记忆</p>
          <p className="text-sm text-muted-foreground">珍藏每一段温暖的回忆 · Heritree</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

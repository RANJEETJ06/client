import React, { ReactNode } from 'react';
import Topbar from './components/Topbar';
interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC <LayoutProps>= ({ children }) => {
  return (
    <div >
      <Topbar title="Expense Monitor"/>
      <div className="flex justify-center flex-wrap ">
        {children}
      </div>
    </div>
  );
};

export default Layout;

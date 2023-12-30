import { createContext, useState } from "react";

export const SidebarContext = createContext();

function DrawerContext({ children }) {
  const [mobileDrawer, setMobileDrawer] = useState(false);
  const [progress, setProgress] = useState(0);

  const openDrawer = () => {
    setMobileDrawer(true);
  };

  const closeDrawer = () => {
    setMobileDrawer(false);
  };

  return (
    <SidebarContext.Provider
      value={{ mobileDrawer, openDrawer, closeDrawer, progress, setProgress }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export default DrawerContext;

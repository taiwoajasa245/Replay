// SidebarContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

type SidebarContextType = {
  showSidebar: boolean;
  toggleSidebar: () => void;
  
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => setShowSidebar((prev) => !prev);
  

  return (
    <SidebarContext.Provider value={{ showSidebar, toggleSidebar  }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

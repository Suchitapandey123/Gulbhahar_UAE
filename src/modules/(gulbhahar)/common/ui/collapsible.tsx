"use client";

import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";

interface CollapsibleProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

const CollapsibleContext = React.createContext<{ open: boolean }>({
  open: false,
});

export const Collapsible = ({
  open,
  onOpenChange,
  children,
}: CollapsibleProps) => {
  return (
    <CollapsibleContext.Provider value={{ open }}>
      <div className="w-full">{children}</div>
    </CollapsibleContext.Provider>
  );
};

export const CollapsibleTrigger = ({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  );
};

export const CollapsibleContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { open } = React.useContext(CollapsibleContext);

  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial="collapsed"
          animate="open"
          exit="collapsed"
          variants={{
            open: { opacity: 1, height: "auto" },
            collapsed: { opacity: 0, height: 0 },
          }}
          transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

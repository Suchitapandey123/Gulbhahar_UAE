import React from "react";

export default function AccountLayout({ children }) {
    return (
      <div className="flex">
        {/* Main Content */}
        <main className="flex-1 p-2">
          {children}
        </main>
      </div>
    );
  }
  
  
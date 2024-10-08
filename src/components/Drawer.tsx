"use client";
import { X } from "lucide-react";
import React, { useEffect, useRef } from "react";
interface IDrawer {
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
}
const Drawer = ({ children, open, setOpen, title }: IDrawer) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = ''; // Ensure scrolling is restored on cleanup
    };
  }, [open, setOpen]);
  return (
    <div
      ref={drawerRef}
      className={`p-5 z-50 rounded-t-md overflow-auto custom-shadow fixed bottom-0 left-0 w-full bg-white shadow-lg transition-transform duration-300 ${
        open ? "translate-y-0" : "translate-y-full"
      }`}
      data-testid="drawer"
      style={{ height: "100vh" }}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-10 ">
          <h2 className="text-xl font-bold ">{title}</h2>
          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Drawer;

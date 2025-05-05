'use client';

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

const NavbarWrapper = () => {
  const pathname = usePathname();
  const [hash, setHash] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHash(window.location.hash);
    }
  }, []);

  if (pathname === "/PrivacyPolicy" && hash === "#cookies") {
    return null;
  }

  return <div className="relative z-40"><Navbar /></div>;
};

export default NavbarWrapper;

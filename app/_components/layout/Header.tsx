import React from "react";
import { motion } from "framer-motion";
import Navbar from "../ui/navbar/Navbar";
import Banner from "../ui/banner/Banner";
import useScrollDirection from "@/hooks/useScrollDirection";

const Header = () => {
  const scrollDir = useScrollDirection();
  return (
    <>
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: scrollDir === "down" ? -135 : 0 }}
        transition={{ ease: "easeInOut", duration: 0.7 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          background: "blue",
          height: "60px",
          zIndex: 40,
        }}
      >
        <Banner />
        <Navbar />
      </motion.nav>
    </>
  );
};

export default Header;

"use client";
import * as React from "react";
import { Navbar } from "flowbite-react";
const NavBar = () => {
  return (
    <Navbar
    fluid={true}
    rounded={true} className="px-2 py-2.5 dark:border-gray-700 bg-gray-800 sm:px-4 rounded"
  >
    <Navbar.Brand href="/">
 
      <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
        The Collectibles
      </span>
    </Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse>
      <Navbar.Link
        href="/"
        className="text:white"
      >
        Home
      </Navbar.Link>
      <Navbar.Link href="/brands">
        Brands
      </Navbar.Link>
      <Navbar.Link href="/hot-toys">
        Hot Toys
      </Navbar.Link>
    </Navbar.Collapse>
  </Navbar>
  );
};

export default NavBar
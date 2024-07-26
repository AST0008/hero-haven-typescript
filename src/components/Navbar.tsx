import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <h2>Hero-Haven</h2>
      <div className="links">
        <Link to="/"> Dashboard</Link>
        <Link to="/heros"> Heros</Link>
      </div>
    </div>
  );
};

export default Navbar;

import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <NavLink to="/">Login</NavLink>
      <NavLink to="/create">Register</NavLink>
    </nav>
  );
}

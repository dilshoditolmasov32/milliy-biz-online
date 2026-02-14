import { NavLink } from "react-router-dom";

export default function AuthNavItem({
  user,
  to,
  onAuthRequired,
  children,
}) {
  if (!user) {
    return (
      <button
        type="button"
        className="media__link"
        onClick={onAuthRequired}
      >
        {children}
      </button>
    );
  }

  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `media__link ${isActive ? "choosen" : ""}`
      }
    >
      {children}
    </NavLink>
  );
}
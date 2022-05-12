import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserAvatar } from "components";

const activeStyle = {
  backgroundColor: "#001e39",
  borderRadius: "9999px",
  padding: "0.75rem",
  width: "max-content",
  fontWeight: "bold",
};

export const Sidebar = () => {
  const {
    user: { fullName, username },
  } = useSelector((state) => state.auth);

  return (
    <aside className="sticky flex flex-col justify-between h-screen top-0 overflow-y-auto overflow-x-hidden px-3 py-4">
      <ul className="flex flex-col gap-6 tracking-wide">
        <li className="pb-3 px-3">
          <Link to="/" className="flex items-center">
            <img src="/sapphire.svg" alt="Sapphire" className="h-6 w-6 mr-2" />
            <span className="text-xl">Sapphire</span>
          </Link>
        </li>

        <li>
          <NavLink
            to="/"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            className="p-3 w-max hover:bg-darkSecondary hover:rounded-full"
          >
            <i className="fa-solid fa-house pr-2"></i> Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/explore"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            className="p-3 w-max hover:bg-darkSecondary hover:rounded-full"
          >
            <i className="fa-solid fa-hashtag pr-2"></i> Explore
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/notifications"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            className="p-3 w-max hover:bg-darkSecondary hover:rounded-full"
          >
            <i className="fa-solid fa-bell pr-2"></i> Notifications
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/bookmarks"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            className="p-3 w-max hover:bg-darkSecondary hover:rounded-full"
          >
            <i className="fa-solid fa-bookmark pr-2"></i> Bookmarks
          </NavLink>
        </li>
      </ul>

      <ul className="tracking-wide">
        <li>
          <NavLink
            to={`/profile/${username}`}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            className="p-3 w-max flex items-center justify-center gap-2 hover:bg-darkSecondary hover:rounded-full"
          >
            <UserAvatar />

            <div className="text-sm">
              <p className="font-bold">{fullName}</p>
              <p className="text-lightGrey font-normal">@{username}</p>
            </div>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveSort } from "features/post";
import { useOnClickOutside } from "hooks/useOnClickOutside";

export const SortBar = () => {
  const [showSortModal, setShowSortModal] = useState(false);

  const { activeSort } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const modalRef = useRef();

  useOnClickOutside(modalRef, setShowSortModal);

  return (
    <div className="w-full px-4 py-2 flex justify-between items-center border-b border-darkGrey">
      <div>{activeSort} Posts</div>
      <div style={sidebarStyle}>
      <h2 style={headerStyle}>My Sidebar</h2>
      <ul style={listStyle}>
        {links.map((link) => (
          <li key={link.path} style={listItemStyle}>
            <a href={link.path} style={linkStyle}>
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>

      <div className="relative" ref={modalRef}>
        <button
          className=" hover:bg-darkSecondary hover:rounded-full p-1 px-2"
          onClick={() => setShowSortModal((prev) => !prev)}
        >
          <i className="fa-solid fa-sliders"></i>
        </button>

        {showSortModal ? (
          <div className="absolute right-0 w-max text-sm flex flex-col gap-1.5 items-start py-2 px-3 bg-dark rounded shadow-dark shadow-lg border border-darkGrey z-10">
            <button
              style={{ color: activeSort === "Trending" ? "#1d9bf0" : "" }}
              onClick={() => {
                dispatch(setActiveSort("Trending"));
                setShowSortModal(false);
              }}
            >
              <i className="fa-solid fa-arrow-trend-up pr-2"></i>Trending
            </button>
            <button
              style={{ color: activeSort === "Latest" ? "#1d9bf0" : "" }}
              onClick={() => {
                dispatch(setActiveSort("Latest"));
                setShowSortModal(false);
              }}
            >
              <i className="fa-solid fa-arrow-up pr-2"></i>Lastest
            </button>
            <button
              style={{ color: activeSort === "Oldest" ? "#1d9bf0" : "" }}
              onClick={() => {
                dispatch(setActiveSort("Oldest"));
                setShowSortModal(false);
              }}
            >
              <i className="fa-solid fa-arrow-down pr-2"></i>Oldest
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

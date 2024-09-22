import React from "react";

const SearchIcon = ({ className }: { className: string }) => {
  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#838DA6"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        //@ts-expect-error ignoring because of svg
        class="lucide lucide-search"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    </div>
  );
};

export default SearchIcon;

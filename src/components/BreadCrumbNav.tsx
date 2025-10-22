import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function BreadcrumbNav() {
  const location = useLocation();
  const pathname = location.pathname;
  const parts = pathname.split("/").filter(Boolean);

  const formatName = (segment: string): string =>
    segment
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  const crumbs = parts.map((part, i) => ({
    name: formatName(part),
    path: "/" + parts.slice(0, i + 1).join("/"),
  }));

  return (
    <nav className="flex items-center bg-white gap-1 text-sm px-8 py-2 border-b border-gray-200 text-gray-500">
      <Link to="/" className="flex items-center gap-1 font-medium text-gray-500 hover:text-gray-700 no-underline">
        Haaflah
      </Link>

      {crumbs.map((crumb, i) => (
        <React.Fragment key={crumb.path}>
          <span className="text-gray-400 mx-1">›</span>
          {i === crumbs.length - 1 ? (
            <span className="text-gray-900 font-semibold">{crumb.name}</span>
          ) : (
            <Link to={crumb.path} className="text-gray-500 hover:text-gray-700 hover:underline no-underline">
              {crumb.name}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

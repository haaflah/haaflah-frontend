import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function BreadcrumbNav() {
  const location = useLocation();
  const pathname = location.pathname;
  const parts = pathname.split("/").filter(Boolean);

  // Capitalize each word and replace hyphens with spaces
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
    <nav className="breadcrumb-nav">
      <Link to="/" className="breadcrumb-home">
        Haaflah
      </Link>

      {crumbs.map((crumb, i) => (
        <React.Fragment key={crumb.path}>
          <span className="breadcrumb-separator">›</span>
          {i === crumbs.length - 1 ? (
            <span className="breadcrumb-current">{crumb.name}</span>
          ) : (
            <Link to={crumb.path} className="breadcrumb-link">
              {crumb.name}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

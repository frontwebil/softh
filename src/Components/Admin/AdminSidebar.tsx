"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LuBadgePercent, LuMessageSquareQuote } from "react-icons/lu";

const links = [
  { href: "/admin", label: "Ціни", icon: LuBadgePercent },
  {
    href: "/admin/testimonials",
    label: "Відгуки",
    icon: LuMessageSquareQuote,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar">
      <Link href="/admin" className="admin-sidebar-logo">
        Softh
      </Link>

      <nav className="admin-sidebar-nav">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`admin-sidebar-link${pathname === href ? " active" : ""}`}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>

      <div className="admin-sidebar-bottom">
        <Link href={"/"}
          type="button"
          className="admin-sidebar-bottom-link-to-site"
        >
          На сайт
        </Link>

        <button
          type="button"
          className="admin-sidebar-logout"
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
        >
          Вийти
        </button>
      </div>
    </aside>
  );
}

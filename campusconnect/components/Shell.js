"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import {
  FiHome, FiBook, FiUsers, FiClipboard, FiUser, FiSettings,
  FiMenu, FiBell, FiSun, FiMoon, FiLogOut, FiSearch, FiArrowRight,
} from "react-icons/fi";
import Logo from "@/components/Logo";
import { courses, assignments, students } from "@/lib/data";
import { useRole, clearRole, teacher } from "@/lib/role";

const links = [
  ["/dashboard", "Dashboard", FiHome, false],
  ["/courses", "Courses", FiBook, false],
  ["/students", "Students", FiUsers, true],
  ["/assignments", "Assignments", FiClipboard, false],
  ["/profile", "Profile", FiUser, false],
  ["/settings", "Settings", FiSettings, false],
];

const studentNotifs = [
  { id: 1, text: "New assignment posted in Web Technologies", time: "10 min ago", read: false },
  { id: 2, text: "React Project is due on 10 Nov", time: "1 hour ago", read: false },
  { id: 3, text: "Database Design marked as submitted", time: "Yesterday", read: true },
];

const teacherNotifs = [
  { id: 1, text: "1 submission is waiting for your review", time: "5 min ago", read: false },
  { id: 2, text: "2 students have attendance below 80%", time: "1 hour ago", read: false },
  { id: 3, text: "Full Stack Development syllabus was updated", time: "Yesterday", read: true },
];

export default function Shell({ children }) {
  const path = usePathname();
  const router = useRouter();
  const role = useRole();
  const [open, setOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifs, setNotifs] = useState(studentNotifs);
  const [theme, setTheme] = useState("light");
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const notifRef = useRef(null);
  const searchRef = useRef(null);

  const unread = notifs.filter((n) => !n.read).length;
  const isTeacher = role === "teacher";
  const userName = isTeacher ? teacher.name : "Aarav Mehta";
  const userInitials = isTeacher ? teacher.initials : "AM";
  const visibleLinks = links.filter(([, , , teacherOnly]) => !teacherOnly || isTeacher);

 const q = query.trim().toLowerCase();
  const has = (text) => text.toLowerCase().includes(q);

  const myCourses = courses.filter((c) => !isTeacher || teacher.courseIds.includes(c.id));
  const myCourseNames = myCourses.map((c) => c.name);

  const groups = q
    ? [
        {
          label: "Pages",
          icon: FiArrowRight,
          items: visibleLinks
            .filter(([, label]) => has(label))
            .map(([href, label]) => ({ key: href, href, title: label, sub: "Go to page" })),
        },
        {
          label: "Courses",
          icon: FiBook,
          items: myCourses
            .filter((c) => has(c.name) || has(c.code))
            .map((c) => ({ key: `c${c.id}`, href: `/courses/${c.id}`, title: c.name, sub: c.code })),
        },
        {
          label: "Assignments",
          icon: FiClipboard,
          items: assignments
            .filter((a) => myCourseNames.includes(a.course) && (has(a.title) || has(a.course)))
            .map((a) => ({ key: `a${a.id}`, href: "/assignments", title: a.title, sub: `${a.course} · ${a.status}` })),
        },
        ...(isTeacher
          ? [
              {
                label: "Students",
                icon: FiUser,
                items: students
                  .filter((s) => has(s.name) || has(s.dept))
                  .map((s) => ({ key: `s${s.id}`, href: `/students/${s.id}`, title: s.name, sub: s.dept })),
              },
            ]
          : []),
      ]
        .map((g) => ({ ...g, items: g.items.slice(0, 4) }))
        .filter((g) => g.items.length > 0)
    : [];

  const firstResult = groups.length ? groups[0].items[0] : null;

  function resetSearch() {
    setQuery("");
    setSearchOpen(false);
  }

  function handleSearchKey(e) {
    if (e.key === "Enter" && firstResult) {
      router.push(firstResult.href);
      resetSearch();
    }
    if (e.key === "Escape") {
      setSearchOpen(false);
    }
  }

  useEffect(() => {
    if (role) setNotifs(role === "teacher" ? teacherNotifs : studentNotifs);
  }, [role]);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || "light");
  }, []);

  useEffect(() => {
    function handleClick(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
  }

  function markAllRead() {
    setNotifs(notifs.map((n) => ({ ...n, read: true })));
  }

  function logout() {
    clearRole();
    router.push("/login");
  }

  return (
    <div className="app">
      <aside className={`side ${open ? "open" : ""}`}>
        <Link href="/" className="logo">
          <Logo />
        </Link>
        <nav aria-label="Main">
          {visibleLinks.map(([href, label, Icon]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={path === href || path.startsWith(href + "/") ? "active" : ""}
            >
              <Icon aria-hidden="true" /> {label}
            </Link>
          ))}
        </nav>
      </aside>

      {open && <div className="scrim" onClick={() => setOpen(false)} />}

      <div className="main">
        <header className="top">
          <button className="menu" aria-label="Open menu" onClick={() => setOpen(true)}>
            <FiMenu />
          </button>

          <div className="search search-box" ref={searchRef}>
            <FiSearch aria-hidden="true" />
            <input
              type="text"
              placeholder="Search anything..."
              aria-label="Search"
              autoComplete="off"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSearchOpen(true);
              }}
              onFocus={() => setSearchOpen(true)}
              onKeyDown={handleSearchKey}
            />

            {searchOpen && q && (
              <div className="search-results">
                {groups.length === 0 ? (
                  <p className="search-empty">No results for "{query.trim()}"</p>
                ) : (
                  groups.map((g) => (
                    <div key={g.label}>
                      <div className="search-label">{g.label}</div>
                      {g.items.map((item) => (
                        <Link
                          key={item.key}
                          href={item.href}
                          className={`search-item ${item === firstResult ? "on" : ""}`}
                          onClick={resetSearch}
                        >
                          <g.icon aria-hidden="true" />
                          <span>
                            <strong>{item.title}</strong>
                            <small>{item.sub}</small>
                          </span>
                        </Link>
                      ))}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          <button
            className="bell"
            aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
            onClick={toggleTheme}
          >
            {theme === "light" ? <FiMoon /> : <FiSun />}
          </button>

          <div className="notif" ref={notifRef}>
            <button
              className="bell"
              aria-label={`Notifications, ${unread} unread`}
              aria-expanded={notifOpen}
              onClick={() => setNotifOpen(!notifOpen)}
            >
              <FiBell />
              {unread > 0 && <i>{unread}</i>}
            </button>

            {notifOpen && (
              <div className="notif-box">
                <div className="notif-head">
                  <span>Notifications</span>
                  {unread > 0 && <button onClick={markAllRead}>Mark all as read</button>}
                </div>
                {notifs.length === 0 ? (
                  <p className="notif-empty">No notifications yet.</p>
                ) : (
                  <ul className="notif-list">
                    {notifs.map((n) => (
                      <li key={n.id} className={n.read ? "" : "unread"}>
                        {n.text}
                        <small>{n.time}</small>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          <Link href="/profile" className="me">
            <span className="av">{userInitials}</span>
            <span className="hide-sm">{userName}</span>
          </Link>
          <button className="btn ghost" onClick={logout}>
            <FiLogOut /> Logout
          </button>
        </header>

        <main>{children}</main>
        <footer>© 2026 CampusConnect. All rights reserved.</footer>
      </div>
    </div>
  );
}
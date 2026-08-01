import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-card border-r border-border p-6">
      <h1 className="text-xl font-bold text-foreground mb-10 px-3">BMSMan</h1>
      <nav>
        <ul className="space-y-1">
          <li>
            <Link
              href="/dashboard"
              className="flex items-center p-3 text-foreground rounded-lg hover:bg-gray-100 transition-colors"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/organizations"
              className="flex items-center p-3 text-muted hover:text-foreground rounded-lg hover:bg-gray-100 transition-colors"
            >
              Organizations
            </Link>
          </li>
          <li className="p-3 text-muted">Jobs</li>
          <li className="p-3 text-muted">Quotes</li>
        </ul>
      </nav>
    </aside>
  );
}

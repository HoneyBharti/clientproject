import Link from "next/link";
import { Building2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface AdminSidebarProps {
  navItems: NavItem[];
  activeView: string;
  viewHref: Record<string, string>;
  isMobile?: boolean;
  onClose?: () => void;
}

export function AdminSidebar({ navItems, activeView, viewHref, isMobile, onClose }: AdminSidebarProps) {
  return (
    <aside className={cn(
      "w-64 bg-white",
      isMobile ? "fixed left-0 top-0 h-full z-50" : "hidden lg:flex flex-col border-r"
    )}>
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded bg-blue-600 p-2 text-white">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">YourLegal</p>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </div>
          {isMobile && onClose && (
            <button onClick={onClose}>
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
      
      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.key;
          return (
            <Link
              key={item.key}
              href={viewHref[item.key]}
              onClick={isMobile ? onClose : undefined}
              className={cn(
                "flex w-full items-center gap-2 rounded px-3 py-2 text-sm font-medium",
                isActive 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      
      <div className="border-t p-3">
        <p className="text-xs text-gray-500">v2.1.0</p>
      </div>
    </aside>
  );
}
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';

interface AdminHeaderProps {
  title: string;
  subtitle: string;
  date: string;
  onMenuClick: () => void;
}

export function AdminHeader({ title, subtitle, date, onMenuClick }: AdminHeaderProps) {
  const { logout } = useAuth();

  return (
    <header className="border-b bg-white">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <button 
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-gray-900 sm:text-xl">{title}</h1>
            <p className="hidden text-xs text-gray-600 sm:block sm:text-sm">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden text-sm text-gray-500 sm:block">{date}</span>
          <Button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white text-xs sm:text-sm" size="sm" variant="outline">
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
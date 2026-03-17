"use client";

import { useEffect, useState } from "react";
import { Bell, Check, Trash2 } from "lucide-react";

import { notificationsAPI } from "@/lib/admin-api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type NotificationItem = {
  _id?: string;
  id?: string;
  title?: string;
  message?: string;
  category?: string;
  type?: string;
  isRead?: boolean;
  createdAt?: string;
};

const resolveId = (item: NotificationItem) => String(item._id || item.id || "");

const formatTime = (value?: string) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString();
};

export function NotificationsMenu() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const loadNotifications = async () => {
    setLoading(true);
    setMessage("");
    try {
      const data = await notificationsAPI.getMy({ limit: 30 });
      setNotifications(data.notifications || []);
      setUnreadCount(data.unreadCount || 0);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to load notifications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  useEffect(() => {
    if (open) {
      loadNotifications();
    }
  }, [open]);

  const handleMarkAllRead = async () => {
    try {
      await notificationsAPI.markAllAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to mark all as read.");
    }
  };

  const handleMarkRead = async (id: string) => {
    if (!id) return;
    try {
      await notificationsAPI.markAsRead(id);
      setNotifications((prev) => prev.map((n) => (resolveId(n) === id ? { ...n, isRead: true } : n)));
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to mark as read.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!id) return;
    try {
      await notificationsAPI.delete(id);
      setNotifications((prev) => prev.filter((n) => resolveId(n) !== id));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to delete notification.");
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="relative flex h-9 w-9 items-center justify-center rounded-full border border-transparent text-gray-500 hover:text-blue-600 hover:bg-blue-50">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 ? (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
              {unreadCount}
            </span>
          ) : null}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="border-b px-4 py-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Notifications</p>
            <Button size="sm" variant="ghost" onClick={handleMarkAllRead} disabled={unreadCount === 0}>
              Mark all read
            </Button>
          </div>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-sm text-gray-500">Loading notifications...</div>
          ) : message ? (
            <div className="p-4 text-sm text-red-600">{message}</div>
          ) : notifications.length === 0 ? (
            <div className="p-4 text-sm text-gray-500">No notifications yet.</div>
          ) : (
            notifications.map((note) => {
              const id = resolveId(note);
              return (
                <div key={id} className={`border-b px-4 py-3 ${note.isRead ? "bg-white" : "bg-blue-50/50"}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-gray-900">{note.title || "Notification"}</p>
                        {note.category ? <Badge className="border text-[10px] capitalize">{note.category}</Badge> : null}
                      </div>
                      {note.message ? <p className="text-xs text-gray-600">{note.message}</p> : null}
                      {note.createdAt ? <p className="text-[10px] text-gray-400">{formatTime(note.createdAt)}</p> : null}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {!note.isRead ? (
                        <button
                          className="rounded-full p-1 text-gray-400 hover:text-emerald-600"
                          onClick={() => handleMarkRead(id)}
                          aria-label="Mark as read"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                      ) : null}
                      <button
                        className="rounded-full p-1 text-gray-400 hover:text-red-600"
                        onClick={() => handleDelete(id)}
                        aria-label="Delete notification"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

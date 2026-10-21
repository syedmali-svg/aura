import React from "react";
import { INITIAL_NOTIFICATIONS, VideoItem } from "../data/mockData";

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectVideoById: (videoId: string) => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose,
  onSelectVideoById,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-sm bg-[#1b1b1e] h-full p-4 flex flex-col shadow-2xl border-l border-[#353438] animate-in slide-in-from-right duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-[#353438]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#f2ca50]">notifications</span>
            <h3 className="font-headline-md text-headline-md font-bold text-[#e5e1e6]">
              Notifications
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#2a2a2d] flex items-center justify-center text-[#d0c5af] hover:text-[#e5e1e6]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar py-3 flex flex-col gap-3">
          {INITIAL_NOTIFICATIONS.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                if (n.videoId) {
                  onSelectVideoById(n.videoId);
                  onClose();
                }
              }}
              className={`p-3 rounded-xl border flex items-start gap-3 transition-colors ${
                n.videoId ? "cursor-pointer hover:bg-[#2a2a2d]" : ""
              } ${
                n.unread
                  ? "bg-[#1f1f22] border-[#f2ca50]/30"
                  : "bg-[#1b1b1e] border-[#353438]/50 text-[#d0c5af]"
              }`}
            >
              <img
                src={n.avatar}
                alt=""
                className="w-10 h-10 rounded-full object-cover shrink-0 ring-1 ring-[#f2ca50]/30 mt-0.5"
              />
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#e5e1e6] line-clamp-1">
                    {n.title}
                  </span>
                  {n.unread && <span className="w-2 h-2 rounded-full bg-[#f2ca50] shrink-0" />}
                </div>
                <p className="text-[11px] text-[#d0c5af] mt-0.5 line-clamp-2">{n.message}</p>
                <span className="text-[10px] text-[#99907c] mt-1">{n.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

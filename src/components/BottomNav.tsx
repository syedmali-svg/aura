import React from "react";

export type NavTab = "home" | "pulse" | "subs" | "library";

interface BottomNavProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenUpload: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  onOpenUpload,
}) => {
  return (
    <nav className="fixed bottom-0 w-full z-40 pb-safe pointer-events-none">
      <div className="max-w-md mx-auto px-4 pb-3">
        <div className="pointer-events-auto h-16 rounded-full bg-[#1b1b1e]/85 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.7),0_0_20px_rgba(212,175,55,0.08)] border border-[#353438]/50 flex items-center justify-around px-2">
          {/* Home */}
          <button
            onClick={() => onSelectTab("home")}
            className={`flex flex-col items-center justify-center w-14 h-12 transition-all active:scale-95 ${
              currentTab === "home"
                ? "text-[#f2ca50] font-semibold drop-shadow-[0_0_8px_rgba(242,202,80,0.4)]"
                : "text-[#d0c5af] hover:text-[#f2ca50]"
            }`}
          >
            <span
              className="material-symbols-outlined text-[22px]"
              style={{ fontVariationSettings: currentTab === "home" ? "'FILL' 1" : "'FILL' 0" }}
            >
              home
            </span>
            <span className="font-label-sm text-label-sm mt-0.5">Home</span>
          </button>

          {/* Pulse */}
          <button
            onClick={() => onSelectTab("pulse")}
            className={`flex flex-col items-center justify-center w-14 h-12 transition-all active:scale-95 ${
              currentTab === "pulse"
                ? "text-[#f2ca50] font-semibold drop-shadow-[0_0_8px_rgba(242,202,80,0.4)]"
                : "text-[#d0c5af] hover:text-[#f2ca50]"
            }`}
          >
            <span
              className="material-symbols-outlined text-[22px]"
              style={{ fontVariationSettings: currentTab === "pulse" ? "'FILL' 1" : "'FILL' 0" }}
            >
              bolt
            </span>
            <span className="font-label-sm text-label-sm mt-0.5">Pulse</span>
          </button>

          {/* Upload Button */}
          <div className="flex items-center justify-center w-12 h-12">
            <button
              onClick={onOpenUpload}
              aria-label="Upload Masterwork or Pulse"
              className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#f2ca50] to-[#d4af37] flex items-center justify-center text-[#3c2f00] shadow-[0_0_16px_rgba(242,202,80,0.45)] hover:scale-105 active:scale-95 transition-transform font-bold"
            >
              <span className="material-symbols-outlined text-[26px]">add</span>
            </button>
          </div>

          {/* Subscriptions */}
          <button
            onClick={() => onSelectTab("subs")}
            className={`flex flex-col items-center justify-center w-14 h-12 transition-all active:scale-95 ${
              currentTab === "subs"
                ? "text-[#f2ca50] font-semibold drop-shadow-[0_0_8px_rgba(242,202,80,0.4)]"
                : "text-[#d0c5af] hover:text-[#f2ca50]"
            }`}
          >
            <span
              className="material-symbols-outlined text-[22px]"
              style={{ fontVariationSettings: currentTab === "subs" ? "'FILL' 1" : "'FILL' 0" }}
            >
              subscriptions
            </span>
            <span className="font-label-sm text-label-sm mt-0.5">Subs</span>
          </button>

          {/* Library */}
          <button
            onClick={() => onSelectTab("library")}
            className={`flex flex-col items-center justify-center w-14 h-12 transition-all active:scale-95 ${
              currentTab === "library"
                ? "text-[#f2ca50] font-semibold drop-shadow-[0_0_8px_rgba(242,202,80,0.4)]"
                : "text-[#d0c5af] hover:text-[#f2ca50]"
            }`}
          >
            <span
              className="material-symbols-outlined text-[22px]"
              style={{ fontVariationSettings: currentTab === "library" ? "'FILL' 1" : "'FILL' 0" }}
            >
              video_library
            </span>
            <span className="font-label-sm text-label-sm mt-0.5">Library</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

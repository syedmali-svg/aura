import React from "react";

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  unreadNotificationsCount?: number;
  activeScreenTitle?: string;
  onBack?: () => void;
  showBack?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenNotifications,
  onOpenProfile,
  unreadNotificationsCount = 2,
  activeScreenTitle,
  onBack,
  showBack = false,
}) => {
  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-[#131316]/85 backdrop-blur-xl shadow-[0_1px_16px_rgba(0,0,0,0.6)] border-b border-[#353438]/40">
      <div className="max-w-2xl mx-auto h-16 px-4 flex items-center justify-between">
        {/* Left: Brand / Title */}
        <div className="flex items-center gap-2">
          {showBack && onBack ? (
            <button
              onClick={onBack}
              aria-label="Go Back"
              className="w-10 h-10 -ml-1.5 flex items-center justify-center rounded-full text-[#e5e1e6] hover:text-[#f2ca50] hover:bg-[#1f1f22] active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
          ) : null}

          <div
            onClick={showBack ? onBack : undefined}
            className={`flex items-center gap-2.5 ${showBack ? "cursor-pointer" : ""}`}
          >
            {/* Aura Golden Hex/Play Emblem */}
            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-tr from-[#353438] to-[#1f1f22] p-0.5 border border-[#d4af37]/30 shadow-[0_0_12px_rgba(242,202,80,0.25)] flex items-center justify-center">
              <span className="material-symbols-outlined text-[#f2ca50] text-[20px] translate-x-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                play_arrow
              </span>
            </div>

            <span className="font-headline-md text-headline-md tracking-wider font-bold text-[#f2ca50] drop-shadow-[0_0_12px_rgba(242,202,80,0.35)]">
              AURA
            </span>

            {activeScreenTitle && (
              <span className="font-headline-md text-headline-md font-semibold text-[#e5e1e6] tracking-tight truncate max-w-[170px] sm:max-w-xs pl-1 border-l border-[#4d4635]/60">
                {activeScreenTitle}
              </span>
            )}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={onOpenSearch}
            aria-label="Search"
            className="w-11 h-11 flex items-center justify-center rounded-full text-[#e5e1e6] hover:text-[#f2ca50] hover:bg-[#1f1f22] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[22px]">search</span>
          </button>

          <button
            onClick={onOpenNotifications}
            aria-label="Notifications"
            className="relative w-11 h-11 flex items-center justify-center rounded-full text-[#e5e1e6] hover:text-[#f2ca50] hover:bg-[#1f1f22] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#f2ca50] shadow-[0_0_8px_rgba(242,202,80,0.9)] animate-pulse" />
            )}
          </button>

          <button
            onClick={onOpenProfile}
            aria-label="Creator Profile"
            className="w-11 h-11 flex items-center justify-center ml-0.5 active:scale-95 transition-transform"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover p-[1px] bg-gradient-to-tr from-[#f2ca50] to-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.3)] ring-1 ring-[#f2ca50]/50"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvqKilfJFi0-wL2DHiRu-epTk-5t3eWCK8tom-c_XtL-rnoIFWN_h2fPcxPStEG5I-rXFXjbRiwZhc9I0WO-CTnxz43_gRimYPhlrggys2WAjweOtam2OJxvmOJbjIKLXFXtuKCK9QCn3h_7Sb5_027tqpdAaQBfENLYBBSnQOMN3a2aOY1Du4ld75yN9ZcnaDEsTeZU41JMlmCvYBQlyhs9G2WPqUldYIoR0fd-S7do1cSuS8zUFT"
            />
          </button>
        </div>
      </div>
    </header>
  );
};

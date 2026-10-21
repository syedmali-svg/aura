import React, { useState } from "react";
import { VideoItem } from "../data/mockData";

interface LibraryVaultProps {
  savedVideos: VideoItem[];
  likedVideos: VideoItem[];
  allVideos: VideoItem[];
  onSelectVideo: (video: VideoItem) => void;
  onRemoveSaved: (videoId: string) => void;
}

export const LibraryVault: React.FC<LibraryVaultProps> = ({
  savedVideos,
  likedVideos,
  allVideos,
  onSelectVideo,
  onRemoveSaved,
}) => {
  const [activeTab, setActiveTab] = useState<"downloads" | "history" | "playlists" | "favorites">("downloads");
  const [syncEnabled, setSyncEnabled] = useState(true);

  // Playlists mock
  const playlists = [
    { title: "Filmmaking Masterclasses", count: 8, thumb: allVideos[0]?.thumbnail },
    { title: "Noir OST & Spatial Acoustics", count: 14, thumb: allVideos[2]?.thumbnail },
    { title: "Tokyo After Dark 8K", count: 5, thumb: allVideos[3]?.thumbnail },
    { title: "Mediterranean Architecture", count: 6, thumb: allVideos[4]?.thumbnail },
  ];

  return (
    <div className="flex flex-col w-full pb-28 px-4 space-y-6">
      {/* Vault Header */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-[#2a2a2d] flex items-center justify-center text-[#f2ca50] border border-[#f2ca50]/20">
            <span className="material-symbols-outlined text-[22px]">video_library</span>
          </div>
          <div>
            <h2 className="font-headline-md text-headline-md font-bold text-[#e5e1e6]">
              Atelier Vault
            </h2>
            <p className="font-label-sm text-label-sm text-[#d0c5af]">
              Offline Cinema &amp; Curated Collections
            </p>
          </div>
        </div>

        {/* Sync Status Button */}
        <button
          type="button"
          onClick={() => setSyncEnabled(!syncEnabled)}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 border transition-all ${
            syncEnabled
              ? "bg-[#f2ca50]/15 text-[#f2ca50] border-[#f2ca50]/30"
              : "bg-[#2a2a2d] text-[#99907c] border-[#353438]"
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${syncEnabled ? "bg-[#f2ca50] animate-pulse" : "bg-[#99907c]"}`} />
          <span>{syncEnabled ? "ProRes Sync ON" : "Sync Paused"}</span>
        </button>
      </div>

      {/* Storage & Hardware Key Status */}
      <div className="p-3.5 rounded-2xl bg-[#1b1b1e] border border-[#353438]/60 flex flex-col gap-2">
        <div className="flex justify-between items-center text-xs">
          <span className="text-[#d0c5af] font-medium flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-[#f2ca50]">hard_drive</span>
            Internal Storage Cache
          </span>
          <span className="text-[#f2ca50] font-mono font-bold">48.2 GB / 500 GB</span>
        </div>
        <div className="w-full h-1.5 bg-[#2a2a2d] rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#d4af37] to-[#f2ca50] w-[14%]" />
        </div>
      </div>

      {/* Segmented Section Tabs */}
      <div className="grid grid-cols-4 gap-1 p-1 bg-[#1f1f22] rounded-xl border border-[#353438]/60">
        {[
          { id: "downloads", label: "Downloads", icon: "download_done" },
          { id: "history", label: "History", icon: "history" },
          { id: "playlists", label: "Playlists", icon: "playlist_play" },
          { id: "favorites", label: "Favorites", icon: "favorite" },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 rounded-lg text-xs font-semibold flex flex-col items-center gap-0.5 transition-all ${
                isActive
                  ? "bg-[#f2ca50] text-[#3c2f00] shadow-sm font-bold"
                  : "text-[#d0c5af] hover:text-[#e5e1e6]"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
              <span className="text-[10px]">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Content */}
      <div className="flex flex-col gap-3">
        {activeTab === "downloads" && (
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-[#99907c] font-semibold uppercase tracking-wider">
                Offline Ready Masterworks ({savedVideos.length || allVideos.slice(0, 3).length})
              </span>
              <span className="text-xs text-[#f2ca50]">Encrypted 4K</span>
            </div>

            {(savedVideos.length > 0 ? savedVideos : allVideos.slice(0, 3)).map((v) => (
              <div
                key={v.id}
                onClick={() => onSelectVideo(v)}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-[#1b1b1e] hover:bg-[#2a2a2d] transition-colors border border-[#353438]/50 cursor-pointer group"
              >
                <div className="relative w-28 aspect-video rounded-lg overflow-hidden shrink-0 bg-[#0e0e11]">
                  <img
                    src={v.thumbnail}
                    alt={v.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute bottom-1 right-1 px-1 bg-black/80 rounded text-[9px] text-white">
                    {v.duration}
                  </span>
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <h4 className="font-label-md text-label-md font-semibold text-[#e5e1e6] line-clamp-1 group-hover:text-[#f2ca50]">
                    {v.title}
                  </h4>
                  <span className="text-[11px] text-[#d0c5af] truncate mt-0.5">{v.creator.name}</span>
                  <div className="flex items-center gap-2 mt-1 text-[10px] text-[#f2ca50]">
                    <span className="flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[12px]">check_circle</span>
                      1080p ProRes
                    </span>
                    <span>•</span>
                    <span className="text-[#99907c]">3.2 GB</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveSaved(v.id);
                  }}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#99907c] hover:text-[#ffb4ab]"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "history" && (
          <div className="flex flex-col gap-3">
            <span className="text-xs text-[#99907c] font-semibold uppercase tracking-wider">
              Recent Watch History
            </span>
            {allVideos.slice(0, 4).map((v, i) => (
              <div
                key={v.id}
                onClick={() => onSelectVideo(v)}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-[#1b1b1e] hover:bg-[#2a2a2d] transition-colors border border-[#353438]/50 cursor-pointer group"
              >
                <div className="relative w-28 aspect-video rounded-lg overflow-hidden shrink-0 bg-[#0e0e11]">
                  <img
                    src={v.thumbnail}
                    alt={v.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute bottom-0 inset-x-0 h-1 bg-[#353438]">
                    <div
                      style={{ width: `${(4 - i) * 25}%` }}
                      className="h-full bg-[#f2ca50]"
                    />
                  </div>
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <h4 className="font-label-md text-label-md font-semibold text-[#e5e1e6] line-clamp-1 group-hover:text-[#f2ca50]">
                    {v.title}
                  </h4>
                  <span className="text-[11px] text-[#d0c5af] truncate mt-0.5">{v.creator.name}</span>
                  <span className="text-[10px] text-[#99907c] mt-1">
                    Resumed at 08:24 • {v.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "playlists" && (
          <div className="grid grid-cols-2 gap-3">
            {playlists.map((pl) => (
              <div
                key={pl.title}
                onClick={() => onSelectVideo(allVideos[0])}
                className="p-3 rounded-xl bg-[#1b1b1e] hover:bg-[#2a2a2d] transition-colors border border-[#353438]/50 cursor-pointer group flex flex-col gap-2"
              >
                <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-[#0e0e11]">
                  <img
                    src={pl.thumb}
                    alt={pl.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-[24px]">playlist_play</span>
                  </div>
                </div>
                <h4 className="font-label-md text-label-md font-semibold text-[#e5e1e6] line-clamp-1 group-hover:text-[#f2ca50]">
                  {pl.title}
                </h4>
                <span className="text-[10px] text-[#d0c5af]">{pl.count} masterworks</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "favorites" && (
          <div className="flex flex-col gap-3">
            <span className="text-xs text-[#99907c] font-semibold uppercase tracking-wider">
              Curated Favorites
            </span>
            {(likedVideos.length > 0 ? likedVideos : allVideos.slice(1, 4)).map((v) => (
              <div
                key={v.id}
                onClick={() => onSelectVideo(v)}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-[#1b1b1e] hover:bg-[#2a2a2d] transition-colors border border-[#353438]/50 cursor-pointer group"
              >
                <div className="relative w-28 aspect-video rounded-lg overflow-hidden shrink-0 bg-[#0e0e11]">
                  <img
                    src={v.thumbnail}
                    alt={v.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute top-1 left-1 text-[#ffb4ab]">
                    <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      favorite
                    </span>
                  </span>
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <h4 className="font-label-md text-label-md font-semibold text-[#e5e1e6] line-clamp-1 group-hover:text-[#f2ca50]">
                    {v.title}
                  </h4>
                  <span className="text-[11px] text-[#d0c5af] truncate mt-0.5">{v.creator.name}</span>
                  <span className="text-[10px] text-[#f2ca50] mt-1">{v.views}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

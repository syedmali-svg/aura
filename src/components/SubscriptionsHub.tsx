import React, { useState } from "react";
import { ChannelItem, VideoItem } from "../data/mockData";

interface SubscriptionsHubProps {
  channels: ChannelItem[];
  videos: VideoItem[];
  onSelectVideo: (video: VideoItem) => void;
  onSelectChannel: (channel: ChannelItem) => void;
  savedVideoIds: Set<string>;
  onToggleSaveVideo: (videoId: string) => void;
  likedVideoIds: Set<string>;
  onToggleLikeVideo: (videoId: string) => void;
  onShare: (title: string) => void;
  onOpenVaultSection: (section: string) => void;
}

export const SubscriptionsHub: React.FC<SubscriptionsHubProps> = ({
  channels,
  videos,
  onSelectVideo,
  onSelectChannel,
  savedVideoIds,
  onToggleSaveVideo,
  likedVideoIds,
  onToggleLikeVideo,
  onShare,
  onOpenVaultSection,
}) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedCreatorId, setSelectedCreatorId] = useState<string | null>(null);

  // Filter logic
  const filteredVideos = videos.filter((v) => {
    if (selectedCreatorId && v.creator.id !== selectedCreatorId) {
      return false;
    }
    if (activeFilter === "today") {
      return v.timestamp.includes("hour") || v.timestamp.includes("today");
    }
    if (activeFilter === "live") {
      return v.creator.isLive;
    }
    if (activeFilter === "podcasts") {
      return v.category === "Podcasts" || v.tags.includes("deepdive");
    }
    if (activeFilter === "unwatched") {
      return !savedVideoIds.has(v.id);
    }
    return true;
  });

  return (
    <div className="flex flex-col w-full pb-28 space-y-6">
      {/* Subscriptions Creator Circle Row (Image 7 & 8) */}
      <section className="flex flex-col space-y-2 pt-1">
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <span className="font-headline-md text-headline-md font-semibold text-[#e5e1e6] tracking-tight">
              Channels
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#f2ca50] animate-pulse" />
          </div>
          <button
            type="button"
            onClick={() => setSelectedCreatorId(null)}
            className="flex items-center gap-1 text-[#f2ca50] hover:text-[#ffe088] transition-colors cursor-pointer"
          >
            <span className="font-label-md text-label-md">
              {selectedCreatorId ? "Show All" : "Manage"}
            </span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        {/* Horizontal Creator Avatars */}
        <div className="flex items-start gap-4 overflow-x-auto px-4 no-scrollbar py-1">
          {channels.map((ch) => {
            const isSelected = selectedCreatorId === ch.id;
            return (
              <button
                key={ch.id}
                type="button"
                onClick={() => {
                  if (isSelected) {
                    setSelectedCreatorId(null);
                  } else {
                    setSelectedCreatorId(ch.id);
                    onSelectChannel(ch);
                  }
                }}
                className="flex flex-col items-center space-y-1.5 flex-shrink-0 group cursor-pointer active:scale-95 transition-transform"
              >
                <div className="relative">
                  <div
                    className={`w-14 h-14 rounded-full p-[2px] transition-all ${
                      isSelected
                        ? "ring-2 ring-[#f2ca50] shadow-[0_0_16px_rgba(242,202,80,0.6)]"
                        : ch.isLive
                        ? "bg-gradient-to-tr from-[#ffb4ab] to-[#f2ca50] shadow-[0_0_12px_rgba(242,202,80,0.3)]"
                        : ch.hasNew
                        ? "bg-gradient-to-tr from-[#f2ca50] via-[#d4af37] to-[#e7c355] shadow-[0_0_10px_rgba(212,175,55,0.25)]"
                        : "bg-[#2a2a2d] group-hover:bg-[#f2ca50]/50"
                    }`}
                  >
                    <img
                      src={ch.avatar}
                      alt={ch.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>

                  {ch.isLive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded-full bg-[#ffb4ab] text-[#690005] font-label-sm text-[9px] uppercase tracking-wider font-bold shadow-sm flex items-center gap-0.5">
                      <span className="w-1 h-1 rounded-full bg-[#690005] animate-ping" />
                      LIVE
                    </span>
                  )}

                  {!ch.isLive && ch.hasNew && (
                    <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-[#f2ca50] border-2 border-[#131316] flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3c2f00]" />
                    </span>
                  )}
                </div>

                <span
                  className={`font-label-sm text-label-sm truncate w-14 text-center mt-1 transition-colors ${
                    isSelected ? "text-[#f2ca50] font-bold" : "text-[#e5e1e6] group-hover:text-[#f2ca50]"
                  }`}
                >
                  {ch.name.replace("Studio ", "").replace("Noir", "")}
                </span>
              </button>
            );
          })}

          {/* View All Circle */}
          <button
            type="button"
            onClick={() => setSelectedCreatorId(null)}
            className="flex flex-col items-center space-y-1.5 flex-shrink-0 group cursor-pointer"
          >
            <div className="w-14 h-14 rounded-full bg-[#2a2a2d] flex items-center justify-center text-[#d0c5af] group-hover:bg-[#f2ca50] group-hover:text-[#3c2f00] transition-all">
              <span className="material-symbols-outlined text-[20px]">grid_view</span>
            </div>
            <span className="font-label-sm text-label-sm text-[#d0c5af] group-hover:text-[#f2ca50]">
              All (34)
            </span>
          </button>
        </div>
      </section>

      {/* Filter Toggle Pills (Image 7 & 8) */}
      <section className="px-4">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          {[
            { id: "all", label: "All" },
            { id: "today", label: "Today" },
            { id: "live", label: "Live", hasDot: true },
            { id: "podcasts", label: "Podcasts" },
            { id: "unwatched", label: "Unwatched" },
          ].map((item) => {
            const isActive = activeFilter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveFilter(item.id)}
                className={`filter-btn px-4 py-1.5 rounded-full font-label-md text-label-md transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-[#f2ca50] text-[#3c2f00] font-semibold shadow-[0_0_12px_rgba(242,202,80,0.35)]"
                    : "bg-[#2a2a2d] text-[#d0c5af] hover:text-[#e5e1e6] hover:bg-[#353438]"
                }`}
              >
                {item.hasDot && (
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-[#690005]" : "bg-[#ffb4ab]"}`} />
                )}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Vault & Offline Carousel Shelf (Image 7 & 8) */}
      <section className="flex flex-col space-y-2">
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#f2ca50]">local_library</span>
            <span className="font-headline-md text-headline-md font-semibold text-[#e5e1e6]">
              Vault &amp; Offline
            </span>
          </div>
          <span className="font-label-md text-label-md text-[#d0c5af]">Cloud Sync ON</span>
        </div>

        {/* Horizontal Cards Shelf */}
        <div className="flex items-stretch gap-3 overflow-x-auto px-4 no-scrollbar py-1">
          {/* Downloads Card */}
          <div
            onClick={() => onOpenVaultSection("downloads")}
            className="flex-shrink-0 w-36 p-3 rounded-xl bg-[#1f1f22] flex flex-col justify-between shadow-sm relative overflow-hidden group hover:bg-[#2a2a2d] transition-colors cursor-pointer border border-[#353438]/50"
          >
            <div className="absolute -right-3 -top-3 w-16 h-16 rounded-full bg-[#f2ca50]/5 pointer-events-none blur-lg" />
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-[#f2ca50]/10 flex items-center justify-center text-[#f2ca50]">
                <span className="material-symbols-outlined text-[18px]">download_done</span>
              </div>
              <span className="font-label-sm text-label-sm text-[#f2ca50] font-semibold">1080p</span>
            </div>
            <div className="mt-4">
              <h4 className="font-label-lg text-label-lg font-semibold text-[#e5e1e6]">Downloads</h4>
              <p className="font-body-sm text-body-sm text-[#d0c5af] mt-0.5">12 offline ready</p>
            </div>
          </div>

          {/* History Card */}
          <div
            onClick={() => onOpenVaultSection("history")}
            className="flex-shrink-0 w-36 p-3 rounded-xl bg-[#1f1f22] flex flex-col justify-between shadow-sm group hover:bg-[#2a2a2d] transition-colors cursor-pointer border border-[#353438]/50"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-[#353438] flex items-center justify-center text-[#e7c355]">
                <span className="material-symbols-outlined text-[18px]">history</span>
              </div>
              <span className="font-label-sm text-label-sm text-[#d0c5af]">42 view</span>
            </div>
            <div className="mt-4">
              <h4 className="font-label-lg text-label-lg font-semibold text-[#e5e1e6]">History</h4>
              <p className="font-body-sm text-body-sm text-[#d0c5af] mt-0.5">Resume 2 active</p>
            </div>
          </div>

          {/* Playlists Card */}
          <div
            onClick={() => onOpenVaultSection("playlists")}
            className="flex-shrink-0 w-44 p-3 rounded-xl bg-[#1f1f22] flex flex-col justify-between shadow-sm group hover:bg-[#2a2a2d] transition-colors cursor-pointer border border-[#353438]/50"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-[#353438] flex items-center justify-center text-[#f2ca50]">
                <span className="material-symbols-outlined text-[18px]">playlist_play</span>
              </div>
              <span className="font-label-sm text-label-sm text-[#f2ca50] font-semibold">6 Lists</span>
            </div>
            <div className="mt-3">
              <h4 className="font-label-lg text-label-lg font-semibold text-[#e5e1e6]">Playlists</h4>
              <p className="font-body-sm text-body-sm text-[#d0c5af] truncate mt-0.5">Filmmaking, Noir OST</p>
            </div>
          </div>

          {/* Watch Later */}
          <div
            onClick={() => onOpenVaultSection("watch-later")}
            className="flex-shrink-0 w-36 p-3 rounded-xl bg-[#1f1f22] flex flex-col justify-between shadow-sm group hover:bg-[#2a2a2d] transition-colors cursor-pointer border border-[#353438]/50"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-[#353438] flex items-center justify-center text-[#e5e1e6]">
                <span className="material-symbols-outlined text-[18px]">watch_later</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#f2ca50]" />
            </div>
            <div className="mt-4">
              <h4 className="font-label-lg text-label-lg font-semibold text-[#e5e1e6]">Watch Later</h4>
              <p className="font-body-sm text-body-sm text-[#d0c5af] mt-0.5">8 queued items</p>
            </div>
          </div>

          {/* Favorites */}
          <div
            onClick={() => onOpenVaultSection("favorites")}
            className="flex-shrink-0 w-36 p-3 rounded-xl bg-[#1f1f22] flex flex-col justify-between shadow-sm group hover:bg-[#2a2a2d] transition-colors cursor-pointer border border-[#353438]/50"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-[#353438] flex items-center justify-center text-[#ffb4ab]">
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  favorite
                </span>
              </div>
              <span className="font-label-sm text-label-sm text-[#d0c5af]">1.2k</span>
            </div>
            <div className="mt-4">
              <h4 className="font-label-lg text-label-lg font-semibold text-[#e5e1e6]">Favorites</h4>
              <p className="font-body-sm text-body-sm text-[#d0c5af] mt-0.5">Curated gems</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feed Section: Recent Premieres (Image 7 & 8) */}
      <section className="flex flex-col space-y-4 px-4">
        <div className="flex items-center justify-between">
          <h3 className="font-headline-md text-headline-md font-semibold text-[#e5e1e6] flex items-center gap-2">
            <span>Recent Premieres</span>
            <span className="px-2 py-0.5 rounded-full bg-[#f2ca50]/10 text-[#f2ca50] font-label-sm text-label-sm border border-[#f2ca50]/20">
              New
            </span>
          </h3>
          <button
            type="button"
            className="text-[#d0c5af] hover:text-[#e5e1e6] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">tune</span>
          </button>
        </div>

        {/* Video Cards */}
        {filteredVideos.map((video) => (
          <article
            key={video.id}
            onClick={() => onSelectVideo(video)}
            className="flex flex-col bg-[#1f1f22] rounded-xl overflow-hidden shadow-md group border border-[#353438]/40 hover:border-[#d4af37]/40 transition-colors cursor-pointer"
          >
            {/* Media Layer */}
            <div className="relative w-full aspect-video overflow-hidden bg-[#0e0e11]">
              <img
                src={video.thumbnail}
                alt={video.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Duration Badge */}
              <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-[#0e0e11]/85 backdrop-blur-md text-[#e5e1e6] font-label-sm text-label-sm font-semibold tracking-wide flex items-center gap-1 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f2ca50]" />
                <span>{video.duration}</span>
              </div>

              {/* Badges */}
              {video.isExclusive ? (
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-[#f2ca50]/20 backdrop-blur-md text-[#f2ca50] font-label-sm text-label-sm font-bold tracking-wider border border-[#f2ca50]/30">
                  EXCLUSIVE
                </div>
              ) : video.badges?.[0] ? (
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-[#0e0e11]/75 backdrop-blur-md text-[#e7c355] font-label-sm text-label-sm font-bold tracking-widest uppercase border border-[#e7c355]/20">
                  {video.badges[0]}
                </div>
              ) : null}

              {/* Quick Action Floating Bar Overlay */}
              <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                <button
                  type="button"
                  aria-label="Save to Vault"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSaveVideo(video.id);
                  }}
                  className={`w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-colors ${
                    savedVideoIds.has(video.id)
                      ? "bg-[#f2ca50] text-[#3c2f00]"
                      : "bg-[#1b1b1e]/80 text-[#e5e1e6] hover:text-[#f2ca50]"
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {savedVideoIds.has(video.id) ? "bookmark" : "bookmark_add"}
                  </span>
                </button>

                <button
                  type="button"
                  aria-label="Add to Queue"
                  onClick={(e) => {
                    e.stopPropagation();
                    onShare("Added to Queue: " + video.title);
                  }}
                  className="w-8 h-8 rounded-full bg-[#1b1b1e]/80 backdrop-blur-md text-[#e5e1e6] hover:text-[#f2ca50] flex items-center justify-center transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">playlist_add</span>
                </button>
              </div>
            </div>

            {/* Video Metadata Cluster */}
            <div className="p-4 flex flex-col space-y-3">
              <div className="flex items-start gap-3">
                <div className="relative flex-shrink-0">
                  <img
                    src={video.creator.avatar}
                    alt={video.creator.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover p-[1px] bg-gradient-to-tr from-[#f2ca50] to-[#d4af37]"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#f2ca50] text-[#3c2f00] flex items-center justify-center text-[9px] font-bold">
                    ✓
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-headline-md text-headline-md font-semibold text-[#e5e1e6] leading-snug line-clamp-2 group-hover:text-[#f2ca50] transition-colors">
                    {video.title}
                  </h4>
                  <div className="flex items-center flex-wrap gap-x-2 gap-y-0.5 mt-1 font-body-sm text-body-sm text-[#d0c5af]">
                    <span className="font-semibold text-[#e5e1e6] flex items-center gap-1">
                      {video.creator.name}
                      <span
                        className="material-symbols-outlined text-[14px] text-[#f2ca50]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        stars
                      </span>
                    </span>
                    <span>•</span>
                    <span>{video.views}</span>
                    <span>•</span>
                    <span className="text-[#f2ca50] font-medium">{video.timestamp}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => e.stopPropagation()}
                  className="w-8 h-8 flex items-center justify-center text-[#d0c5af] hover:text-[#e5e1e6]"
                >
                  <span className="material-symbols-outlined text-[20px]">more_vert</span>
                </button>
              </div>

              {/* Quick Interaction Bar */}
              <div className="pt-1 flex items-center justify-between text-[#d0c5af] font-label-md text-label-md border-t border-[#353438]/30">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleLikeVideo(video.id);
                    }}
                    className={`flex items-center gap-1.5 transition-colors ${
                      likedVideoIds.has(video.id) ? "text-[#f2ca50]" : "hover:text-[#f2ca50]"
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={{ fontVariationSettings: likedVideoIds.has(video.id) ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      thumb_up
                    </span>
                    <span>{likedVideoIds.has(video.id) ? "8.5K" : video.likes}</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectVideo(video);
                    }}
                    className="flex items-center gap-1.5 hover:text-[#e5e1e6] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">chat_bubble_outline</span>
                    <span>{video.commentsCount}</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onShare(video.title);
                    }}
                    className="flex items-center gap-1.5 hover:text-[#e5e1e6] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">share</span>
                    <span>Share</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSaveVideo(video.id);
                  }}
                  className={`px-2.5 py-1 rounded-full font-label-sm text-label-sm font-semibold flex items-center gap-1 transition-colors ${
                    savedVideoIds.has(video.id)
                      ? "bg-[#f2ca50] text-[#3c2f00]"
                      : "bg-[#353438] text-[#e5e1e6] hover:bg-[#f2ca50] hover:text-[#3c2f00]"
                  }`}
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {savedVideoIds.has(video.id) ? "check" : "save_alt"}
                  </span>
                  <span>{savedVideoIds.has(video.id) ? "Saved" : "Save"}</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

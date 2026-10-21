import React, { useState } from "react";
import { VideoItem, PulseItem, CATEGORIES } from "../data/mockData";

interface HomeFeedProps {
  videos: VideoItem[];
  pulseItems: PulseItem[];
  onSelectVideo: (video: VideoItem) => void;
  onSelectPulse: (pulseItem: PulseItem) => void;
  onOpenPulseTab: () => void;
  savedVideoIds: Set<string>;
  onToggleSaveVideo: (videoId: string) => void;
  likedVideoIds: Set<string>;
  onToggleLikeVideo: (videoId: string) => void;
  onShare: (title: string) => void;
}

export const HomeFeed: React.FC<HomeFeedProps> = ({
  videos,
  pulseItems,
  onSelectVideo,
  onSelectPulse,
  onOpenPulseTab,
  savedVideoIds,
  onToggleSaveVideo,
  likedVideoIds,
  onToggleLikeVideo,
  onShare,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [joinedStudios, setJoinedStudios] = useState<Set<string>>(new Set());

  // Filtered list
  const filteredVideos = videos.filter((v) => {
    if (selectedCategory === "All") return true;
    return v.category === selectedCategory || v.tags.some((t) => t.toLowerCase() === selectedCategory.toLowerCase());
  });

  const featuredVideo = videos.find((v) => v.isFeatured) || videos[0];
  const regularFeedVideos = filteredVideos.filter((v) => v.id !== featuredVideo?.id);

  const toggleJoinStudio = (studioId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setJoinedStudios((prev) => {
      const next = new Set(prev);
      if (next.has(studioId)) next.delete(studioId);
      else next.add(studioId);
      return next;
    });
  };

  return (
    <div className="flex flex-col w-full pb-8">
      {/* Interactive Category Pills Row */}
      <section className="w-full pt-1 pb-3 px-4">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                type="button"
                className={`category-chip px-4 py-1.5 rounded-full font-label-md text-label-md shrink-0 active:scale-95 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-[#f2ca50] text-[#3c2f00] font-semibold shadow-[0_0_12px_rgba(242,202,80,0.35)]"
                    : "bg-[#2a2a2d] text-[#d0c5af] hover:text-[#e5e1e6] hover:bg-[#353438]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured Spotlight Video Card (Image 1 & 2) */}
      {featuredVideo && selectedCategory === "All" && (
        <section className="w-full px-4 mb-6">
          <div
            onClick={() => onSelectVideo(featuredVideo)}
            className="group relative flex flex-col bg-[#1b1b1e] rounded-xl overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.6)] border border-[#353438]/50 cursor-pointer hover:border-[#d4af37]/40 transition-colors"
          >
            {/* Media Aspect Layer */}
            <div className="relative w-full aspect-video overflow-hidden bg-[#353438]">
              <img
                src={featuredVideo.thumbnail}
                alt={featuredVideo.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Ambient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b1b1e] via-transparent to-black/30 pointer-events-none" />

              {/* Badges Cluster Top */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[#f2ca50] font-label-sm text-label-sm uppercase tracking-wider font-semibold border border-[#f2ca50]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f2ca50] animate-pulse" />
                  Featured
                </div>
                <div className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[#e5e1e6] font-label-sm text-label-sm tracking-wide">
                  {featuredVideo.quality}
                </div>
              </div>

              {/* Duration Pill */}
              <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/85 backdrop-blur-sm text-[#e5e1e6] font-label-sm text-label-sm font-semibold">
                {featuredVideo.duration}
              </div>

              {/* Center Play Ambient Button On Hover/Tap */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-[#f2ca50]/90 flex items-center justify-center text-[#3c2f00] shadow-[0_0_20px_rgba(242,202,80,0.6)]">
                  <span className="material-symbols-outlined text-[28px] translate-x-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                    play_arrow
                  </span>
                </div>
              </div>
            </div>

            {/* Info Cluster */}
            <div className="p-4 flex flex-col gap-2">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="relative shrink-0 mt-0.5">
                    <img
                      src={featuredVideo.creator.avatar}
                      alt={featuredVideo.creator.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover p-[1px] bg-gradient-to-tr from-[#f2ca50] to-[#d4af37]"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <h2 className="font-headline-md text-headline-md font-semibold text-[#e5e1e6] line-clamp-2 leading-snug group-hover:text-[#f2ca50] transition-colors">
                      {featuredVideo.title}
                    </h2>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="font-label-md text-label-md text-[#d0c5af] font-medium truncate">
                        {featuredVideo.creator.name}
                      </span>
                      {featuredVideo.creator.isVerified && (
                        <span
                          className="material-symbols-outlined text-[15px] text-[#f2ca50]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          verified
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5 text-[#d0c5af] font-body-sm text-body-sm">
                      <span>{featuredVideo.views}</span>
                      <span>•</span>
                      <span>{featuredVideo.timestamp}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  aria-label="More options"
                  onClick={(e) => e.stopPropagation()}
                  className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[#d0c5af] hover:text-[#e5e1e6] active:bg-[#353438] transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">more_vert</span>
                </button>
              </div>

              {/* Quick Interaction Bar */}
              <div className="flex items-center justify-between pt-1 mt-1 border-t border-[#353438]/40">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleLikeVideo(featuredVideo.id);
                    }}
                    className={`btn-like flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2a2a2d] active:scale-95 transition-all ${
                      likedVideoIds.has(featuredVideo.id)
                        ? "text-[#f2ca50] bg-[#353438]"
                        : "text-[#d0c5af] hover:text-[#f2ca50]"
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={{ fontVariationSettings: likedVideoIds.has(featuredVideo.id) ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      thumb_up
                    </span>
                    <span className="font-label-md text-label-md font-semibold">
                      {likedVideoIds.has(featuredVideo.id) ? "49K" : featuredVideo.likes}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onShare(featuredVideo.title);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2a2a2d] text-[#d0c5af] hover:text-[#f2ca50] active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-[18px]">share</span>
                    <span className="font-label-md text-label-md font-semibold">Share</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSaveVideo(featuredVideo.id);
                    }}
                    aria-label="Save to Vault"
                    className={`btn-save flex items-center justify-center w-8 h-8 rounded-full bg-[#2a2a2d] active:scale-95 transition-all ${
                      savedVideoIds.has(featuredVideo.id) ? "text-[#f2ca50] bg-[#353438]" : "text-[#d0c5af] hover:text-[#f2ca50]"
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={{ fontVariationSettings: savedVideoIds.has(featuredVideo.id) ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      {savedVideoIds.has(featuredVideo.id) ? "bookmark" : "bookmark_border"}
                    </span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={(e) => toggleJoinStudio(featuredVideo.creator.id, e)}
                  className={`px-3.5 py-1.5 rounded-full font-label-md text-label-md font-semibold transition-all ${
                    joinedStudios.has(featuredVideo.creator.id)
                      ? "bg-[#2a2a2d] text-[#f2ca50] border border-[#f2ca50]/30"
                      : "bg-[#353438] text-[#f2ca50] hover:bg-[#f2ca50] hover:text-[#3c2f00]"
                  }`}
                >
                  {joinedStudios.has(featuredVideo.creator.id) ? "Joined" : "Join Studio"}
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Aura Pulse / Shorts Shelf (Image 1 & 2) */}
      <section className="w-full mb-6">
        <div className="flex items-center justify-between px-4 mb-2">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-[#f2ca50] text-[22px] drop-shadow-[0_0_8px_rgba(242,202,80,0.5)]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              bolt
            </span>
            <h3 className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-[#e5e1e6] tracking-tight">
              Pulse
            </h3>
          </div>
          <button
            onClick={onOpenPulseTab}
            className="font-label-md text-label-md text-[#f2ca50] font-semibold flex items-center gap-0.5 hover:underline"
          >
            View All
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        {/* Pulse Horizontal Scroll */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar px-4 py-1">
          {pulseItems.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                onSelectPulse(item);
                onOpenPulseTab();
              }}
              className="group relative w-36 aspect-[9/16] rounded-xl overflow-hidden shrink-0 bg-[#1b1b1e] shadow-[0_4px_16px_rgba(0,0,0,0.5)] border border-[#353438]/40 cursor-pointer hover:border-[#f2ca50]/50 transition-all hover:scale-[1.02]"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none" />

              <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[#f2ca50] font-label-sm text-label-sm font-semibold flex items-center gap-0.5 border border-[#f2ca50]/20">
                <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  play_arrow
                </span>
                {item.views}
              </div>

              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex flex-col">
                <p className="font-label-md text-label-md font-semibold text-[#e5e1e6] line-clamp-2 leading-tight drop-shadow-sm">
                  {item.title}
                </p>
                <div className="flex items-center gap-1.5 mt-2">
                  <img
                    src={item.creator.avatar}
                    alt={item.creator.name}
                    referrerPolicy="no-referrer"
                    className="w-4 h-4 rounded-full object-cover ring-1 ring-[#f2ca50]/40"
                  />
                  <span className="font-label-sm text-label-sm text-[#d0c5af] truncate">
                    {item.creator.handle}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Regular Feed Videos */}
      <section className="w-full flex flex-col gap-6">
        {regularFeedVideos.map((video) => (
          <article key={video.id} className="w-full px-4">
            <div
              onClick={() => onSelectVideo(video)}
              className="flex flex-col bg-[#1b1b1e] rounded-xl overflow-hidden shadow-[0_6px_20px_rgba(0,0,0,0.45)] border border-[#353438]/40 cursor-pointer group hover:border-[#d4af37]/40 transition-colors"
            >
              {/* Media Layer */}
              <div className="relative w-full aspect-video overflow-hidden bg-[#353438]">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1b1b1e]/80 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/85 backdrop-blur-sm text-[#e5e1e6] font-label-sm text-label-sm font-semibold">
                  {video.duration}
                </div>

                {video.badges?.[0] && (
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[#f2ca50] font-label-sm text-label-sm border border-[#f2ca50]/20">
                    {video.badges[0]}
                  </div>
                )}
              </div>

              {/* Metadata */}
              <div className="p-4 flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <img
                    src={video.creator.avatar}
                    alt={video.creator.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover shrink-0 mt-0.5 p-[1px] bg-gradient-to-tr from-[#f2ca50] to-[#d4af37]"
                  />
                  <div className="flex flex-col min-w-0">
                    <h3 className="font-headline-md text-headline-md font-semibold text-[#e5e1e6] line-clamp-2 leading-snug group-hover:text-[#f2ca50] transition-colors">
                      {video.title}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="font-label-md text-label-md text-[#d0c5af] font-medium truncate">
                        {video.creator.name}
                      </span>
                      {video.creator.isVerified && (
                        <span
                          className="material-symbols-outlined text-[15px] text-[#f2ca50]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          verified
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5 text-[#d0c5af] font-body-sm text-body-sm">
                      <span>{video.views}</span>
                      <span>•</span>
                      <span>{video.timestamp}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    aria-label="Save to Vault"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSaveVideo(video.id);
                    }}
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      savedVideoIds.has(video.id)
                        ? "text-[#f2ca50] bg-[#353438]"
                        : "text-[#d0c5af] hover:text-[#f2ca50] hover:bg-[#2a2a2d]"
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={{ fontVariationSettings: savedVideoIds.has(video.id) ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      {savedVideoIds.has(video.id) ? "bookmark" : "bookmark_border"}
                    </span>
                  </button>

                  <button
                    type="button"
                    aria-label="More options"
                    onClick={(e) => e.stopPropagation()}
                    className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[#d0c5af] hover:text-[#e5e1e6] active:bg-[#353438] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">more_vert</span>
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Delightful End-of-Feed Signature Stamp (Image 1 & 2) */}
      <div className="w-full flex flex-col items-center justify-center py-10 px-4 text-center mt-6">
        <div className="w-12 h-12 rounded-full bg-[#2a2a2d] flex items-center justify-center mb-3 text-[#f2ca50] shadow-[0_0_24px_rgba(242,202,80,0.15)] border border-[#f2ca50]/20">
          <span className="material-symbols-outlined text-[26px]">all_inclusive</span>
        </div>
        <p className="font-headline-md text-headline-md font-semibold text-[#e5e1e6]">
          You're completely caught up
        </p>
        <p className="font-body-sm text-body-sm text-[#d0c5af] mt-1 max-w-[280px]">
          Experience new masterworks handpicked daily by the Aura editorial curatorium.
        </p>
      </div>
    </div>
  );
};

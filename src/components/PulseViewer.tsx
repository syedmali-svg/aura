import React, { useState, useEffect } from "react";
import { PulseItem } from "../data/mockData";

interface PulseViewerProps {
  items: PulseItem[];
  activePulse: PulseItem;
  onSelectPulse: (item: PulseItem) => void;
  onShare: (title: string) => void;
  followedHandles: Set<string>;
  onToggleFollowHandle: (handle: string) => void;
  likedPulseIds: Set<string>;
  onToggleLikePulse: (pulseId: string) => void;
}

export const PulseViewer: React.FC<PulseViewerProps> = ({
  items,
  activePulse,
  onSelectPulse,
  onShare,
  followedHandles,
  onToggleFollowHandle,
  likedPulseIds,
  onToggleLikePulse,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showPlayPill, setShowPlayPill] = useState(false);
  const [activeTab, setActiveTab] = useState<"following" | "pulse">("pulse");
  const [progress, setProgress] = useState(48);
  const [showComments, setShowComments] = useState(false);
  const [commentsList, setCommentsList] = useState([
    { id: "pc1", author: "Nocturne Odyssey", text: "The color contrast in Shinjuku rain is unrivaled.", time: "2h ago", likes: 89 },
    { id: "pc2", author: "Cinephile99", text: "What ISO were you pushing with that f/1.2 prime?", time: "5h ago", likes: 34 },
    { id: "pc3", author: "Studio Kroma", text: "Incredible depth of field separation!", time: "8h ago", likes: 112 },
  ]);
  const [newComment, setNewComment] = useState("");

  const currentIndex = items.findIndex((i) => i.id === activePulse.id);
  const isFollowed = followedHandles.has(activePulse.creator.handle);
  const isLiked = likedPulseIds.has(activePulse.id);

  // Playback timer progression
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleTapSurface = () => {
    setIsPlaying(!isPlaying);
    setShowPlayPill(true);
    setTimeout(() => setShowPlayPill(false), 500);
  };

  const handleDoubleTap = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLiked) {
      onToggleLikePulse(activePulse.id);
    }
  };

  const nextPulse = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIdx = (currentIndex + 1) % items.length;
    onSelectPulse(items[nextIdx]);
    setProgress(0);
  };

  const prevPulse = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevIdx = (currentIndex - 1 + items.length) % items.length;
    onSelectPulse(items[prevIdx]);
    setProgress(0);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setCommentsList([
      {
        id: "pc-" + Date.now(),
        author: "Carlos Andy (You)",
        text: newComment.trim(),
        time: "Just now",
        likes: 1,
      },
      ...commentsList,
    ]);
    setNewComment("");
  };

  return (
    <div className="flex flex-col w-full relative select-none pb-24 items-center">
      {/* Immersive Full-Screen 9:16 Video Player Container (Image 5 & 6) */}
      <div className="relative w-full max-w-sm aspect-[9/16] h-[780px] max-h-[820px] rounded-2xl overflow-hidden bg-[#0e0e11] shadow-2xl flex flex-col justify-between border border-[#353438]/50">
        {/* Background Cinematic Media Layer */}
        <div
          id="video-scrim"
          style={{ backgroundImage: `url('${activePulse.thumbnail}')` }}
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 scale-100"
        />

        {/* Vignette & Dual Gradient Ambient Scrims */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e0e11]/80 via-transparent to-[#0e0e11]/95 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e0e11]/45 via-transparent to-[#0e0e11]/45 pointer-events-none" />

        {/* Interactive Tap-to-Pause / Heart Surface */}
        <button
          type="button"
          onClick={handleTapSurface}
          onDoubleClick={handleDoubleTap}
          aria-label="Toggle Playback or Double Tap to Like"
          className="absolute inset-0 w-full h-full cursor-pointer focus:outline-none flex items-center justify-center group z-10"
        >
          {/* Center Dynamic Play/Pause Feedback Pill */}
          <div
            className={`transition-all duration-300 pointer-events-none w-16 h-16 rounded-full bg-[#1b1b1e]/80 backdrop-blur-xl flex items-center justify-center text-[#f2ca50] shadow-2xl border border-[#f2ca50]/30 ${
              showPlayPill ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
          >
            <span className="material-symbols-outlined text-[36px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              {isPlaying ? "pause" : "play_arrow"}
            </span>
          </div>
        </button>

        {/* Top Overlay Bar: Navigation Tabs & Quick Utilities */}
        <div className="relative z-20 pt-4 px-4 flex items-center justify-between w-full pointer-events-auto">
          {/* Camera Shortcut */}
          <button
            type="button"
            aria-label="Open Camera Capture"
            className="w-10 h-10 rounded-full bg-[#2a2a2d]/60 backdrop-blur-md flex items-center justify-center text-[#e5e1e6] hover:text-[#f2ca50] transition-colors border border-white/10"
          >
            <span className="material-symbols-outlined text-[20px]">videocam</span>
          </button>

          {/* Central Segmented Filter: Following vs Pulse */}
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setActiveTab("following")}
              className={`relative py-1 font-label-lg text-label-lg transition-colors ${
                activeTab === "following"
                  ? "text-[#f2ca50] font-bold"
                  : "text-[#d0c5af] hover:text-[#e5e1e6]"
              }`}
            >
              Following
              {activeTab === "following" && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#f2ca50] shadow-[0_0_8px_rgba(242,202,80,0.9)]" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("pulse")}
              className={`relative py-1 flex flex-col items-center font-headline-md text-headline-md tracking-tight ${
                activeTab === "pulse" ? "text-[#f2ca50] font-bold" : "text-[#d0c5af] hover:text-[#e5e1e6]"
              }`}
            >
              <span className="text-[#f2ca50] drop-shadow-[0_0_10px_rgba(242,202,80,0.4)]">
                Pulse
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#f2ca50] mt-0.5 shadow-[0_0_8px_rgba(242,202,80,0.9)]" />
            </button>
          </div>

          {/* Live broadcast / trends */}
          <button
            type="button"
            aria-label="Explore Pulse Trends"
            className="w-10 h-10 rounded-full bg-[#2a2a2d]/60 backdrop-blur-md flex items-center justify-center text-[#e5e1e6] hover:text-[#f2ca50] transition-colors border border-white/10"
          >
            <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
          </button>
        </div>

        {/* Center Screen Ambient Micro-badge */}
        <div className="relative z-10 px-4 flex items-start justify-between pointer-events-none">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0e0e11]/65 backdrop-blur-md border border-[#f2ca50]/20">
            <span className="w-2 h-2 rounded-full bg-[#f2ca50] animate-ping" />
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-[#f2ca50] font-semibold">
              {activePulse.quality}
            </span>
          </div>

          {/* Previous / Next navigation pills */}
          <div className="flex items-center gap-1 pointer-events-auto">
            <button
              type="button"
              onClick={prevPulse}
              aria-label="Previous reel"
              className="w-7 h-7 rounded-full bg-black/50 text-[#e5e1e6] hover:text-[#f2ca50] flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
            </button>
            <button
              type="button"
              onClick={nextPulse}
              aria-label="Next reel"
              className="w-7 h-7 rounded-full bg-black/50 text-[#e5e1e6] hover:text-[#f2ca50] flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
            </button>
          </div>
        </div>

        {/* Main Content Overlays: Bottom Details & Right Quick Actions */}
        <div className="relative z-20 pb-2 px-4 flex items-end justify-between gap-3 w-full">
          {/* Left Column: Creator Identity, Description & Acoustic Track */}
          <div className="flex-1 min-w-0 pr-1 flex flex-col gap-2">
            {/* Creator Header & Direct Action */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-headline-md text-headline-md font-semibold text-[#e5e1e6] truncate">
                {activePulse.creator.handle}
              </span>
              <span
                className="material-symbols-outlined text-[#f2ca50] text-[16px] drop-shadow-[0_0_6px_rgba(242,202,80,0.6)]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>

              {/* Pill Subscribe/Follow Action */}
              <button
                type="button"
                onClick={() => onToggleFollowHandle(activePulse.creator.handle)}
                className={`px-3 py-1 rounded-full font-label-sm text-label-sm tracking-wide font-semibold shadow-[0_0_12px_rgba(242,202,80,0.35)] hover:scale-105 active:scale-95 transition-all ${
                  isFollowed
                    ? "bg-[#2a2a2d] text-[#d0c5af] border border-[#353438]"
                    : "bg-gradient-to-r from-[#f2ca50] to-[#d4af37] text-[#3c2f00]"
                }`}
              >
                {isFollowed ? "Following" : "Follow"}
              </button>
            </div>

            {/* Video Narrative & Hashtags */}
            <p className="font-body-md text-body-md text-[#e5e1e6] leading-snug line-clamp-2 drop-shadow-sm">
              {activePulse.description}
            </p>

            {/* Audio Capsule ticker */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1b1b1e]/70 backdrop-blur-xl w-fit max-w-[260px] shadow-sm border border-[#353438]/50">
              <span className="material-symbols-outlined text-[#f2ca50] text-[16px] animate-pulse">
                graphic_eq
              </span>
              <span className="font-label-md text-label-md text-[#d0c5af] truncate">
                {activePulse.audioTrack}
              </span>
            </div>
          </div>

          {/* Right Column: Tactile Glass Floating Action Pillar (Image 5 & 6) */}
          <div className="flex flex-col items-center gap-3 shrink-0 pb-1">
            {/* Creator Avatar with Glow Follow Badge */}
            <div className="relative mb-1">
              <div className="w-12 h-12 rounded-full p-[1.5px] bg-gradient-to-tr from-[#f2ca50] via-[#ebcc71] to-[#d4af37] shadow-[0_0_14px_rgba(242,202,80,0.4)]">
                <img
                  src={activePulse.creator.avatar}
                  alt={activePulse.creator.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>

              {!isFollowed && (
                <button
                  type="button"
                  onClick={() => onToggleFollowHandle(activePulse.creator.handle)}
                  aria-label="Follow Creator"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#f2ca50] text-[#3c2f00] flex items-center justify-center shadow-[0_0_8px_rgba(242,202,80,0.7)] hover:scale-110 active:scale-90 transition-transform"
                >
                  <span className="material-symbols-outlined text-[14px] font-bold">add</span>
                </button>
              )}
            </div>

            {/* Metric 1: Like Button */}
            <button
              type="button"
              onClick={() => onToggleLikePulse(activePulse.id)}
              className="flex flex-col items-center gap-0.5 group focus:outline-none"
            >
              <div
                className={`w-11 h-11 rounded-full backdrop-blur-xl flex items-center justify-center transition-all shadow-md ${
                  isLiked
                    ? "bg-[#f2ca50]/20 text-[#f2ca50] shadow-[0_0_14px_rgba(242,202,80,0.3)]"
                    : "bg-[#2a2a2d]/65 text-[#e5e1e6] group-hover:text-[#f2ca50]"
                }`}
              >
                <span
                  className="material-symbols-outlined text-[24px]"
                  style={{ fontVariationSettings: isLiked ? "'FILL' 1" : "'FILL' 0" }}
                >
                  thumb_up
                </span>
              </div>
              <span className="font-label-sm text-label-sm font-semibold text-[#e5e1e6]">
                {isLiked ? "1.41M" : activePulse.likes}
              </span>
            </button>

            {/* Metric 2: Dislike Button */}
            <button
              type="button"
              className="flex flex-col items-center gap-0.5 group focus:outline-none text-[#d0c5af] hover:text-[#e5e1e6]"
            >
              <div className="w-11 h-11 rounded-full bg-[#2a2a2d]/65 backdrop-blur-xl flex items-center justify-center transition-all shadow-md">
                <span className="material-symbols-outlined text-[22px]">thumb_down</span>
              </div>
              <span className="font-label-sm text-label-sm font-semibold">Dislike</span>
            </button>

            {/* Metric 3: Comments */}
            <button
              type="button"
              onClick={() => setShowComments(true)}
              className="flex flex-col items-center gap-0.5 group focus:outline-none text-[#e5e1e6] hover:text-[#f2ca50]"
            >
              <div className="w-11 h-11 rounded-full bg-[#2a2a2d]/65 backdrop-blur-xl flex items-center justify-center transition-all shadow-md">
                <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  chat_bubble
                </span>
              </div>
              <span className="font-label-sm text-label-sm font-semibold text-[#e5e1e6]">
                {activePulse.commentsCount}
              </span>
            </button>

            {/* Metric 4: Remix / Studio Lens Pulse Button */}
            <button
              type="button"
              onClick={() => onShare("Remix: " + activePulse.title)}
              className="flex flex-col items-center gap-0.5 group focus:outline-none"
            >
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#d4af37]/80 to-[#353438]/90 backdrop-blur-xl flex items-center justify-center text-[#f2ca50] shadow-[0_0_12px_rgba(212,175,55,0.25)]">
                <span className="material-symbols-outlined text-[22px]">cyclone</span>
              </div>
              <span className="font-label-sm text-label-sm font-semibold text-[#f2ca50]">Remix</span>
            </button>

            {/* Metric 5: Share */}
            <button
              type="button"
              onClick={() => onShare(activePulse.title)}
              className="flex flex-col items-center gap-0.5 group focus:outline-none text-[#e5e1e6] hover:text-[#f2ca50]"
            >
              <div className="w-11 h-11 rounded-full bg-[#2a2a2d]/65 backdrop-blur-xl flex items-center justify-center transition-all shadow-md">
                <span className="material-symbols-outlined text-[24px]">share</span>
              </div>
              <span className="font-label-sm text-label-sm font-semibold text-[#e5e1e6]">
                {activePulse.shares}
              </span>
            </button>

            {/* Rotating Vinyl Master Disc */}
            <div className="pt-1">
              <div className={`w-10 h-10 rounded-full bg-[#0e0e11] p-1 shadow-lg relative flex items-center justify-center border border-[#d4af37]/30 ${isPlaying ? "animate-[spin_6s_linear_infinite]" : ""}`}>
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#353438] via-[#2a2a2d] to-[#353438] flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-[#f2ca50] flex items-center justify-center shadow-[0_0_8px_rgba(242,202,80,0.8)]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0e0e11]" />
                  </div>
                </div>
                <span className="material-symbols-outlined absolute -top-1 -right-1 text-[#f2ca50] text-[14px] animate-bounce">
                  music_note
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Edge-to-Edge Glowing Scrub Timeline Bar */}
        <div
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
            setProgress(pct);
          }}
          className="relative z-30 w-full h-1.5 bg-[#353438]/40 cursor-pointer group"
        >
          <div
            style={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-[#e7c355] to-[#f2ca50] shadow-[0_0_10px_rgba(242,202,80,0.85)] relative"
          >
            <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 rounded-full bg-[#e5e1e6] opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
          </div>
        </div>
      </div>

      {/* Pulse Comments Drawer */}
      {showComments && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center">
          <div className="w-full max-w-sm bg-[#1b1b1e] rounded-t-2xl p-4 border-t border-[#353438] shadow-2xl flex flex-col max-h-[60vh]">
            <div className="flex items-center justify-between pb-3 border-b border-[#353438]/60">
              <span className="font-headline-md text-headline-md font-semibold text-[#e5e1e6]">
                Pulse Comments ({commentsList.length})
              </span>
              <button
                type="button"
                onClick={() => setShowComments(false)}
                className="w-8 h-8 rounded-full bg-[#2a2a2d] flex items-center justify-center text-[#d0c5af] hover:text-[#f2ca50]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar py-3 flex flex-col gap-3">
              {commentsList.map((c) => (
                <div key={c.id} className="flex items-start gap-2 text-xs">
                  <div className="w-6 h-6 rounded-full bg-[#f2ca50]/20 text-[#f2ca50] font-bold flex items-center justify-center shrink-0">
                    {c.author[0]}
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#e5e1e6]">{c.author}</span>
                      <span className="text-[#99907c] text-[10px]">{c.time}</span>
                    </div>
                    <p className="text-[#d0c5af] mt-0.5">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddComment} className="pt-2 border-t border-[#353438]/60 flex items-center gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thought on this short..."
                className="flex-1 h-9 px-3 bg-[#2a2a2d] rounded-lg text-xs text-[#e5e1e6] placeholder:text-[#99907c] focus:outline-none focus:border-[#f2ca50] border border-[#353438]"
              />
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="h-9 px-3 rounded-lg bg-[#f2ca50] text-[#3c2f00] text-xs font-semibold disabled:opacity-40"
              >
                Post
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

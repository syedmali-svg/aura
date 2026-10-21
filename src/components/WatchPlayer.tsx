import React, { useState, useEffect, useRef } from "react";
import { VideoItem, CommentItem, INITIAL_COMMENTS } from "../data/mockData";

interface WatchPlayerProps {
  video: VideoItem;
  allVideos: VideoItem[];
  onSelectVideo: (video: VideoItem) => void;
  onBack: () => void;
  onOpenTipModal: (video: VideoItem) => void;
  onShare: (title: string) => void;
  savedVideoIds: Set<string>;
  onToggleSaveVideo: (videoId: string) => void;
  subscribedChannelIds: Set<string>;
  onToggleSubscribeChannel: (channelId: string) => void;
}

export const WatchPlayer: React.FC<WatchPlayerProps> = ({
  video,
  allVideos,
  onSelectVideo,
  onBack,
  onOpenTipModal,
  onShare,
  savedVideoIds,
  onToggleSaveVideo,
  subscribedChannelIds,
  onToggleSubscribeChannel,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(video.likeCountNumber || 48000);
  const [autoplay, setAutoplay] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState("4K HDR");
  const [showCaptions, setShowCaptions] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState("1.0x");
  const [bellActive, setBellActive] = useState(true);

  // Scrubber timeline state
  // 08:24 out of 24:10 is approx 34.7%
  const totalDurationSeconds = 24 * 60 + 10;
  const [currentSeconds, setCurrentSeconds] = useState(8 * 60 + 24);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Comments state
  const [comments, setComments] = useState<CommentItem[]>(INITIAL_COMMENTS);
  const [newCommentText, setNewCommentText] = useState("");
  const [isCommentsExpanded, setIsCommentsExpanded] = useState(false);

  const isSubscribed = subscribedChannelIds.has(video.creator.id);
  const isSaved = savedVideoIds.has(video.id);

  // Playback timer simulation
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSeconds((prev) => {
          if (prev >= totalDurationSeconds) {
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, totalDurationSeconds]);

  const progressPercent = Math.min(100, Math.max(0, (currentSeconds / totalDurationSeconds) * 100));

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remSecs = Math.floor(secs % 60);
    return `${String(mins).padStart(2, "0")}:${String(remSecs).padStart(2, "0")}`;
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    setCurrentSeconds(Math.floor(pct * totalDurationSeconds));
  };

  const handleToggleLike = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikeCount((prev) => prev - 1);
    } else {
      setIsLiked(true);
      setLikeCount((prev) => prev + 1);
      if (isDisliked) setIsDisliked(false);
    }
  };

  const handleToggleDislike = () => {
    if (isDisliked) {
      setIsDisliked(false);
    } else {
      setIsDisliked(true);
      if (isLiked) {
        setIsLiked(false);
        setLikeCount((prev) => prev - 1);
      }
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: CommentItem = {
      id: "comment-" + Date.now(),
      author: "Carlos Andy (You)",
      handle: "@carlos_curator",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvqKilfJFi0-wL2DHiRu-epTk-5t3eWCK8tom-c_XtL-rnoIFWN_h2fPcxPStEG5I-rXFXjbRiwZhc9I0WO-CTnxz43_gRimYPhlrggys2WAjweOtam2OJxvmOJbjIKLXFXtuKCK9QCn3h_7Sb5_027tqpdAaQBfENLYBBSnQOMN3a2aOY1Du4ld75yN9ZcnaDEsTeZU41JMlmCvYBQlyhs9G2WPqUldYIoR0fd-S7do1cSuS8zUFT",
      timestamp: "Just now",
      text: newCommentText.trim(),
      likes: 1,
    };

    setComments([newComment, ...comments]);
    setNewCommentText("");
  };

  const upNextVideos = allVideos.filter((v) => v.id !== video.id).slice(0, 4);

  return (
    <div className="flex flex-col w-full pb-safe bg-[#131316]">
      {/* Sticky Cinematic Media Container (Image 3 & 4) */}
      <section className="sticky top-16 z-30 w-full bg-[#0e0e11] shadow-[0_12px_28px_rgba(0,0,0,0.85)]">
        <div className="relative w-full aspect-video bg-black overflow-hidden group select-none">
          {/* Player Scene Media */}
          <img
            src={video.thumbnail}
            alt={video.title}
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover transition-all duration-500 ${isPlaying ? "opacity-95" : "opacity-80 scale-[1.01]"}`}
          />

          {/* Gradient Ambient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#131316] via-transparent to-black/60 pointer-events-none" />

          {/* Subtitles Overlay if toggled */}
          {showCaptions && (
            <div className="absolute bottom-16 inset-x-0 flex justify-center pointer-events-none px-6">
              <span className="px-3 py-1 rounded bg-black/80 backdrop-blur-md text-[#f2ca50] font-label-md text-label-md text-center max-w-md">
                "...volumetric bounce and atmospheric haze in Unreal Engine 5.5..."
              </span>
            </div>
          )}

          {/* Center Play/Pause Micro-Action */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="pointer-events-auto w-14 h-14 rounded-full bg-[#131316]/75 backdrop-blur-md flex items-center justify-center text-[#f2ca50] shadow-[0_0_24px_rgba(212,175,55,0.4)] border border-[#f2ca50]/30 transition-transform active:scale-90 hover:scale-110"
            >
              <span
                className="material-symbols-outlined text-[32px] translate-x-0.5"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {isPlaying ? "pause" : "play_arrow"}
              </span>
            </button>
          </div>

          {/* Quick Control Badges Top Right */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
            {/* Quality Pill */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowQualityMenu(!showQualityMenu)}
                className="px-2.5 py-1 rounded-full bg-[#0e0e11]/80 backdrop-blur-md text-[#f2ca50] font-label-sm text-label-sm tracking-wider flex items-center gap-1 shadow-sm border border-[#f2ca50]/30 hover:bg-[#f2ca50] hover:text-[#3c2f00] transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#f2ca50] animate-pulse" />
                {selectedQuality}
              </button>

              {showQualityMenu && (
                <div className="absolute right-0 top-8 mt-1 w-32 bg-[#1f1f22] rounded-xl shadow-2xl border border-[#353438] p-1 z-20 flex flex-col gap-0.5">
                  {["4K HDR", "1440p 60fps", "1080p ProRes", "720p Mobile"].map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => {
                        setSelectedQuality(q);
                        setShowQualityMenu(false);
                      }}
                      className={`px-2.5 py-1.5 text-left rounded-lg text-xs font-medium transition-colors ${
                        selectedQuality === q ? "bg-[#f2ca50] text-[#3c2f00] font-bold" : "text-[#e5e1e6] hover:bg-[#2a2a2d]"
                      }`}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Captions Toggle */}
            <button
              type="button"
              onClick={() => setShowCaptions(!showCaptions)}
              aria-label="Captions"
              className={`w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-colors ${
                showCaptions ? "bg-[#f2ca50] text-[#3c2f00]" : "bg-[#0e0e11]/80 text-[#e5e1e6] hover:text-[#f2ca50]"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">closed_caption</span>
            </button>

            {/* Settings */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowSettings(!showSettings)}
                aria-label="Playback Settings"
                className="w-8 h-8 rounded-full bg-[#0e0e11]/80 backdrop-blur-md flex items-center justify-center text-[#e5e1e6] hover:text-[#f2ca50] transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">settings</span>
              </button>

              {showSettings && (
                <div className="absolute right-0 top-8 mt-1 w-44 bg-[#1f1f22] rounded-xl shadow-2xl border border-[#353438] p-2 z-20 flex flex-col gap-1 text-xs">
                  <span className="text-[#99907c] font-semibold text-[10px] uppercase tracking-wider px-1">
                    Playback Speed
                  </span>
                  <div className="grid grid-cols-4 gap-1 py-1">
                    {["0.75x", "1.0x", "1.5x", "2.0x"].map((speed) => (
                      <button
                        key={speed}
                        type="button"
                        onClick={() => {
                          setPlaybackSpeed(speed);
                          setShowSettings(false);
                        }}
                        className={`py-1 rounded text-center font-medium ${
                          playbackSpeed === speed ? "bg-[#f2ca50] text-[#3c2f00]" : "bg-[#2a2a2d] text-[#e5e1e6]"
                        }`}
                      >
                        {speed}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Lower Scrubber & Controls Dock */}
          <div className="absolute bottom-0 inset-x-0 p-3 flex flex-col gap-1.5 bg-gradient-to-t from-black via-black/80 to-transparent">
            {/* Interactive Progress Timeline */}
            <div
              ref={timelineRef}
              onClick={handleTimelineClick}
              className="relative w-full py-1.5 flex items-center cursor-pointer group/scrub"
            >
              <div className="w-full h-1 bg-[#353438] rounded-full relative overflow-visible">
                {/* Buffer Bar */}
                <div className="absolute left-0 top-0 h-full w-[70%] bg-[#4d4635]/60 rounded-full" />

                {/* Active Scrubber Bar */}
                <div
                  style={{ width: `${progressPercent}%` }}
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#e7c355] to-[#f2ca50] rounded-full shadow-[0_0_8px_rgba(212,175,55,0.8)]"
                />

                {/* Radiant Gold Dot Knob */}
                <div
                  style={{ left: `${progressPercent}%` }}
                  className="absolute -top-1.5 -translate-x-1/2 w-4 h-4 rounded-full bg-[#f2ca50] shadow-[0_0_12px_rgba(242,202,80,0.9)] flex items-center justify-center transition-transform group-hover/scrub:scale-125"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3c2f00]" />
                </div>
              </div>
            </div>

            {/* Timecode & Secondary Playback Controls */}
            <div className="flex items-center justify-between text-[#d0c5af]">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-[#e5e1e6] hover:text-[#f2ca50] text-[20px] transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {isPlaying ? "pause" : "play_arrow"}
                  </span>
                </button>
                <span className="font-label-md text-label-md text-[#e5e1e6] tracking-tight">
                  {formatTime(currentSeconds)}{" "}
                  <span className="text-[#99907c]">/ {formatTime(totalDurationSeconds)}</span>
                </span>
              </div>

              <div className="flex items-center gap-3 text-[#e5e1e6]">
                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  aria-label="Audio Stream"
                  className="hover:text-[#f2ca50] transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {isMuted ? "volume_off" : "volume_up"}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={onBack}
                  aria-label="Theater Mode"
                  className="hover:text-[#f2ca50] transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">picture_in_picture_alt</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (document.fullscreenElement) {
                      document.exitFullscreen().catch(() => {});
                    } else {
                      document.documentElement.requestFullscreen().catch(() => {});
                    }
                  }}
                  aria-label="Fullscreen"
                  className="hover:text-[#f2ca50] transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">fullscreen</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Meta & Details Area */}
      <div className="px-4 flex flex-col gap-4 pt-4">
        {/* Header Block: Title & Stats */}
        <div className="flex flex-col gap-1">
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile font-semibold text-[#e5e1e6] leading-snug">
            {video.title}
          </h2>
          <div className="flex items-center flex-wrap gap-x-2 gap-y-0.5 text-[#d0c5af] font-label-md text-label-md">
            <span className="text-[#e5e1e6] font-semibold">{video.views}</span>
            <span>•</span>
            <span>{video.timestamp}</span>
            <span>•</span>
            {video.tags.map((tag) => (
              <span key={tag} className="text-[#f2ca50] hover:underline cursor-pointer">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Creator Channel Info Row (Image 3 & 4) */}
        <div className="flex items-center justify-between gap-3 bg-[#1b1b1e] p-2.5 rounded-xl border border-[#353438]/50">
          <div className="flex items-center gap-3 min-w-0">
            {/* Creator Avatar with Glowing Gold Ring */}
            <div className="relative flex-shrink-0">
              <div className="w-11 h-11 rounded-full p-[1.5px] bg-gradient-to-tr from-[#e7c355] to-[#f2ca50] shadow-[0_0_12px_rgba(212,175,55,0.4)]">
                <img
                  src={video.creator.avatar}
                  alt={video.creator.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#f2ca50] flex items-center justify-center text-[#3c2f00]">
                <span className="material-symbols-outlined text-[10px] font-bold">star</span>
              </span>
            </div>

            {/* Handle & Sub Count */}
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1">
                <span className="font-headline-md text-headline-md font-semibold text-[#e5e1e6] truncate">
                  {video.creator.name}
                </span>
                {video.creator.isVerified && (
                  <span
                    className="material-symbols-outlined text-[#f2ca50] text-[15px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                )}
              </div>
              <span className="font-label-sm text-label-sm text-[#99907c] tracking-wider">
                {video.creator.subscribers} SUBSCRIBERS
              </span>
            </div>
          </div>

          {/* Action: Subscribe & Bell */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              type="button"
              onClick={() => onToggleSubscribeChannel(video.creator.id)}
              className={`px-4 py-2 rounded-full font-label-lg text-label-lg font-semibold active:scale-95 transition-all ${
                isSubscribed
                  ? "bg-[#2a2a2d] text-[#99907c] hover:text-[#e5e1e6]"
                  : "bg-gradient-to-r from-[#f2ca50] to-[#d4af37] text-[#3c2f00] shadow-[0_0_16px_rgba(212,175,55,0.35)]"
              }`}
            >
              {isSubscribed ? "Subscribed" : "Subscribe"}
            </button>

            <button
              type="button"
              onClick={() => setBellActive(!bellActive)}
              aria-label="Notification settings"
              className={`w-9 h-9 rounded-full bg-[#2a2a2d] flex items-center justify-center transition-colors ${
                bellActive ? "text-[#f2ca50]" : "text-[#d0c5af] hover:text-[#e5e1e6]"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {bellActive ? "notifications_active" : "notifications"}
              </span>
            </button>
          </div>
        </div>

        {/* Luxury Horizontal Actions Strip */}
        <div className="overflow-x-auto no-scrollbar -mx-4 px-4">
          <div className="flex items-center gap-2 w-max py-0.5">
            {/* Like & Dislike Split Pill */}
            <div className="flex items-center rounded-full bg-[#2a2a2d] text-[#e5e1e6] shadow-sm border border-[#353438]/50">
              <button
                type="button"
                onClick={handleToggleLike}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-l-full active:bg-[#39393c] transition-colors ${
                  isLiked ? "text-[#f2ca50]" : "hover:text-[#f2ca50]"
                }`}
              >
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={{ fontVariationSettings: isLiked ? "'FILL' 1" : "'FILL' 0" }}
                >
                  thumb_up
                </span>
                <span className="font-label-md text-label-md font-semibold">
                  {likeCount >= 1000 ? `${(likeCount / 1000).toFixed(0)}K` : likeCount}
                </span>
              </button>

              <div className="w-[1px] h-4 bg-[#4d4635]/40" />

              <button
                type="button"
                onClick={handleToggleDislike}
                aria-label="Dislike"
                className={`px-3 py-2 rounded-r-full active:bg-[#39393c] transition-colors ${
                  isDisliked ? "text-[#f2ca50]" : "hover:text-[#f2ca50]"
                }`}
              >
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={{ fontVariationSettings: isDisliked ? "'FILL' 1" : "'FILL' 0" }}
                >
                  thumb_down
                </span>
              </button>
            </div>

            {/* Super Thanks / Tip Creator */}
            <button
              type="button"
              onClick={() => onOpenTipModal(video)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-gradient-to-r from-[#353438] to-[#2a2a2d] text-[#f2ca50] shadow-[0_0_12px_rgba(212,175,55,0.2)] active:scale-95 transition-transform border border-[#f2ca50]/20"
            >
              <span className="material-symbols-outlined text-[18px] text-[#f2ca50]" style={{ fontVariationSettings: "'FILL' 1" }}>
                monetization_on
              </span>
              <span className="font-label-md text-label-md font-semibold text-[#e5e1e6]">
                Tip Creator
              </span>
            </button>

            {/* Share */}
            <button
              type="button"
              onClick={() => onShare(video.title)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#2a2a2d] text-[#e5e1e6] hover:text-[#f2ca50] transition-colors border border-[#353438]/40"
            >
              <span className="material-symbols-outlined text-[18px]">share</span>
              <span className="font-label-md text-label-md font-semibold">Share</span>
            </button>

            {/* Remix */}
            <button
              type="button"
              onClick={() => onShare("Remix: " + video.title)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#2a2a2d] text-[#e5e1e6] hover:text-[#f2ca50] transition-colors border border-[#353438]/40"
            >
              <span className="material-symbols-outlined text-[18px]">movie_edit</span>
              <span className="font-label-md text-label-md font-semibold">Remix</span>
            </button>

            {/* Download */}
            <button
              type="button"
              onClick={() => onToggleSaveVideo(video.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#2a2a2d] transition-colors border border-[#353438]/40 ${
                isSaved ? "text-[#f2ca50] bg-[#353438]" : "text-[#e5e1e6] hover:text-[#f2ca50]"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isSaved ? "download_done" : "arrow_downward"}
              </span>
              <span className="font-label-md text-label-md font-semibold">
                {isSaved ? "Saved" : "Download"}
              </span>
            </button>

            {/* Save to Playlist */}
            <button
              type="button"
              onClick={() => onToggleSaveVideo(video.id)}
              aria-label="Save to Playlist"
              className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#2a2a2d] text-[#e5e1e6] hover:text-[#f2ca50] transition-colors border border-[#353438]/40"
            >
              <span className="material-symbols-outlined text-[18px]">playlist_add</span>
            </button>
          </div>
        </div>

        {/* Collapsible Comments Preview Card */}
        <div className="flex flex-col bg-[#1b1b1e] p-3.5 rounded-xl border border-[#353438]/50">
          <div
            onClick={() => setIsCommentsExpanded(!isCommentsExpanded)}
            className="flex items-center justify-between mb-2 cursor-pointer hover:text-[#f2ca50] transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="font-headline-md text-headline-md font-semibold text-[#e5e1e6]">Comments</span>
              <span className="font-label-md text-label-md text-[#99907c]">{video.commentsCount || comments.length}</span>
            </div>
            <span className="material-symbols-outlined text-[#99907c] text-[20px]">
              {isCommentsExpanded ? "unfold_less" : "unfold_more"}
            </span>
          </div>

          {/* Pinned Comment Snippet */}
          {comments[0] && (
            <div className="flex items-start gap-2.5 pt-1 border-t border-[#353438]/30">
              <div className="relative flex-shrink-0">
                <img
                  src={comments[0].avatar}
                  alt={comments[0].author}
                  referrerPolicy="no-referrer"
                  className="w-7 h-7 rounded-full object-cover ring-1 ring-[#f2ca50]/40"
                />
                {comments[0].isPinned && (
                  <span className="absolute -bottom-1 -right-1 text-[#f2ca50]">
                    <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      keep
                    </span>
                  </span>
                )}
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-label-md text-label-md font-semibold text-[#f2ca50] truncate">
                    {comments[0].author}
                  </span>
                  {comments[0].isPinned && (
                    <span className="px-1 py-0.2 bg-[#f2ca50]/20 text-[#f2ca50] rounded font-label-sm text-[9px] uppercase tracking-wider font-bold">
                      Pinned
                    </span>
                  )}
                  <span className="font-label-sm text-label-sm text-[#99907c]">{comments[0].timestamp}</span>
                </div>
                <p className="font-body-sm text-body-sm text-[#d0c5af] line-clamp-2 mt-0.5">
                  {comments[0].text}
                </p>
              </div>
            </div>
          )}

          {/* Expanded Comments List & Input */}
          {isCommentsExpanded && (
            <div className="mt-4 pt-3 border-t border-[#353438]/50 flex flex-col gap-3">
              <form onSubmit={handleAddComment} className="flex items-center gap-2">
                <input
                  type="text"
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="Add a curated reflection..."
                  className="flex-1 h-9 px-3 bg-[#2a2a2d] rounded-lg text-xs text-[#e5e1e6] placeholder:text-[#99907c] border border-[#353438] focus:outline-none focus:border-[#f2ca50]"
                />
                <button
                  type="submit"
                  disabled={!newCommentText.trim()}
                  className="h-9 px-3 rounded-lg bg-[#f2ca50] text-[#3c2f00] text-xs font-semibold disabled:opacity-40 transition-opacity"
                >
                  Post
                </button>
              </form>

              <div className="flex flex-col gap-2.5 max-h-60 overflow-y-auto no-scrollbar">
                {comments.slice(1).map((c) => (
                  <div key={c.id} className="flex items-start gap-2.5 text-xs">
                    <img
                      src={c.avatar}
                      alt={c.author}
                      referrerPolicy="no-referrer"
                      className="w-6 h-6 rounded-full object-cover shrink-0 mt-0.5"
                    />
                    <div className="flex flex-col flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-[#e5e1e6]">{c.author}</span>
                        <span className="text-[#99907c] text-[10px]">{c.timestamp}</span>
                      </div>
                      <p className="text-[#d0c5af] mt-0.5">{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Up Next / Recommended Showcase */}
        <div className="flex flex-col gap-3 pt-1 pb-12">
          {/* Section Title & Autoplay toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#f2ca50] text-[20px]">auto_awesome</span>
              <h3 className="font-headline-md text-headline-md font-semibold text-[#e5e1e6]">Up Next</h3>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="font-label-sm text-label-sm text-[#99907c] uppercase tracking-wider">Autoplay</span>
              <button
                type="button"
                onClick={() => setAutoplay(!autoplay)}
                aria-label="Toggle autoplay"
                className={`w-9 h-5 rounded-full p-0.5 transition-colors relative ${
                  autoplay ? "bg-[#f2ca50]" : "bg-[#353438]"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-[#3c2f00] transition-transform shadow-xs ${
                    autoplay ? "translate-x-4" : "translate-x-0 bg-[#99907c]"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Up Next Video List */}
          <div className="flex flex-col gap-2.5">
            {upNextVideos.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectVideo(item);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="flex gap-3 p-2 rounded-xl bg-[#1f1f22] hover:bg-[#2a2a2d] transition-colors cursor-pointer group border border-[#353438]/40"
              >
                {/* Thumbnail */}
                <div className="relative w-36 aspect-video flex-shrink-0 rounded-lg overflow-hidden bg-[#0e0e11]">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-[#0e0e11]/85 font-label-sm text-label-sm text-white">
                    {item.duration}
                  </span>
                </div>

                {/* Metadata */}
                <div className="flex flex-col justify-between py-0.5 min-w-0 flex-1">
                  <div className="flex flex-col">
                    <h4 className="font-label-lg text-label-lg font-semibold text-[#e5e1e6] line-clamp-2 group-hover:text-[#f2ca50] transition-colors leading-snug">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-1 mt-1 text-[#d0c5af] font-label-sm text-label-sm">
                      <span className="truncate">{item.creator.name}</span>
                      {item.creator.isVerified && (
                        <span
                          className="material-symbols-outlined text-[#f2ca50] text-[12px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          verified
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="font-label-sm text-label-sm text-[#99907c]">
                    {item.views} • {item.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

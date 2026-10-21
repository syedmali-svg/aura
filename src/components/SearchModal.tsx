import React, { useState, useMemo } from "react";
import { VideoItem, PulseItem } from "../data/mockData";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  videos: VideoItem[];
  pulseItems: PulseItem[];
  onSelectVideo: (video: VideoItem) => void;
  onSelectPulse: (pulse: PulseItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  videos,
  pulseItems,
  onSelectVideo,
  onSelectPulse,
}) => {
  const [query, setQuery] = useState("");

  const searchResults = useMemo(() => {
    if (!query.trim()) return { videos: [], pulses: [] };
    const q = query.toLowerCase();
    const matchedVideos = videos.filter(
      (v) =>
        v.title.toLowerCase().includes(q) ||
        v.creator.name.toLowerCase().includes(q) ||
        v.tags.some((t) => t.toLowerCase().includes(q)) ||
        v.category.toLowerCase().includes(q)
    );
    const matchedPulses = pulseItems.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.creator.name.toLowerCase().includes(q) ||
        p.creator.handle.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
    return { videos: matchedVideos, pulses: matchedPulses };
  }, [query, videos, pulseItems]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col p-4 max-w-lg mx-auto">
      {/* Search Input Bar */}
      <div className="flex items-center gap-2 pt-2 pb-4">
        <div className="relative flex-1 flex items-center">
          <span className="material-symbols-outlined absolute left-3.5 text-[20px] text-[#f2ca50]">
            search
          </span>
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 4K masterworks, directors, LUTs, or tags..."
            className="w-full h-12 pl-11 pr-10 rounded-xl bg-[#1f1f22] text-[#e5e1e6] placeholder:text-[#99907c] text-sm border border-[#353438] focus:border-[#f2ca50] outline-none shadow-lg"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 text-[#99907c] hover:text-[#e5e1e6]"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="px-3 py-2 text-xs font-semibold text-[#f2ca50] hover:underline"
        >
          Cancel
        </button>
      </div>

      {/* Suggested Quick Searches */}
      {!query && (
        <div className="flex flex-col gap-3 py-4">
          <span className="text-xs text-[#99907c] uppercase tracking-wider font-semibold">
            Trending Atelier Searches
          </span>
          <div className="flex flex-wrap gap-2">
            {[
              "Unreal Engine 5.5",
              "Anamorphic 65mm",
              "Horology Noir",
              "Tokyo Midnight 8K",
              "Dolby Atmos Hypercars",
              "Mediterranean Brutalism",
            ].map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => setQuery(term)}
                className="px-3 py-1.5 rounded-full bg-[#2a2a2d] text-xs text-[#e5e1e6] hover:bg-[#353438] hover:text-[#f2ca50] transition-colors border border-[#353438]"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {query && (
        <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-4 pb-8">
          {searchResults.videos.length === 0 && searchResults.pulses.length === 0 ? (
            <div className="py-12 text-center text-[#99907c] text-xs">
              No masterworks found matching "{query}". Try a different director or tag.
            </div>
          ) : (
            <>
              {searchResults.videos.length > 0 && (
                <div className="flex flex-col gap-2">
                  <span className="text-xs text-[#99907c] uppercase tracking-wider font-semibold">
                    Masterworks ({searchResults.videos.length})
                  </span>
                  {searchResults.videos.map((v) => (
                    <div
                      key={v.id}
                      onClick={() => {
                        onSelectVideo(v);
                        onClose();
                      }}
                      className="flex items-center gap-3 p-2 rounded-xl bg-[#1b1b1e] hover:bg-[#2a2a2d] cursor-pointer border border-[#353438]/50 transition-colors"
                    >
                      <img
                        src={v.thumbnail}
                        alt={v.title}
                        className="w-24 aspect-video rounded-lg object-cover shrink-0"
                      />
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-semibold text-[#e5e1e6] line-clamp-1">
                          {v.title}
                        </span>
                        <span className="text-[11px] text-[#f2ca50] truncate">{v.creator.name}</span>
                        <span className="text-[10px] text-[#99907c]">
                          {v.views} • {v.quality}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {searchResults.pulses.length > 0 && (
                <div className="flex flex-col gap-2 mt-2">
                  <span className="text-xs text-[#99907c] uppercase tracking-wider font-semibold">
                    Pulse Shorts ({searchResults.pulses.length})
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {searchResults.pulses.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          onSelectPulse(p);
                          onClose();
                        }}
                        className="relative aspect-[9/16] rounded-xl overflow-hidden bg-[#1b1b1e] cursor-pointer group border border-[#353438]/50"
                      >
                        <img
                          src={p.thumbnail}
                          alt={p.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-xs font-semibold text-[#e5e1e6] line-clamp-1">
                            {p.title}
                          </p>
                          <span className="text-[10px] text-[#f2ca50]">{p.creator.handle}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

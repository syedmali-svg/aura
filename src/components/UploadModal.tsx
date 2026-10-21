import React, { useState } from "react";
import { VideoItem, PulseItem, CATEGORIES } from "../data/mockData";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddVideo: (video: VideoItem) => void;
  onAddPulse: (pulse: PulseItem) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onAddVideo,
  onAddPulse,
}) => {
  const [mediaType, setMediaType] = useState<"video" | "pulse">("video");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Cinematography");
  const [quality, setQuality] = useState("4K UHD");
  const [tags, setTags] = useState("cinematography, 4k, masterwork");
  const [audioTrack, setAudioTrack] = useState("Original Sound — Master Studio Mix");
  const [aspect, setAspect] = useState("16:9");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const parsedTags = tags.split(",").map((t) => t.trim().replace(/^#/, "")).filter(Boolean);

      if (mediaType === "video") {
        const newVideo: VideoItem = {
          id: "custom-video-" + Date.now(),
          title: title.trim(),
          description: description.trim() || "A new cinematic masterwork uploaded to Aura Atelier.",
          creator: {
            id: "user-atelier",
            name: "Carlos Andy Studios",
            handle: "@carlos_curator",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvqKilfJFi0-wL2DHiRu-epTk-5t3eWCK8tom-c_XtL-rnoIFWN_h2fPcxPStEG5I-rXFXjbRiwZhc9I0WO-CTnxz43_gRimYPhlrggys2WAjweOtam2OJxvmOJbjIKLXFXtuKCK9QCn3h_7Sb5_027tqpdAaQBfENLYBBSnQOMN3a2aOY1Du4ld75yN9ZcnaDEsTeZU41JMlmCvYBQlyhs9G2WPqUldYIoR0fd-S7do1cSuS8zUFT",
            isVerified: true,
            subscribers: "12.4K",
          },
          thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuCh0GFYKSnCoi-mhKS72XECakKO7v7R0sfdgTP5_IrlcqxsO9OKxJYxrj10f5rgNeZc4x5uB7K5d1o9d7sSv5oWUiDM39u3GkPEK9moukG9rG9sm5WM43763Nipl97A5SET6hq3t8en87DDMZhu4h_JYxu8mAmovuhPrePxQOYnGNZqSVO-mZeAUlXswF3_z1hE7QTFlDKDzAd5UrRkG2aRbstoHu87FvLoZrF21twJ79kIubR-_I7f",
          duration: "15:20",
          views: "Just now",
          timestamp: "Just now",
          badges: [quality, "New Upload"],
          quality,
          likes: "1",
          likeCountNumber: 1,
          commentsCount: 0,
          category,
          tags: parsedTags,
        };
        onAddVideo(newVideo);
      } else {
        const newPulse: PulseItem = {
          id: "custom-pulse-" + Date.now(),
          title: title.trim(),
          description: description.trim() || title.trim(),
          creator: {
            name: "Carlos Andy",
            handle: "@carlos_curator",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvqKilfJFi0-wL2DHiRu-epTk-5t3eWCK8tom-c_XtL-rnoIFWN_h2fPcxPStEG5I-rXFXjbRiwZhc9I0WO-CTnxz43_gRimYPhlrggys2WAjweOtam2OJxvmOJbjIKLXFXtuKCK9QCn3h_7Sb5_027tqpdAaQBfENLYBBSnQOMN3a2aOY1Du4ld75yN9ZcnaDEsTeZU41JMlmCvYBQlyhs9G2WPqUldYIoR0fd-S7do1cSuS8zUFT",
            isVerified: true,
          },
          thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuDD1xDCVtPwrihgPIy0G2JEaVCXmsdFtiV2fZFVjMHmSLmGvz0O1Qp3fAqP9-RzaVKcz19N6WCY4zFGXKFDEKshaBui7XUKIaU219X-GJ1mtoRNTlQkbK1mwWc1WKOu33ARlXc9p3glOX3iS86WpLzGbuwepTqT3E5XF4kaWilA9aAwitmoDkVawYrTdMyiQ0O-V-umLIbKED9YYh7Ags0IpEVkWlxPdaMku-2q0FxFX43y-YwIf_Av",
          views: "1",
          likes: "1",
          likeCountNumber: 1,
          commentsCount: "0",
          shares: "0",
          audioTrack: audioTrack.trim(),
          quality: quality + " • 24fps",
          tags: parsedTags,
        };
        onAddPulse(newPulse);
      }

      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm bg-[#1b1b1e] rounded-2xl border border-[#d4af37]/40 shadow-2xl p-6 text-[#e5e1e6] max-h-[90vh] overflow-y-auto no-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#353438]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#f2ca50]">video_call</span>
            <span className="font-headline-md text-headline-md font-bold text-[#e5e1e6]">
              Studio Upload
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#2a2a2d] flex items-center justify-center text-[#d0c5af] hover:text-[#e5e1e6]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Format Switcher */}
        <div className="grid grid-cols-2 gap-2 my-4 p-1 rounded-xl bg-[#2a2a2d] border border-[#353438]">
          <button
            type="button"
            onClick={() => setMediaType("video")}
            className={`py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              mediaType === "video"
                ? "bg-[#f2ca50] text-[#3c2f00] shadow-sm"
                : "text-[#d0c5af] hover:text-[#e5e1e6]"
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">movie</span>
            <span>4K Masterwork</span>
          </button>
          <button
            type="button"
            onClick={() => setMediaType("pulse")}
            className={`py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              mediaType === "pulse"
                ? "bg-[#f2ca50] text-[#3c2f00] shadow-sm"
                : "text-[#d0c5af] hover:text-[#e5e1e6]"
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">bolt</span>
            <span>Pulse Short (9:16)</span>
          </button>
        </div>

        {/* Upload Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-[#99907c]">Title</label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={mediaType === "video" ? "e.g. Anamorphic Nocturne in Shibuya" : "e.g. 50mm f/1.2 Wet Asphalt Study"}
              className="h-10 px-3 bg-[#2a2a2d] rounded-xl text-xs text-[#e5e1e6] placeholder:text-[#99907c] border border-[#353438] focus:border-[#f2ca50] outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-[#99907c]">Narrative / Description</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe color grading, camera rig, and post-production details..."
              className="p-2.5 bg-[#2a2a2d] rounded-xl text-xs text-[#e5e1e6] placeholder:text-[#99907c] border border-[#353438] focus:border-[#f2ca50] outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-[#99907c]">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-10 px-2 bg-[#2a2a2d] rounded-xl text-xs text-[#e5e1e6] border border-[#353438] focus:border-[#f2ca50] outline-none"
              >
                {CATEGORIES.filter((c) => c !== "All").map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-[#99907c]">Quality Master</label>
              <select
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
                className="h-10 px-2 bg-[#2a2a2d] rounded-xl text-xs text-[#e5e1e6] border border-[#353438] focus:border-[#f2ca50] outline-none"
              >
                <option value="4K UHD">4K UHD</option>
                <option value="4K HDR">4K HDR</option>
                <option value="8K Cinema Raw">8K Cinema Raw</option>
                <option value="Dolby Atmos">Dolby Atmos</option>
              </select>
            </div>
          </div>

          {mediaType === "pulse" ? (
            <div className="flex flex-col gap-1">
              <label className="text-xs text-[#99907c]">Audio Track / Stem</label>
              <input
                value={audioTrack}
                onChange={(e) => setAudioTrack(e.target.value)}
                placeholder="e.g. Original Sound — Binaural Shinjuku"
                className="h-10 px-3 bg-[#2a2a2d] rounded-xl text-xs text-[#e5e1e6] border border-[#353438] focus:border-[#f2ca50] outline-none"
              />
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <label className="text-xs text-[#99907c]">Aspect Ratio</label>
              <select
                value={aspect}
                onChange={(e) => setAspect(e.target.value)}
                className="h-10 px-2 bg-[#2a2a2d] rounded-xl text-xs text-[#e5e1e6] border border-[#353438] focus:border-[#f2ca50] outline-none"
              >
                <option value="16:9">16:9 Standard Cinema</option>
                <option value="2.39:1">2.39:1 Anamorphic Scope</option>
                <option value="4:3">4:3 Academy Classic</option>
              </select>
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-xs text-[#99907c]">Tags (comma separated)</label>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. cinema, anamorphic, 4k, lighting"
              className="h-10 px-3 bg-[#2a2a2d] rounded-xl text-xs text-[#e5e1e6] border border-[#353438] focus:border-[#f2ca50] outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 h-12 rounded-full bg-gradient-to-r from-[#f2ca50] to-[#d4af37] text-[#3c2f00] font-bold text-xs shadow-[0_0_16px_rgba(242,202,80,0.4)] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isSubmitting ? (
              <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
                <span>Publish to Aura Atelier</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

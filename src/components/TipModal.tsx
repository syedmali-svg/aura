import React, { useState } from "react";
import { VideoItem } from "../data/mockData";

interface TipModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: VideoItem;
}

export const TipModal: React.FC<TipModalProps> = ({ isOpen, onClose, video }) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(10);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [message, setMessage] = useState<string>("Thank you for the masterclass in cinematography!");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSendTip = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2000);
  };

  const amountToTip = customAmount ? parseFloat(customAmount) : selectedAmount;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm bg-[#1b1b1e] rounded-2xl border border-[#d4af37]/40 shadow-2xl p-6 text-[#e5e1e6]">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-[#99907c] hover:text-[#e5e1e6]"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {isSuccess ? (
          <div className="flex flex-col items-center text-center py-6">
            <div className="w-16 h-16 rounded-full bg-[#f2ca50]/20 flex items-center justify-center text-[#f2ca50] mb-3 shadow-[0_0_24px_rgba(242,202,80,0.5)]">
              <span className="material-symbols-outlined text-[36px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                favorite
              </span>
            </div>
            <h3 className="font-headline-md text-headline-md font-bold text-[#e5e1e6]">
              Super Thanks Dispatched!
            </h3>
            <p className="font-body-sm text-body-sm text-[#f2ca50] mt-1 font-semibold">
              ${amountToTip.toFixed(2)} sent to {video.creator.name}
            </p>
            <p className="text-xs text-[#d0c5af] mt-2">
              Your patron badge is now highlighted in the studio comments reel.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSendTip} className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-[#f2ca50] to-[#d4af37]">
                <img
                  src={video.creator.avatar}
                  alt={video.creator.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-[#99907c] uppercase tracking-wider font-semibold">
                  Send Super Thanks
                </span>
                <span className="font-headline-md text-headline-md font-bold text-[#e5e1e6]">
                  {video.creator.name}
                </span>
              </div>
            </div>

            {/* Quick Amounts */}
            <div className="grid grid-cols-4 gap-2 pt-1">
              {[5, 10, 25, 50].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => {
                    setSelectedAmount(amt);
                    setCustomAmount("");
                  }}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    !customAmount && selectedAmount === amt
                      ? "bg-[#f2ca50] text-[#3c2f00] shadow-[0_0_12px_rgba(242,202,80,0.4)]"
                      : "bg-[#2a2a2d] text-[#e5e1e6] hover:bg-[#353438]"
                  }`}
                >
                  ${amt}
                </button>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="relative flex items-center">
              <span className="absolute left-3 text-xs text-[#99907c] font-bold">$</span>
              <input
                type="number"
                min="1"
                step="any"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder="Or enter custom amount"
                className="w-full h-10 pl-7 pr-3 bg-[#2a2a2d] rounded-xl text-xs text-[#e5e1e6] placeholder:text-[#99907c] border border-[#353438] focus:border-[#f2ca50] outline-none"
              />
            </div>

            {/* Patron Message */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-[#99907c]">Curator Patron Note</label>
              <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2.5 bg-[#2a2a2d] rounded-xl text-xs text-[#e5e1e6] border border-[#353438] focus:border-[#f2ca50] outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="mt-1 h-12 rounded-full bg-gradient-to-r from-[#f2ca50] to-[#d4af37] text-[#3c2f00] font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.35)] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                monetization_on
              </span>
              <span>Send ${amountToTip.toFixed(2)} Tip</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

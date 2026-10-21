import React, { useState } from "react";

interface UserProfile {
  name: string;
  email: string;
  handle: string;
  role: string;
  avatar: string;
  membershipTier: string;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onLogin: (user: UserProfile) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout,
}) => {
  const [authMode, setAuthMode] = useState<"screening" | "atelier">("screening");
  const [email, setEmail] = useState("curator@aura.cinema");
  const [password, setPassword] = useState("CinemaMaster2025!");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [faceIdActive, setFaceIdActive] = useState(false);
  const [applyMembershipModal, setApplyMembershipModal] = useState(false);
  const [applySubmitted, setApplySubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSimulatedLogin = (provider?: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin({
        name: "Carlos Andy",
        email: email || "carlosandy041@gmail.com",
        handle: "@carlos_curator",
        role: "VIP Atelier Curator",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvqKilfJFi0-wL2DHiRu-epTk-5t3eWCK8tom-c_XtL-rnoIFWN_h2fPcxPStEG5I-rXFXjbRiwZhc9I0WO-CTnxz43_gRimYPhlrggys2WAjweOtam2OJxvmOJbjIKLXFXtuKCK9QCn3h_7Sb5_027tqpdAaQBfENLYBBSnQOMN3a2aOY1Du4ld75yN9ZcnaDEsTeZU41JMlmCvYBQlyhs9G2WPqUldYIoR0fd-S7do1cSuS8zUFT",
        membershipTier: "Atelier Black Diamond",
      });
      onClose();
    }, 700);
  };

  const handleFaceId = () => {
    setFaceIdActive(true);
    setTimeout(() => {
      setFaceIdActive(false);
      handleSimulatedLogin("Face ID");
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-sm bg-[#131316] rounded-2xl border border-[#353438] shadow-2xl p-6 text-[#e5e1e6] my-8 max-h-[90vh] overflow-y-auto no-scrollbar">
        {/* Top Controls: Dismiss & Guest / Style Toggle */}
        <div className="flex justify-between items-center mb-4">
          <button
            type="button"
            onClick={onClose}
            aria-label="Dismiss"
            className="w-10 h-10 rounded-full bg-[#2a2a2d]/80 text-[#d0c5af] hover:text-[#f2ca50] flex items-center justify-center transition-all duration-200 active:scale-95"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>

          <div className="flex items-center gap-1.5 bg-[#1b1b1e] p-1 rounded-full border border-[#353438]">
            <button
              type="button"
              onClick={() => setAuthMode("screening")}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                authMode === "screening" ? "bg-[#f2ca50] text-[#3c2f00]" : "text-[#d0c5af] hover:text-[#e5e1e6]"
              }`}
            >
              Screening
            </button>
            <button
              type="button"
              onClick={() => setAuthMode("atelier")}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                authMode === "atelier" ? "bg-[#f2ca50] text-[#3c2f00]" : "text-[#d0c5af] hover:text-[#e5e1e6]"
              }`}
            >
              Atelier
            </button>
          </div>
        </div>

        {currentUser ? (
          /* Already Logged In Profile View */
          <div className="flex flex-col items-center text-center py-4">
            <div className="relative w-20 h-20 rounded-full p-[2px] bg-gradient-to-tr from-[#f2ca50] to-[#d4af37] shadow-[0_0_20px_rgba(242,202,80,0.4)] mb-3">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-full h-full rounded-full object-cover"
              />
              <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-[#f2ca50] flex items-center justify-center text-[#3c2f00]">
                <span className="material-symbols-outlined text-[12px] font-bold">verified</span>
              </span>
            </div>

            <h3 className="font-headline-md text-headline-md font-bold text-[#e5e1e6]">
              {currentUser.name}
            </h3>
            <p className="font-label-md text-label-md text-[#f2ca50] font-semibold mt-0.5">
              {currentUser.handle} • {currentUser.membershipTier}
            </p>
            <p className="font-body-sm text-body-sm text-[#d0c5af] mt-1">{currentUser.email}</p>

            <div className="w-full mt-6 p-3 rounded-xl bg-[#1f1f22] border border-[#353438] flex flex-col gap-2 text-left">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#99907c]">Membership Status</span>
                <span className="text-[#f2ca50] font-bold">Active Curatorship</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#99907c]">Offline Storage Cap</span>
                <span className="text-[#e5e1e6]">500 GB (ProRes 422 HQ)</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#99907c]">Studio Early Access</span>
                <span className="text-[#e5e1e6]">Enabled (UE 5.5 LUTs)</span>
              </div>
            </div>

            <div className="flex gap-2 w-full mt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl bg-[#2a2a2d] hover:bg-[#353438] font-label-md text-label-md font-semibold text-[#e5e1e6] transition-colors"
              >
                Done
              </button>
              <button
                type="button"
                onClick={onLogout}
                className="px-4 py-2.5 rounded-xl bg-[#93000a]/30 text-[#ffb4ab] hover:bg-[#93000a]/50 font-label-md text-label-md font-semibold transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : authMode === "screening" ? (
          /* Style 1: Screen 9 & 10 (Curator Screening Pass) */
          <div className="flex flex-col">
            <div className="flex flex-col items-center text-center mt-2 mb-6 relative">
              <div className="relative w-24 h-24 flex items-center justify-center mb-2">
                <div className="absolute inset-0 rounded-full bg-[#f2ca50]/10 blur-xl" />
                <div className="w-20 h-20 rounded-2xl bg-[#1b1b1e] shadow-xl flex items-center justify-center relative shadow-[0_0_35px_rgba(212,175,55,0.2)] border border-[#d4af37]/30">
                  <svg
                    className="w-10 h-10 text-[#f2ca50] drop-shadow-[0_2px_10px_rgba(242,202,80,0.5)]"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <polygon fill="currentColor" fillOpacity="0.9" points="6 3 20 12 6 21 6 3" />
                    <circle
                      className="opacity-60"
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="currentColor"
                      strokeDasharray="2 4"
                      strokeWidth="1.2"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="font-headline-lg-mobile text-headline-lg-mobile tracking-tight text-[#e5e1e6] font-semibold">
                  AURA
                </span>
                <span
                  className="material-symbols-outlined text-[#f2ca50] text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  hotel_class
                </span>
              </div>
              <p className="font-body-md text-body-md text-[#d0c5af] max-w-[260px] mt-1">
                Enter the Cinema of Curated Video
              </p>
            </div>

            {/* Social Logins */}
            <div className="flex flex-col gap-2.5 mb-5">
              <button
                type="button"
                onClick={() => handleSimulatedLogin("Google")}
                className="w-full h-12 rounded-xl bg-[#2a2a2d] hover:bg-[#39393c] text-[#e5e1e6] flex items-center justify-center gap-3 px-4 transition-all duration-200 active:scale-[0.99] border border-[#353438]/60 cursor-pointer"
              >
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                  <path d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z" fill="#EA4335" />
                  <path d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" fill="#4285F4" />
                  <path d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3 0-.8.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9z" fill="#FBBC05" />
                  <path d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z" fill="#34A853" />
                </svg>
                <span className="font-label-lg text-label-lg font-semibold">Continue with Google</span>
              </button>

              <button
                type="button"
                onClick={() => handleSimulatedLogin("Apple")}
                className="w-full h-12 rounded-xl bg-[#2a2a2d] hover:bg-[#39393c] text-[#e5e1e6] flex items-center justify-center gap-3 px-4 transition-all duration-200 active:scale-[0.99] border border-[#353438]/60 cursor-pointer"
              >
                <svg className="w-5 h-5 fill-current flex-shrink-0" viewBox="0 0 170 170">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.08-7.7-7.98-12.02-14.7-5.99-9.35-10.74-20.2-14.24-32.55-3.5-12.35-5.26-23.75-5.26-34.2 0-14.52 3.69-26.65 11.06-36.4C44.75 32.74 54.12 27.5 65.86 27.27c4.8 0 10.23 1.29 16.29 3.86 6.06 2.58 10.11 3.91 12.16 4.01 1.63 0 5.8-1.43 12.51-4.29 6.71-2.86 12.38-4.04 17.02-3.53 13.06.94 23.36 5.86 30.9 14.77-11.51 6.96-17.15 16.48-16.93 28.56.22 9.54 3.97 17.47 11.26 23.79 7.28 6.33 15.86 9.87 25.74 10.63-2.39 7.37-5.29 14.44-8.7 21.22l-.2.46zM119.22 0c.22 7.07-2.14 13.91-7.07 20.52-4.93 6.62-11.13 10.96-18.6 13.03-.65-7.39 1.76-14.38 7.23-20.97C106.26 6.01 112.44 1.43 119.22 0z" />
                </svg>
                <span className="font-label-lg text-label-lg font-semibold">Continue with Apple</span>
              </button>
            </div>

            <div className="flex items-center gap-3 mb-5">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#f2ca50]/30" />
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#d0c5af] font-medium">
                or email access
              </span>
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#f2ca50]/30" />
            </div>

            {/* Email & Password Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSimulatedLogin("Email");
              }}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1.5">
                <label className="font-label-md text-label-md text-[#d0c5af] flex items-center justify-between">
                  <span>Email or Curated Handle</span>
                  <span className="text-label-sm font-label-sm text-[#f2ca50]">VIP Passcode</span>
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3.5 text-[20px] text-[#d0c5af] pointer-events-none">
                    alternate_email
                  </span>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="curator@aura.cinema"
                    className="w-full h-12 bg-[#1b1b1e] rounded-xl pl-11 pr-4 text-body-md font-body-md text-[#e5e1e6] placeholder:text-[#d0c5af]/40 focus:outline-none focus:bg-[#1f1f22] focus:ring-1 focus:ring-[#f2ca50] transition-all border border-[#353438]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-label-md text-label-md text-[#d0c5af]">Password</label>
                  <button
                    type="button"
                    onClick={() => alert("Passcode recovery link dispatched to curator's secure channel.")}
                    className="text-label-md font-label-md text-[#f2ca50] hover:underline"
                  >
                    Forgot passcode?
                  </button>
                </div>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3.5 text-[20px] text-[#d0c5af] pointer-events-none">
                    lock
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full h-12 bg-[#1b1b1e] rounded-xl pl-11 pr-11 text-body-md font-body-md text-[#e5e1e6] placeholder:text-[#d0c5af]/40 focus:outline-none focus:bg-[#1f1f22] focus:ring-1 focus:ring-[#f2ca50] transition-all border border-[#353438]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                    className="absolute right-3 text-[#d0c5af] hover:text-[#f2ca50] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? "visibility" : "visibility_off"}
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 h-12 rounded-full bg-gradient-to-r from-[#f2ca50] to-[#d4af37] text-[#3c2f00] font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.35)] active:scale-[0.98] transition-all cursor-pointer"
                >
                  {isLoading ? (
                    <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
                  ) : (
                    <>
                      <span>Enter Screening</span>
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleFaceId}
                  aria-label="Quick Face ID Sign In"
                  className={`w-12 h-12 rounded-full bg-[#2a2a2d] hover:bg-[#39393c] text-[#f2ca50] flex items-center justify-center flex-shrink-0 transition-transform active:scale-95 shadow-sm border border-[#353438] ${
                    faceIdActive ? "scale-110 ring-2 ring-[#f2ca50]" : ""
                  }`}
                >
                  <span className={`material-symbols-outlined text-[24px] ${faceIdActive ? "animate-pulse" : ""}`}>
                    face
                  </span>
                </button>
              </div>
            </form>

            {/* Early Curator Membership Banner */}
            <div className="mt-5 p-3.5 rounded-2xl bg-[#1b1b1e]/70 flex items-center justify-between border border-[#353438]/50">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#f2ca50]/10 flex items-center justify-center text-[#f2ca50]">
                  <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-label-md text-label-md text-[#e5e1e6] font-semibold">New to Aura Atelier?</span>
                  <span className="font-body-sm text-body-sm text-[#d0c5af]">Request early curator membership</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setApplyMembershipModal(true)}
                className="px-3.5 py-1.5 rounded-full bg-[#1f1f22] text-[#f2ca50] font-label-md text-label-md hover:bg-[#39393c] transition-colors border border-[#f2ca50]/30"
              >
                Apply
              </button>
            </div>
          </div>
        ) : (
          /* Style 2: Screen 11 & 12 (AURA ATELIER Vault Sign In) */
          <div className="flex flex-col">
            <div className="relative w-full overflow-hidden flex flex-col items-center">
              <div className="relative flex flex-col items-center text-center mt-1 mb-5">
                <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-[#2a2a2d] shadow-xl shadow-black/40 mb-2 group border border-[#d4af37]/40">
                  <div className="w-12 h-12 rounded-xl bg-[#0e0e11] flex items-center justify-center shadow-inner">
                    <span
                      className="material-symbols-outlined text-[#f2ca50] text-[28px] drop-shadow-[0_0_10px_rgba(242,202,80,0.5)]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      play_arrow
                    </span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#f2ca50] flex items-center justify-center shadow-md">
                    <span className="material-symbols-outlined text-[#3c2f00] text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="font-headline-lg-mobile text-headline-lg-mobile text-[#e5e1e6] tracking-wider font-bold">
                    AURA
                  </span>
                  <span className="px-1.5 py-0.5 rounded-full bg-[#353438] text-[#f2ca50] font-label-sm text-label-sm uppercase tracking-widest border border-[#f2ca50]/30">
                    Atelier
                  </span>
                </div>
                <p className="font-label-md text-label-md text-[#99907c] tracking-wider uppercase mb-2">
                  Cinematic Video &amp; Creator Hub
                </p>

                <h2 className="font-headline-md text-headline-md text-[#e5e1e6] font-semibold tracking-tight">
                  Welcome Back
                </h2>
                <p className="font-body-sm text-body-sm text-[#d0c5af] mt-0.5 leading-relaxed">
                  Sign in to access your curated subscriptions, offline vault, and studio premieres.
                </p>
              </div>

              {/* Social Logins */}
              <div className="w-full flex flex-col gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => handleSimulatedLogin("Google")}
                  className="w-full h-12 px-4 rounded-xl bg-[#2a2a2d] hover:bg-[#353438] text-[#e5e1e6] flex items-center justify-center gap-3 transition-all duration-200 active:scale-[0.99] border border-[#353438]"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z" fill="#EA4335" />
                    <path d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" fill="#4285F4" />
                    <path d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3 0-.8.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.1c0 2.8.7 5.4 1.9 7.8l3.7-2.9z" fill="#FBBC05" />
                    <path d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16c1.8 3.7 5.6 6.3 10.1 6.3z" fill="#34A853" />
                  </svg>
                  <span className="font-label-lg text-label-lg font-medium">Continue with Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSimulatedLogin("Apple")}
                  className="w-full h-12 px-4 rounded-xl bg-[#2a2a2d] hover:bg-[#353438] text-[#e5e1e6] flex items-center justify-center gap-3 transition-all duration-200 active:scale-[0.99] border border-[#353438]"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.84c.66-.82 1.11-1.96.99-3.1-.96.04-2.12.64-2.8 1.44-.6.69-1.12 1.83-1 2.94 1.07.08 2.16-.46 2.81-1.28z" />
                  </svg>
                  <span className="font-label-lg text-label-lg font-medium">Continue with Apple</span>
                </button>
              </div>

              <div className="w-full flex items-center gap-3 my-3">
                <div className="h-[1px] flex-1 bg-[#353438]" />
                <span className="font-label-sm text-label-sm text-[#99907c] uppercase tracking-widest px-1">
                  or sign in with email
                </span>
                <div className="h-[1px] flex-1 bg-[#353438]" />
              </div>

              {/* Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSimulatedLogin("Email");
                }}
                className="w-full flex flex-col gap-4"
              >
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm text-label-sm text-[#d0c5af] font-medium uppercase tracking-wider pl-1">
                    Studio Access ID or Email
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3.5 text-[20px] text-[#99907c] pointer-events-none">
                      alternate_email
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="creator@aurastream.io"
                      className="w-full h-12 pl-11 pr-4 rounded-xl bg-[#1f1f22] text-[#e5e1e6] placeholder:text-[#99907c]/60 font-body-md text-body-md border border-[#353438] focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between pl-1 pr-0.5">
                    <label className="font-label-sm text-label-sm text-[#d0c5af] font-medium uppercase tracking-wider">
                      Keyphrase &amp; Token
                    </label>
                    <button
                      type="button"
                      onClick={() => alert("Password reset token dispatched.")}
                      className="font-label-sm text-label-sm text-[#f2ca50] hover:text-[#ffe088]"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3.5 text-[20px] text-[#99907c] pointer-events-none">
                      lock
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full h-12 pl-11 pr-11 rounded-xl bg-[#1f1f22] text-[#e5e1e6] placeholder:text-[#99907c]/60 font-body-md text-body-md border border-[#353438] focus:border-[#d4af37]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Toggle password visibility"
                      className="absolute right-3 text-[#99907c] hover:text-[#f2ca50] p-1"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {showPassword ? "visibility" : "visibility_off"}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 h-12 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f2ca50] to-[#ffe088] text-[#3c2f00] font-label-lg text-label-lg font-bold shadow-lg shadow-[#f2ca50]/20 flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
                  >
                    {isLoading ? (
                      <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
                    ) : (
                      <>
                        <span>Sign In to Vault</span>
                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleFaceId}
                    aria-label="Sign in with Face ID"
                    className="w-12 h-12 rounded-xl bg-[#2a2a2d] hover:bg-[#353438] text-[#f2ca50] flex items-center justify-center transition-all active:scale-[0.95] border border-[#353438]"
                  >
                    <span className={`material-symbols-outlined text-[24px] ${faceIdActive ? "animate-pulse" : ""}`}>
                      face
                    </span>
                  </button>
                </div>
              </form>

              {/* Don't have account banner */}
              <div className="w-full mt-5 p-2.5 rounded-xl bg-[#1b1b1e] flex items-center justify-center gap-2 border border-[#353438]/50">
                <span className="material-symbols-outlined text-[#f2ca50] text-[18px]">workspace_premium</span>
                <p className="font-body-sm text-body-sm text-[#d0c5af]">
                  Don't have an Aura account?{" "}
                  <button
                    type="button"
                    onClick={() => setApplyMembershipModal(true)}
                    className="text-[#f2ca50] font-semibold hover:underline"
                  >
                    Create Studio Account
                  </button>
                </p>
              </div>

              <div className="flex items-center gap-2 mt-4 text-[#99907c]/80 text-xs">
                <span className="material-symbols-outlined text-[14px]">lock</span>
                <span>256-bit Hardware Keystore Encryption</span>
              </div>
            </div>
          </div>
        )}

        {/* Footer info */}
        {!currentUser && (
          <p className="font-label-sm text-label-sm text-[#99907c] text-center mt-5 leading-relaxed">
            By signing in, you agree to Aura's Terms of Service &amp; Privacy Policy. All streams encrypted in 4K HDR.
          </p>
        )}
      </div>

      {/* Early Membership Application Modal */}
      {applyMembershipModal && (
        <div className="fixed inset-0 z-60 bg-black/85 flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#1b1b1e] rounded-2xl p-6 border border-[#f2ca50]/30 shadow-2xl text-center">
            {applySubmitted ? (
              <div className="flex flex-col items-center py-4">
                <div className="w-12 h-12 rounded-full bg-[#f2ca50]/20 text-[#f2ca50] flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-[28px]">check_circle</span>
                </div>
                <h3 className="font-headline-md text-headline-md font-bold text-[#e5e1e6]">
                  Application Received
                </h3>
                <p className="text-xs text-[#d0c5af] mt-2 leading-relaxed">
                  The Aura curatorium board reviews prospective studios every 48 hours. Check your inbox for the VIP token invite.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setApplyMembershipModal(false);
                    setApplySubmitted(false);
                  }}
                  className="mt-5 px-6 py-2 rounded-full bg-[#f2ca50] text-[#3c2f00] font-semibold text-xs"
                >
                  Return
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setApplySubmitted(true);
                }}
                className="flex flex-col gap-3 text-left"
              >
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-headline-md text-headline-md font-bold text-[#e5e1e6]">
                    Apply for Curator Access
                  </h3>
                  <button
                    type="button"
                    onClick={() => setApplyMembershipModal(false)}
                    className="text-[#99907c] hover:text-[#e5e1e6]"
                  >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                </div>
                <p className="text-xs text-[#d0c5af] mb-2">
                  Gain permission to publish in 4K UHD, distribute color LUTs, and join our private cinematography atelier.
                </p>
                <label className="text-xs text-[#99907c]">Studio / Creator Name</label>
                <input
                  required
                  placeholder="e.g. Lumina Cinema Lab"
                  className="h-10 px-3 bg-[#2a2a2d] rounded-lg text-xs text-[#e5e1e6] border border-[#353438] focus:border-[#f2ca50]"
                />
                <label className="text-xs text-[#99907c]">Portfolio / Showreel URL</label>
                <input
                  required
                  placeholder="https://vimeo.com/..."
                  className="h-10 px-3 bg-[#2a2a2d] rounded-lg text-xs text-[#e5e1e6] border border-[#353438] focus:border-[#f2ca50]"
                />
                <button
                  type="submit"
                  className="mt-3 h-11 rounded-full bg-gradient-to-r from-[#f2ca50] to-[#d4af37] text-[#3c2f00] font-bold text-xs"
                >
                  Submit Portfolio for Screening
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

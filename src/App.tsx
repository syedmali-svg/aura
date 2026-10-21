import React, { useState } from "react";
import { Header } from "./components/Header";
import { BottomNav, NavTab } from "./components/BottomNav";
import { HomeFeed } from "./components/HomeFeed";
import { WatchPlayer } from "./components/WatchPlayer";
import { PulseViewer } from "./components/PulseViewer";
import { SubscriptionsHub } from "./components/SubscriptionsHub";
import { LibraryVault } from "./components/LibraryVault";
import { AuthModal } from "./components/AuthModal";
import { TipModal } from "./components/TipModal";
import { UploadModal } from "./components/UploadModal";
import { SearchModal } from "./components/SearchModal";
import { NotificationsDrawer } from "./components/NotificationsDrawer";
import {
  ALL_VIDEOS,
  PULSE_ITEMS,
  CHANNELS,
  VideoItem,
  PulseItem,
  ChannelItem,
} from "./data/mockData";

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>("home");
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [activePulse, setActivePulse] = useState<PulseItem>(PULSE_ITEMS[0]);
  const [videosList, setVideosList] = useState<VideoItem[]>(ALL_VIDEOS);
  const [pulseList, setPulseList] = useState<PulseItem[]>(PULSE_ITEMS);

  // User session
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    email: string;
    handle: string;
    role: string;
    avatar: string;
    membershipTier: string;
  } | null>({
    name: "Carlos Andy",
    email: "carlosandy041@gmail.com",
    handle: "@carlos_curator",
    role: "VIP Atelier Curator",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvqKilfJFi0-wL2DHiRu-epTk-5t3eWCK8tom-c_XtL-rnoIFWN_h2fPcxPStEG5I-rXFXjbRiwZhc9I0WO-CTnxz43_gRimYPhlrggys2WAjweOtam2OJxvmOJbjIKLXFXtuKCK9QCn3h_7Sb5_027tqpdAaQBfENLYBBSnQOMN3a2aOY1Du4ld75yN9ZcnaDEsTeZU41JMlmCvYBQlyhs9G2WPqUldYIoR0fd-S7do1cSuS8zUFT",
    membershipTier: "Atelier Black Diamond",
  });

  // User interaction sets
  const [savedVideoIds, setSavedVideoIds] = useState<Set<string>>(
    new Set(["spotlight-neural-cine", "custom-mechanical-watches", "unreal-lighting-kroma"])
  );
  const [likedVideoIds, setLikedVideoIds] = useState<Set<string>>(
    new Set(["spotlight-neural-cine", "unreal-lighting-kroma"])
  );
  const [followedHandles, setFollowedHandles] = useState<Set<string>>(
    new Set(["@elena_cine", "@studio_kroma"])
  );
  const [subscribedChannelIds, setSubscribedChannelIds] = useState<Set<string>>(
    new Set(["kroma", "horology"])
  );
  const [likedPulseIds, setLikedPulseIds] = useState<Set<string>>(
    new Set(["pulse-1"])
  );

  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isTipOpen, setIsTipOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [tipVideoTarget, setTipVideoTarget] = useState<VideoItem>(ALL_VIDEOS[1]);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2400);
  };

  const handleShare = (title: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast(`Link to "${title}" copied to clipboard`);
    } else {
      showToast(`Ready to share: ${title}`);
    }
  };

  const toggleSaveVideo = (videoId: string) => {
    setSavedVideoIds((prev) => {
      const next = new Set(prev);
      if (next.has(videoId)) {
        next.delete(videoId);
        showToast("Removed from Atelier Vault");
      } else {
        next.add(videoId);
        showToast("Saved to Offline Vault (1080p ProRes)");
      }
      return next;
    });
  };

  const toggleLikeVideo = (videoId: string) => {
    setLikedVideoIds((prev) => {
      const next = new Set(prev);
      if (next.has(videoId)) {
        next.delete(videoId);
      } else {
        next.add(videoId);
        showToast("Added to Curated Favorites");
      }
      return next;
    });
  };

  const toggleFollowHandle = (handle: string) => {
    setFollowedHandles((prev) => {
      const next = new Set(prev);
      if (next.has(handle)) {
        next.delete(handle);
        showToast(`Unfollowed ${handle}`);
      } else {
        next.add(handle);
        showToast(`Following ${handle}`);
      }
      return next;
    });
  };

  const toggleSubscribeChannel = (channelId: string) => {
    setSubscribedChannelIds((prev) => {
      const next = new Set(prev);
      if (next.has(channelId)) {
        next.delete(channelId);
        showToast("Unsubscribed from channel");
      } else {
        next.add(channelId);
        showToast("Subscribed! Studio masterclasses updated");
      }
      return next;
    });
  };

  const toggleLikePulse = (pulseId: string) => {
    setLikedPulseIds((prev) => {
      const next = new Set(prev);
      if (next.has(pulseId)) {
        next.delete(pulseId);
      } else {
        next.add(pulseId);
        showToast("Liked Pulse Short");
      }
      return next;
    });
  };

  const openTipModalForVideo = (video: VideoItem) => {
    setTipVideoTarget(video);
    setIsTipOpen(true);
  };

  const handleSelectVideoById = (videoId: string) => {
    const v = videosList.find((item) => item.id === videoId);
    if (v) {
      setActiveVideo(v);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const savedVideos = videosList.filter((v) => savedVideoIds.has(v.id));
  const likedVideos = videosList.filter((v) => likedVideoIds.has(v.id));

  // Determine current screen title for header
  let screenTitle = "Home Feed";
  if (activeVideo) screenTitle = "Watch Player";
  else if (currentTab === "pulse") screenTitle = "Shorts Pulse";
  else if (currentTab === "subs") screenTitle = "Subscriptions Hub";
  else if (currentTab === "library") screenTitle = "Library & Vault";

  return (
    <div className="bg-[#131316] text-[#e5e1e6] min-h-screen flex flex-col font-body-md antialiased selection:bg-[#f2ca50]/20 selection:text-[#f2ca50]">
      {/* Top Header */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenProfile={() => setIsAuthOpen(true)}
        unreadNotificationsCount={2}
        activeScreenTitle={screenTitle}
        showBack={!!activeVideo}
        onBack={() => setActiveVideo(null)}
      />

      {/* Main Screen Viewport */}
      <main className="flex-1 w-full max-w-2xl mx-auto pt-16">
        {activeVideo ? (
          /* Watch Player View (Image 3 & 4) */
          <WatchPlayer
            video={activeVideo}
            allVideos={videosList}
            onSelectVideo={(v) => {
              setActiveVideo(v);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onBack={() => setActiveVideo(null)}
            onOpenTipModal={openTipModalForVideo}
            onShare={handleShare}
            savedVideoIds={savedVideoIds}
            onToggleSaveVideo={toggleSaveVideo}
            subscribedChannelIds={subscribedChannelIds}
            onToggleSubscribeChannel={toggleSubscribeChannel}
          />
        ) : (
          /* Bottom Nav Screen Tabs */
          <>
            {currentTab === "home" && (
              <HomeFeed
                videos={videosList}
                pulseItems={pulseList}
                onSelectVideo={(v) => {
                  setActiveVideo(v);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onSelectPulse={(p) => setActivePulse(p)}
                onOpenPulseTab={() => setCurrentTab("pulse")}
                savedVideoIds={savedVideoIds}
                onToggleSaveVideo={toggleSaveVideo}
                likedVideoIds={likedVideoIds}
                onToggleLikeVideo={toggleLikeVideo}
                onShare={handleShare}
              />
            )}

            {currentTab === "pulse" && (
              <PulseViewer
                items={pulseList}
                activePulse={activePulse}
                onSelectPulse={(p) => setActivePulse(p)}
                onShare={handleShare}
                followedHandles={followedHandles}
                onToggleFollowHandle={toggleFollowHandle}
                likedPulseIds={likedPulseIds}
                onToggleLikePulse={toggleLikePulse}
              />
            )}

            {currentTab === "subs" && (
              <SubscriptionsHub
                channels={CHANNELS}
                videos={videosList}
                onSelectVideo={(v) => {
                  setActiveVideo(v);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onSelectChannel={(ch) => {
                  showToast(`Viewing ${ch.name}'s curated masterworks`);
                }}
                savedVideoIds={savedVideoIds}
                onToggleSaveVideo={toggleSaveVideo}
                likedVideoIds={likedVideoIds}
                onToggleLikeVideo={toggleLikeVideo}
                onShare={handleShare}
                onOpenVaultSection={(section) => {
                  setCurrentTab("library");
                }}
              />
            )}

            {currentTab === "library" && (
              <LibraryVault
                savedVideos={savedVideos}
                likedVideos={likedVideos}
                allVideos={videosList}
                onSelectVideo={(v) => {
                  setActiveVideo(v);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onRemoveSaved={toggleSaveVideo}
              />
            )}
          </>
        )}
      </main>

      {/* Persistent Floating Bottom Dock (hidden when full-screen watch player is active for maximum cinema immersion, or available with mini-nav) */}
      {!activeVideo && (
        <BottomNav
          currentTab={currentTab}
          onSelectTab={(tab) => {
            setCurrentTab(tab);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onOpenUpload={() => setIsUploadOpen(true)}
        />
      )}

      {/* Global Interactive Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={currentUser}
        onLogin={(u) => {
          setCurrentUser(u);
          showToast(`Welcome back, ${u.name}`);
        }}
        onLogout={() => {
          setCurrentUser(null);
          showToast("Signed out of Atelier Vault");
        }}
      />

      <TipModal
        isOpen={isTipOpen}
        onClose={() => setIsTipOpen(false)}
        video={tipVideoTarget}
      />

      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onAddVideo={(newV) => {
          setVideosList([newV, ...videosList]);
          showToast("Masterwork successfully published in 4K!");
          setActiveVideo(newV);
        }}
        onAddPulse={(newP) => {
          setPulseList([newP, ...pulseList]);
          setActivePulse(newP);
          setCurrentTab("pulse");
          showToast("Pulse short published to global stream!");
        }}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        videos={videosList}
        pulseItems={pulseList}
        onSelectVideo={(v) => setActiveVideo(v)}
        onSelectPulse={(p) => {
          setActivePulse(p);
          setCurrentTab("pulse");
        }}
      />

      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onSelectVideoById={handleSelectVideoById}
      />

      {/* Toast Feedback Banner */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-[#1f1f22]/95 backdrop-blur-xl text-[#f2ca50] shadow-[0_0_24px_rgba(212,175,55,0.35)] border border-[#f2ca50]/30 flex items-center gap-2 font-label-md text-label-md animate-in fade-in slide-in-from-bottom-2 duration-200">
          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            sparkles
          </span>
          <span className="text-[#e5e1e6] font-medium">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

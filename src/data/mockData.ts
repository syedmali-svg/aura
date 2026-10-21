export interface VideoItem {
  id: string;
  title: string;
  description: string;
  creator: {
    id: string;
    name: string;
    handle: string;
    avatar: string;
    isVerified: boolean;
    subscribers: string;
    isLive?: boolean;
    hasNew?: boolean;
  };
  thumbnail: string;
  duration: string;
  views: string;
  timestamp: string;
  badges: string[];
  quality: string;
  likes: string;
  likeCountNumber: number;
  commentsCount: number;
  category: string;
  tags: string[];
  isFeatured?: boolean;
  isExclusive?: boolean;
  videoUrl?: string; // Optional simulated video or high-res animation
}

export interface PulseItem {
  id: string;
  title: string;
  description: string;
  creator: {
    name: string;
    handle: string;
    avatar: string;
    isVerified: boolean;
  };
  thumbnail: string;
  videoAspectUrl?: string;
  views: string;
  likes: string;
  likeCountNumber: number;
  commentsCount: string;
  shares: string;
  audioTrack: string;
  quality: string;
  tags: string[];
}

export interface CommentItem {
  id: string;
  author: string;
  avatar: string;
  handle: string;
  isCreator?: boolean;
  isPinned?: boolean;
  timestamp: string;
  text: string;
  likes: number;
}

export interface ChannelItem {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  isLive?: boolean;
  hasNew?: boolean;
  subscribers: string;
  bio: string;
}

export const CATEGORIES = [
  "All",
  "Cinematography",
  "Music & Score",
  "Tech & AI",
  "Podcasts",
  "Luxury Living",
  "Visual Arts",
  "Horology & Craft",
  "Architecture",
];

export const CHANNELS: ChannelItem[] = [
  {
    id: "kroma",
    name: "Studio Kroma",
    handle: "@studio_kroma",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZ4L7SMVS1XHr-ZEF7rrNIsy2YY7le1tr7Nm832o03pY-EQ0XaG8sYSJ-FxRVTMjSs5BGuyxfw0QbD9JRHMe6yt83ivjeOdx2N_aIjYExExLg9X4DCoLCrtzOgb484OgFzhsZDNGCjRL4tFg1gl3GrCo2xSnfzpgV0PsdLUNEKHq42Q3fx1JsfRIrAbW5YlF54rl65hh28cJxLBwRPSq4ZJ6gZIROvToTWcsp_P0a33zYwVe857BEU",
    isLive: true,
    subscribers: "1.45M",
    bio: "Unreal Engine 5.5 virtual production atelier and cinematic lighting masterclasses.",
  },
  {
    id: "horology",
    name: "Horology Noir",
    handle: "@horology_noir",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD09maEappxdACn1NVnbiV7RNXumMRaGXC3Adll07S5XEMbbue0T8UIfAF0Gse3LMU12yF-AHlpIvxsKs6u8DQgI1bzKGfb8CXthWVzhvh4KQqJCNgbCOU2I0B9GlBSHdUcHyBgt4jTTidRmAnw-Enl4LLBhrYcq4zKMZE0dnz1VJmr92sXYvXaXOrr-1i_0p1POBih3HuMJYDAScLJGKn-RnSzmd6UHpV1HeyPtFvdr9HU-83h7fJW",
    hasNew: true,
    subscribers: "680K",
    bio: "Micro-mechanical watchmaking, tourbillons, and bespoke haute horlogerie.",
  },
  {
    id: "apex",
    name: "Apex Dynamics",
    handle: "@apex_dyn",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCGFXF87FtxXN1ur0dhFJQBHE9DZhJXwkd-d3a84H58uaX1wmeg3dl4W3w6VcgqxGGCbmhXbLfoMCrN2pgapgnlAgP3c5bTYAGp3oGMM2p_cEZ4WYtI6YsJ8d7IELn7aKjWkvdPne4wWpU1CvfJH0Ywplxcy9InWuGIwYn77yTNT_5Us-N793V58n2LWaP1LW_7OI7EQxjPzC1aaVpcNodwYpxWUJuDxpAV6-5raiCiRFtOO_KUmmM",
    hasNew: true,
    subscribers: "920K",
    bio: "Extreme aerodynamics, electric hypercar acoustics, and wind tunnel cinematography.",
  },
  {
    id: "cyberpulse",
    name: "CyberPulse",
    handle: "@cyberpulse",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAswjyPdAQhozBBc2UtiueqXnY9jABgjeoaxegz2MC6gs84fNPtBDfmfrQdA22SSYzTi3QgtkR0RzNUCe7FmcCpyQTIopMCHFAw8hoZz1XyO9LYqp2zWdndpN8SOc1ogQvWVzYWpu26AUpgzSWRC2_is32zPCoEyc7-6Yvrk59vtAnaAEp0B45AshaWUUSyaP0iuX-imEghUoa9LKafyxF1Dihg00KN_Lm8mLAbsEORAPAFSS_oCVMH",
    subscribers: "510K",
    bio: "Generative neural synthesizers, real-time spatial computing, and AI cinematography.",
  },
  {
    id: "nocturne",
    name: "Nocturne Odyssey",
    handle: "@nocturne_odyssey",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBI25oCmUTZwW11G640XvyAuDx4nt1MKUazO5RAtNrXZYLbyIzJpvr3llQdewO8XWbEfdh6LH5jO33U5hviyaWYfYY9XV3mgEfT7qmu_PSQwPvk8853J3A1VdPRoXjRhUefTdBN7CS52QSRyL_14hQNwZBMYr-z5Dn6JIoljHvZDiepcCdHwzVuozR_yXoJsO1oMsFYA4Bki0Y7vHsyu8spTKMp73qMLPIqo1lIrsROsDgPOXKnzY4u",
    subscribers: "890K",
    bio: "8K midnight urban exploration, rainy neon aesthetics, and architectural cinema.",
  },
  {
    id: "elena",
    name: "Elena Cine",
    handle: "@elena_cine",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCoCFjIEHiGkucWL_qNNcSBapXmLdDDmEjrD9vAVXc6eiJXhkBQPP63RWg2_umwGlHsZfP2wTd0zaWymHjeD-usnzQJEqUn6-7S5dSUTLVpE3vFLbVIQsBX1ikvWIB8rFrRD4-r4lnrKXKZKisfjl2VMNf_SKUG9pW2oHEPR6T4_DSWGnj8fUoFacfSe8HwJDPRsAFQyez0WDNu8_vgd6sPCIM3sokRZ2Khw7EKlJe2H1dCqd3GtDIU",
    subscribers: "1.4M",
    bio: "Anamorphic primes, Japanese rainscapes, and handheld mood cinematography.",
  },
  {
    id: "midas",
    name: "Midas Tech",
    handle: "@midas_tech",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAecP-clZA0zsgiLDTH03q2pqsJojWEX99hgRm_Yj_4F4vjrCLR_4rFq0Du_0VYcjZCWdT1iwxaGlx6zZtn8fZyNCsMLDu-c53MDP5NXz-Vli7auRXaSQMhZtj0w6wGta1MQSM0HpsxEgfIcdGEymdNSxBXlwJkrbdOZD6iVO4xx-i7KHWbJGXSOFVZj19O2gh28Pp-D08b6xoYw1tjxkGmF8jINCMG5gLrsbqxaHP7snv3cWIAzVC1",
    subscribers: "430K",
    bio: "Semiconductor architecture, microchip etching macro footage, and precision hardware.",
  },
];

export const PULSE_ITEMS: PulseItem[] = [
  {
    id: "pulse-1",
    title: "Capturing neon rain in Shinjuku",
    description: "Capturing neon rain in Shinjuku with 50mm f/1.2 anamorphic lens ✨ What do you think of this grade? #tokyovibes #cinematography",
    creator: {
      name: "Elena Cine",
      handle: "@elena_cine",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuApmRd6t-ZnhrRumgStaroNum7wwhwi1eL1YYAooroP4zCRh7pkynSB4wiJSflKzp0fJeZ5QZ3bJANKuTjBopOQwZv-ncYv0iAWWCdb0m_Jc1a7wNIBQoSg_Gw0CQCEPZcbSYe-p9vU8UkU-xvrFzkYSovkid-FLGeKJQ9mQGW0RAf-0Y8077jLrzXyCBDVbO381R6p2TUKBB5KBEjyLgpib4oFRtoAGneiubgQbVT27_ruCF5GWoBJ",
      isVerified: true,
    },
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuDD1xDCVtPwrihgPIy0G2JEaVCXmsdFtiV2fZFVjMHmSLmGvz0O1Qp3fAqP9-RzaVKcz19N6WCY4zFGXKFDEKshaBui7XUKIaU219X-GJ1mtoRNTlQkbK1mwWc1WKOu33ARlXc9p3glOX3iS86WpLzGbuwepTqT3E5XF4kaWilA9aAwitmoDkVawYrTdMyiQ0O-V-umLIbKED9YYh7Ags0IpEVkWlxPdaMku-2q0FxFX43y-YwIf_Av",
    views: "2.4M",
    likes: "1.4M",
    likeCountNumber: 1400000,
    commentsCount: "14.2K",
    shares: "280K",
    audioTrack: "Original Sound — Shinjuku Nights (Aura Master)",
    quality: "4K Cinema • 24fps",
    tags: ["tokyovibes", "cinematography", "anamorphic"],
  },
  {
    id: "pulse-2",
    title: "Analog warmth vs Digital crystal",
    description: "Modular synth voltage oscillation pulsing through amber glow filaments. Pure analog harmonics captured with binaural microphones. #modular #synth",
    creator: {
      name: "Synth Lab",
      handle: "@synth_lab",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAN6zRF3JHKY6jBy_ArqMJG8dJmnU1GwY6Yy1TnFUo61VLS0SDJTihOmmnxY3UD1LclIz25cvBHPAeq_e2YJ4SUBZ0b2IsyfHgH3kStPrTkNc-i2sSyeIsetyukejrIbaAiqcyid7jWdj2WSHEcRv5gHdASIwu9jI4b8nV4LmK_un2GN6kXPN5qTiBkBpniVRb2llGd6rKdPZD1rnHHGdGpRdSMrzEeWwEXIYVIb1pouQIwwzJau6r9",
      isVerified: true,
    },
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuACXg5iee3PyQ7jVRui6_wGUIRcEmOvMIMYasxVA2mO4HH7BMDqWe9AXy8EOIxe6ct_lnRElK6qqLPOxmQmaCWBYKYenolkEyiIV_gTvSIguJBoivNR_iRoeVndJe-oWdP9K2OgB9Qiat7R03Z_pEG1LljrOB9YbGF3QD_o6e6bQ2tCAV7Fe47Gtudg68ydLcrmCVI7fqt1U6W5T6w6SmBFpOB3_FEr8GswuU7xI7tLOulcQ6ecXV-j",
    views: "4.8M",
    likes: "890K",
    likeCountNumber: 890000,
    commentsCount: "8.1K",
    shares: "115K",
    audioTrack: "Eurorack Patch 09 — Warm Lowpass Resonance",
    quality: "Dolby Atmos • 96kHz",
    tags: ["modular", "sounddesign", "ambient"],
  },
  {
    id: "pulse-3",
    title: "Wind Tunnel 1000fps Acoustic Test",
    description: "Sleek aerodynamic concept hypercar body line captured in high contrast golden reflections over obsidian carbon fiber. #hypercar #aerodynamics",
    creator: {
      name: "Apex Dynamics",
      handle: "@apex_dyn",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAyI4Xqoay6KaKUdvfO8UI_gDuuxaj6BNMQw3ModjR7woCwgXvdf5rTGPSHKtEpk_HxThma3Q_PbCrF6y80lX3stxNyr2yDj0xS06D4gkd3V5ZEtX-wBkKCA2r-31A90vdRyBtIH3Ikz6ErHDDfaGr0x4UokHsc4QtmtPLg-bMxJ4VSztx5GmgngnGKlGlj5xMjC0mXapzkAXL-tSmpUKamuvj6Mv0Szb4inkgEedZ_XnK9FWzzxe8o",
      isVerified: true,
    },
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5Jkg6dxFJ8Nu1tzy-wSm5PcxxyGp53LDssb80d_fP6LUTqR6VfKwry2Dk40fbzP5BGSERFKdW5w8IcP7mdfI4kVE0TK2GmY5L4QKbvzILsZ41YgQ4GvAOdEwPBzxJmitaIv7MtC7CjsUqOaKfmX9QF-jPgbWNQZF6786ZV5u4EKwLPTBP5yMdunwkRuSUWHxMyy31s-WFuauPmoSJJ-Z4EBJ1OAshNXnBaXReDyMvJkt5Iq2nLaak",
    views: "1.2M",
    likes: "410K",
    likeCountNumber: 410000,
    commentsCount: "3.4K",
    shares: "64K",
    audioTrack: "Aero Flutter — 320km/h Boundary Layer",
    quality: "Phantom Flex 4K • 1000fps",
    tags: ["automotive", "windtunnel", "engineering"],
  },
  {
    id: "pulse-4",
    title: "Suspended Fluid Sculptures",
    description: "Slow motion gold leaf particles floating through deep obsidian liquid with volumetric amber god-rays. #fineart #fluidmotion",
    creator: {
      name: "Atelier V",
      handle: "@atelier_v",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCecvgQmdLXjhkHYupqM5w1dBR3Bl7GGRTMGoGhTvS-Rd7UsEGa6BczW3ovkfaUZvDARbNheV_EM2DEGlv_7-Mlx3-O-K8w0OsznvLj1bm-xLFJAzEtOiyFvSU6PQ3ufSwh_0Lt8h-an3MCGvQOFbnpArIdEpqo09F-Cf8hqWjB-cXTvojLFJZLPdw6Pte2_OzkwvNU1e6DkuVQBtNcR0ayK_jx21iqYNnkMiBJfedqj9jjMkCakf-E",
      isVerified: true,
    },
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwbtNAdqUvwvjitZsfK1ui7AvrW_XovY8nm6AW_HhMhiH7kJfgRjm26HGG__JMuzJIsJqHecgcOyzyPqoCww-noqA0EsqtTx10WDQazX1vFY9WkKccDoN-fBXmzyOz4-ATvdZL9-0OV6YNJHrAjSZ28_wDMG7X77LqpixL8dgqs1NHVKSoj5TcWc4hzOfYs1Jn16-n9iy-uNGSQrzh6LeNIspFhAiquUt_wPVJHTyS3g-QZzNBGkiw",
    views: "950K",
    likes: "295K",
    likeCountNumber: 295000,
    commentsCount: "2.1K",
    shares: "48K",
    audioTrack: "Viscosity Study — Ambient Cello in C#",
    quality: "8K Red V-Raptor",
    tags: ["fluidart", "goldleaf", "macro"],
  },
  {
    id: "pulse-5",
    title: "Brutalist Living in the Alps",
    description: "Architectural drone sweep of a minimalist brutalist villa illuminated by warm courtyard pool fires at dusk. #architecture #brutalism",
    creator: {
      name: "Noir Architecture",
      handle: "@noir_arch",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpf3ZL8AD4Kudc0EpLs5fysrLOmy6EBlSrCv8ADBAuoGXosRKCEu9XTHYdppKogKnoNUSae2X_0WWIzh65AqHCgsCJXJrbSuQ579bH5E6huG7qVT0_BRk1fVWmeCbHhNDZQTqbD2IYCiFn6Weq3-yknE4gXCww-VC44OQhFzQXiwYACmlWSoiRdcoBshQ4_6W3x0npRtrWWeNIaSZvP0UVZFgs0-uZWZoiU7B1rhCOv15WrX16eAWW",
      isVerified: true,
    },
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuBk0_x688smDNJD0h3MAVJ02vOllAOiDqcEtCrXY9L0Vk02PQvUbDVuLDZAHGsGukKPztG7zaP40Qhy_qlXyf5qTg8zkNi9aALlYue_V0Jthg0tmX_11OAjd3sFx30Q35eZQJnLmWCdgVLXfL5STrdcek21Wzogd7lELoF_bMMvvv2wc_-1VvnqhpcqphkMHCjo4IfXXpE_GLzqqMaPwcL3axCJKrcdCa2hmFAy_wDTrFSPCkiCW9To",
    views: "2.1M",
    likes: "612K",
    likeCountNumber: 612000,
    commentsCount: "4.7K",
    shares: "91K",
    audioTrack: "Alpine Wind — Binaural Spatial Field",
    quality: "4K DCI • HDR10",
    tags: ["brutalist", "alps", "design"],
  },
];

export const ALL_VIDEOS: VideoItem[] = [
  {
    id: "spotlight-neural-cine",
    title: "The Next Frontier of Neural Cinematography",
    description: "An in-depth look inside high-end anamorphic camera rigs filming a hyper-realistic holographic sphere glowing in warm amber and gold light in a dark void stage with atmospheric haze.",
    creator: {
      id: "aethelgard",
      name: "Aethelgard Studios",
      handle: "@aethelgard",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpZoLKqJplJygOORanIAjuLSARdTGzWFytdTTer6MWg5qIZd162RfIVNiFiIOwstFjXq-fCr-QYfbTbQMp-KAhYBGCNIrvj7VdfcbwQAQXcvsc0K-TNQe2JGlMcbOryD-wZ5gZAqEzg5n-G7U1Dc1Vc42hW3wq9rGElPDJtkhrJ40ULEUrQCXp2Ed5bkKCHd1auKe0fHW3R14E98r27GU03yneg7_gWUrhbZtNfwcZI54XgrKcA4V_",
      isVerified: true,
      subscribers: "1.2M",
    },
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuCh0GFYKSnCoi-mhKS72XECakKO7v7R0sfdgTP5_IrlcqxsO9OKxJYxrj10f5rgNeZc4x5uB7K5d1o9d7sSv5oWUiDM39u3GkPEK9moukG9rG9sm5WM43763Nipl97A5SET6hq3t8en87DDMZhu4h_JYxu8mAmovuhPrePxQOYnGNZqSVO-mZeAUlXswF3_z1hE7QTFlDKDzAd5UrRkG2aRbstoHu87FvLoZrF21twJ79kIubR-_I7f",
    duration: "18:42",
    views: "1.2M views",
    timestamp: "2 days ago",
    badges: ["Featured", "4K UHD"],
    quality: "4K UHD",
    likes: "48K",
    likeCountNumber: 48000,
    commentsCount: 1840,
    category: "Cinematography",
    tags: ["neural", "cinematography", "anamorphic", "lighting"],
    isFeatured: true,
  },
  {
    id: "unreal-lighting-kroma",
    title: "Mastering Cinematic Lighting & Composition in Unreal Engine 5.5",
    description: "Hyper-realistic cinematic film shot inside Unreal Engine 5.5 with volumetric golden sunlight beaming through high concrete brutalist pillars, neon rim light, moody chiaroscuro lighting, and custom post-processing volume LUTs.",
    creator: {
      id: "kroma",
      name: "Studio Kroma",
      handle: "@studio_kroma",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAD6w_A6X9fkI0mumObrzyEii1mx95hEthKJqhzYPH4Emt3TPNsP1zgsolGG4U3SnzmT6-Mq-tb65AsaLlNwpbL7UyIGPr91_vlnIf94_SG9IgoAvsAdEBxObx-2Hbk8qd0g_bkTD16I6hRJ2B6Er3tNCenQCWe4d43i9cGTrklCBiQSEO-jeIuTKhFUehA9MW_eM5gTfA8CP9G0krt6-NW6xSm8GyAzkTSS6veYIP4Mnt-VBqIS_vU",
      isVerified: true,
      subscribers: "1.45M",
      isLive: true,
    },
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkKj0xIZ5KYjDUmlw2XMYjwKBoJZ5nDW4Sq1NxZLCNSccm0gDxILeVxeYeTAPmwzcLV9xT5I5ixpZ3EhdSfkvC2Ojtj1La1lEPPr0hhhpFZ5hYCEfESv-RRZXY4eqwvEzXCwn6BxPyERxs5X4q-NMKkhY1Bjqog4nYEPuv2H-R1VnqiLhnFvwkQiqSnQoIoxwGfTWVjFG2_5To5NTT6cIR-zI0S2BsJplv3gpKQEjHhmPYHXkAaf3P",
    duration: "24:10",
    views: "842,109 views",
    timestamp: "Streamed 3 days ago",
    badges: ["4K HDR", "Dolby Atmos"],
    quality: "4K HDR",
    likes: "48K",
    likeCountNumber: 48000,
    commentsCount: 1280,
    category: "Tech & AI",
    tags: ["CGI", "Filmmaking", "UnrealEngine", "Lighting"],
  },
  {
    id: "acoustic-hypercar",
    title: "Acoustic Perfection: Crafting the Sound of Electric Hypercars",
    description: "Inside the anechoic acoustic testing chamber with multi-microphone arrays capturing aerodynamic flutter, synthesized throttle feedback, and carbon acoustic resonation under theatrical gold rim lights.",
    creator: {
      id: "apex",
      name: "Apex Dynamics",
      handle: "@apex_dyn",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0WbIwXiVaFbKF85QlmOHiO50SJGFgxobdRH_WMNLwFdQtSvHOjq-ZBN_Of7fhuVfBK4ywzc5yPzhdIkJzWgMEfytfzGt9WyfPsHm-BWwueSiD62Yy3g2Y_PRoeAJJjcqiFkHynjzBdnxk7_MjnYYvrqfNQ_x900rhRwWO2Rn-KAv17HCj6nqwyUePrCVYWcI0hO3FsztAcRZVhaZ8felxOC_edZU4oa_1knBW8_7d5OF1VLxCC6Bm",
      isVerified: true,
      subscribers: "920K",
    },
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8O6KqIBPRoyOxrulUll22WChBOdtCPUuWMocWIdJ3owzv8v2339CDVAq9f0iyoq8KSmy_B_1ZEwGSycqphrW2SEff_IK5pWCZOMMKSy75pEIxabPq0vC2p5p-0RuPO4hjkS6NrZ8kJSVUaUvFtd1wQ3i-ONQkQ5lW-34KHAuZhdKeNUNUqArwVGegLJUrnyvJTb6rED7MeaojjatxDqyUXKFKPVg4uECRqFXuc0lvnEwNJ4fj1C_P",
    duration: "24:15",
    views: "420K views",
    timestamp: "5 hours ago",
    badges: ["Dolby Atmos", "Acoustics"],
    quality: "Dolby Atmos",
    likes: "29K",
    likeCountNumber: 29000,
    commentsCount: 940,
    category: "Music & Score",
    tags: ["automotive", "sounddesign", "hypercar", "atmos"],
  },
  {
    id: "tokyo-midnight",
    title: "The Architecture of Midnight: Tokyo After Dark 8K",
    description: "Tokyo Shibuya crossroads and Shinjuku high-rises at midnight viewed from a rainy luxury penthouse window with glowing neon reflections in gold and amber tones captured in 8k cinematic depth.",
    creator: {
      id: "nocturne",
      name: "Nocturne Odyssey",
      handle: "@nocturne_odyssey",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCnRv9WlTAWIMk2VFso8M1j82isK6Wu2qPdUXi2Osqugp7i3oNDzD5L0Ifrzfo7sAmwd4vaP1hDcIM19KhgA6j3yj78DRH12V5Svoa7UCLBdFaPwVvScTnVGZj9p4LaxxOahTxhWl2tT21u2fxuBeNj6KY-4uLIWMvW3JYDhumU5ARCQrYrSTyrFvgwZ8LdrtXL-i0io8xtzGQ3YFM16iaV9Db0nEfTSmULr4n_AsP2XYAbfmT5OudT",
      isVerified: true,
      subscribers: "890K",
    },
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuCanhZHuRzmtyGQzBKz9I1nGYS578ZAcK8xcUKU013yIluJ_li2Im7wIAdCMtYgjRhPTyjpxBYSq-BBKyWC_HBOZtMVZ0YHNPUIzGSunnk6qFic1Q-7bzbHc7WNLxDjyQD7ON6d1K_Xs-_Mnex48zk5scelnB4tdUXs7OX6SBFpCzenRnBqJ1UddqqhyDvEPSgJ8YlfghNu3ILglG8U26HYP06AvHicIxVjvVzXYm9DPZTIp8vZgBxa",
    duration: "42:08",
    views: "890K views",
    timestamp: "1 day ago",
    badges: ["8K Cinema Raw"],
    quality: "8K Cinema Raw",
    likes: "64K",
    likeCountNumber: 64000,
    commentsCount: 2410,
    category: "Cinematography",
    tags: ["tokyo", "midnight", "8k", "urban"],
  },
  {
    id: "mediterranean-brutalism",
    title: "Living in the Void: Mediterranean Brutalism",
    description: "Minimalist concrete villa cantilevered over the Mediterranean coastline at twilight with subtle warm interior chandeliers shining through floor-to-ceiling glass.",
    creator: {
      id: "maison",
      name: "Maison Forma",
      handle: "@maison_forma",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBemJ5s8HObbvmLwujtkhDc9_FDJrgE7SsdTDvqC1nP5M8nlFOQuGUKPZb347p9NxHswOiraTsEIvPAhy8MT4XLJWq-P-PrJ1A4JsYwxsbU1p_YBgvRdIVvUtEsP2QvfMW_32Hv5g5juL8sosGnlan4ONCMqCngXCzbY2KdEMwPrN8nRaIVnXupvbGT-G7gBWdiDUzdxzsGHDBhhcBKcxP5UQ9nczc1ogk-hO49qdP8aln1r36HMPE",
      isVerified: true,
      subscribers: "310K",
    },
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7tS6SPtD1QFLf_IAL3DKInvvJ9Ivhn4Pi_AmJL6yQQ8Stu5UUMwdTLdOusvzLz1CO8ZvUvRUY0oiJJIsPwD8UVP5azqiLSmgrjYaLREnauVw62GmCc4HaKPM_wC_IrtsM2kB7SuGkdtKKwoLuxw209zDfShpjVXF-8Wh6Bx7DA_hISNqYLgKzGHrI5SnRiQaVtauklwxA6senwTXn543L2sVztTDukg6WrWvz3vngOerVf2HmzDJi",
    duration: "12:30",
    views: "310K views",
    timestamp: "3 days ago",
    badges: ["Architecture", "4K UHD"],
    quality: "4K UHD",
    likes: "21K",
    likeCountNumber: 21000,
    commentsCount: 520,
    category: "Luxury Living",
    tags: ["architecture", "brutalism", "design", "villas"],
  },
  {
    id: "custom-mechanical-watches",
    title: "Inside the World of Custom Mechanical Watches",
    description: "Macro cinematic shot of ultra-luxury tourbillon watch movement in polished titanium and yellow gold gears, obsidian black background with soft amber bokeh light, hyper-detailed mechanical horology craftsmanship.",
    creator: {
      id: "horology",
      name: "Horology Noir",
      handle: "@horology_noir",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdu2fnUdnIVTjvxaA526SIe-dPUctyshn0AWd345BjrUXboQcsWU9ytfrmcH5uIv4NzNeBVLkGe-beS4dOXcYVo9Hswve6kePkWNlmTaxC49IfDSWN-6REOIuIe3HuukJrwXNOhLVQEQQ0MPWrXjjJ2RzImubvhBzrToIHj-5ddlIt2MnK8WvhyCNldVy5LIaontqvFs7vqBiSR5XLetzSW_eLGWBz6uCm7X_pnaqyLu4jTrev0C3W",
      isVerified: true,
      subscribers: "680K",
    },
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuDK9imG6zup5AKLuXJ4Vn8lBTuHfwjmJkKvJPM8T_i_e29y7t-kUzS6NlO4BD04M7HdwsfvT31374ubBjFgMKRWi2U1DelAdgOm2yhF0sPtmJQEKLYkEbvC4aMbIHZ4ZkozzVvGDq3ClOKoJLncX59IYt9FsTxXvcOKt-ZPfboRnYTJ-wHGbi_l_mEZ50sryrDqJaflAokzlYeQwLz4jkLLJuZciOevcW70e7QVCQaFmnfj46U-4tlD",
    duration: "24:18",
    views: "140K views",
    timestamp: "2 hours ago",
    badges: ["4K HDR", "New Premiere"],
    quality: "4K HDR",
    likes: "8.4K",
    likeCountNumber: 8400,
    commentsCount: 312,
    category: "Horology & Craft",
    tags: ["watches", "horology", "tourbillon", "luxury"],
  },
  {
    id: "generative-video-deepdive",
    title: "Future of Generative Video 2025 Deep Dive",
    description: "Futuristic cybernetic interface visualizing generative AI neural video synth, glowing amber neural connections flowing through a sleek dark matte obsidian canvas.",
    creator: {
      id: "cyberpulse",
      name: "CyberPulse",
      handle: "@cyberpulse",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtXmRGJRkT89sxs0F1PYyISdZ0eKYZs8n9LzrFz-BEFiblj6KreBUnNR2qHzuAZw98D6iNUoSNYjcwTm-_woCi9466iWDx9xwXzbLSy7zBPtQSaR-xAGiILso98BZjeLVA-66a3cM8s5u-6izLx1iJA6TqK1pj-9EsGGQWbuasc8DYzMCZjd7IhzNj1EMsqacSYnkwZp2y_y1VJ8aYI0mpHzMDa6Cr4wPopK778ZmnTMbE2wOUgTxn",
      isVerified: true,
      subscribers: "510K",
    },
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDtLthauDL8-UWvb8YtJDuC-t5p8hG-Py61xr7741FeZYAc2g6Tm0ATl35m7rGcXy2XqLxu_6uj3DHOw6K3KJCIPXv7U4kYMl0kZgM3UT2FmkGFx7a7g8LU0SWlcJfFgqhjrjXX6ArCNDE1dDie0ZIMWtP5eyykHU-fMGjB2LZC6YmB3-NCRc9qG7OfHJDM9izvkAMQ_ZlK5walSZ7ufxYo8Xiak9wcqZ9ygB-DR1LoV6IC-vcAGX1",
    duration: "18:42",
    views: "95K views",
    timestamp: "4 hours ago",
    badges: ["EXCLUSIVE", "AI Tech"],
    quality: "4K HDR",
    likes: "5.1K",
    likeCountNumber: 5100,
    commentsCount: 184,
    category: "Tech & AI",
    tags: ["genai", "deepdive", "neural", "future"],
    isExclusive: true,
  },
  {
    id: "davinci-color-grading",
    title: "Hyper-Realistic Color Grading Secrets (DaVinci Resolve)",
    description: "DaVinci resolve color grading interface workstation with dual calibrated reference monitors glowing with deep teal and warm golden sunset color grading wheels in a moody film suite.",
    creator: {
      id: "lumalab",
      name: "Luma Lab",
      handle: "@lumalab",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAP1ziAg1epumnkbTgD1MfYfKvkNYpcd2m0dej9HEg2pf-HD9-pcR6iMEAPANQmz8yVBdzaKg6Is7qfpL9m9Y7DbvA87QMuz_M9yvHrIkkYNgOoKgoWTUc2Px7JZplq0L5BLjI7VdcAUZyv5TQoCNKOC-55Ycso4XOoDpLwQaupov-DMzQnYA336ECbCbhsu5JIaK1ZxVzeZ6nXbqOm5qe_3oCz2R1L2cchq_Kdk3igue4fM4osBgVP",
      isVerified: true,
      subscribers: "380K",
    },
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuAP1ziAg1epumnkbTgD1MfYfKvkNYpcd2m0dej9HEg2pf-HD9-pcR6iMEAPANQmz8yVBdzaKg6Is7qfpL9m9Y7DbvA87QMuz_M9yvHrIkkYNgOoKgoWTUc2Px7JZplq0L5BLjI7VdcAUZyv5TQoCNKOC-55Ycso4XOoDpLwQaupov-DMzQnYA336ECbCbhsu5JIaK1ZxVzeZ6nXbqOm5qe_3oCz2R1L2cchq_Kdk3igue4fM4osBgVP",
    duration: "18:45",
    views: "310K views",
    timestamp: "2 weeks ago",
    badges: ["Color Grading", "DaVinci"],
    quality: "4K HDR",
    likes: "32K",
    likeCountNumber: 32000,
    commentsCount: 610,
    category: "Cinematography",
    tags: ["davinci", "colorgrading", "postproduction"],
  },
  {
    id: "virtual-stage-cinetech",
    title: "Inside Hollywood’s Most Expensive Virtual Stage",
    description: "Massive curved LED volume virtual production soundstage in Hollywood with high-tech camera cranes capturing an actor on an alien sand dune set illuminated by giant golden digital sun.",
    creator: {
      id: "cinetech",
      name: "CineTech",
      handle: "@cinetech",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6GtsBNEpfdovFsyuzsoBzHhvOgVAj9dZjS7pN4Cv-bdNXA5pBjdtM0NdnKHMHyNz89TdVJ_C7F-cRjy-PCw0ts5mF5zxcPgvlCjpEVTNKbWZ8gbWNXInvnYdQ5kEhHK5P2zY1hl4J0SInsRljetgfvEX6LNN_cQOQicD_c-_UfIRDbqbFL2zjEMFKivqwz2CujgLo2AjMQkDxRJAbnBKJWa3eXmC0XMLUVnNtFk6sswpCD6fqL13M",
      isVerified: true,
      subscribers: "740K",
    },
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6GtsBNEpfdovFsyuzsoBzHhvOgVAj9dZjS7pN4Cv-bdNXA5pBjdtM0NdnKHMHyNz89TdVJ_C7F-cRjy-PCw0ts5mF5zxcPgvlCjpEVTNKbWZ8gbWNXInvnYdQ5kEhHK5P2zY1hl4J0SInsRljetgfvEX6LNN_cQOQicD_c-_UfIRDbqbFL2zjEMFKivqwz2CujgLo2AjMQkDxRJAbnBKJWa3eXmC0XMLUVnNtFk6sswpCD6fqL13M",
    duration: "14:12",
    views: "620K views",
    timestamp: "5 days ago",
    badges: ["Virtual Stage", "LED Volume"],
    quality: "4K UHD",
    likes: "44K",
    likeCountNumber: 44000,
    commentsCount: 890,
    category: "Cinematography",
    tags: ["ledvolume", "virtualproduction", "cinematography"],
  },
  {
    id: "anamorphic-65mm",
    title: "Why 65mm Anamorphic Still Rules Cinema",
    description: "Minimalist anamorphic camera lens breakdown, disassembled optical glass elements arranged cleanly with warm golden backlighting, macro engineering aesthetic.",
    creator: {
      id: "auraarchives",
      name: "Aura Archives",
      handle: "@aura_archives",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCvukr5j15xtGQVlremsDmm6Vj8GJz2jqIxUIydtvg6BrFO98nSvadwv66_sH4xzGdwcQkD1E1cyIXhf6vEDbyEymGi-t9O6tM5zc2PTV3TB30X7qwoSDQrYpgkmcOpzlNajA1KfPznojrqEeqCsQRr0U54WW2acDA2jf_S-aDsxZLBRkFjsKPocdbnIg16D_M8SnAbVBlmBffER4NDfwcufoM_EKLAK0hAqjCiySYZNqM7JjRCvJVe",
      isVerified: true,
      subscribers: "490K",
    },
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuCvukr5j15xtGQVlremsDmm6Vj8GJz2jqIxUIydtvg6BrFO98nSvadwv66_sH4xzGdwcQkD1E1cyIXhf6vEDbyEymGi-t9O6tM5zc2PTV3TB30X7qwoSDQrYpgkmcOpzlNajA1KfPznojrqEeqCsQRr0U54WW2acDA2jf_S-aDsxZLBRkFjsKPocdbnIg16D_M8SnAbVBlmBffER4NDfwcufoM_EKLAK0hAqjCiySYZNqM7JjRCvJVe",
    duration: "09:30",
    views: "184K views",
    timestamp: "1 month ago",
    badges: ["Anamorphic", "Optics"],
    quality: "65mm Ultra Panavision",
    likes: "18K",
    likeCountNumber: 18000,
    commentsCount: 390,
    category: "Cinematography",
    tags: ["anamorphic", "optics", "lenses", "65mm"],
  },
];

export const INITIAL_COMMENTS: CommentItem[] = [
  {
    id: "c1",
    author: "Studio Kroma",
    handle: "@studio_kroma",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0ckm7zXeopHAxnCwo1EKRYSP7Ngq-OCp3WRv2aiDbZ-Vh4VVvoj5-Sga97yeVie3AA7yib09cqCFNj-DCY2EMFHPNML_rLOOJ4NOiKfFm7-H6SnVA-oQjRWEgLtvb_kt0T_EVfiuPdr0kA2wPcFp_qLGWyGY7r2qmdCaeBnl2JmNaOALQIC9nVVCDPO3PfO16uolfs71uGH3hX6lWM5IzZfC3aeyQqPSS2nq8WETFHz4f2Mfj2rZQ",
    isCreator: true,
    isPinned: true,
    timestamp: "1d ago",
    text: "Project files & custom post-processing volume LUTs have been updated for Unreal Engine 5.5 in the Patreon vault. Let me know your benchmark FPS below!",
    likes: 342,
  },
  {
    id: "c2",
    author: "Elena Cine",
    handle: "@elena_cine",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuApmRd6t-ZnhrRumgStaroNum7wwhwi1eL1YYAooroP4zCRh7pkynSB4wiJSflKzp0fJeZ5QZ3bJANKuTjBopOQwZv-ncYv0iAWWCdb0m_Jc1a7wNIBQoSg_Gw0CQCEPZcbSYe-p9vU8UkU-xvrFzkYSovkid-FLGeKJQ9mQGW0RAf-0Y8077jLrzXyCBDVbO381R6p2TUKBB5KBEjyLgpib4oFRtoAGneiubgQbVT27_ruCF5GWoBJ",
    timestamp: "18 hours ago",
    text: "The way you handled the volumetric bounce off the wet concrete shader is pure poetry. Testing this out on our anamorphic Shinjuku project tonight!",
    likes: 129,
  },
  {
    id: "c3",
    author: "Marcus Vance",
    handle: "@vance_dp",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCGFXF87FtxXN1ur0dhFJQBHE9DZhJXwkd-d3a84H58uaX1wmeg3dl4W3w6VcgqxGGCbmhXbLfoMCrN2pgapgnlAgP3c5bTYAGp3oGMM2p_cEZ4WYtI6YsJ8d7IELn7aKjWkvdPne4wWpU1CvfJH0Ywplxcy9InWuGIwYn77yTNT_5Us-N793V58n2LWaP1LW_7OI7EQxjPzC1aaVpcNodwYpxWUJuDxpAV6-5raiCiRFtOO_KUmmM",
    timestamp: "12 hours ago",
    text: "Watching this in full 4K HDR on calibrated OLED is breathtaking. The rim illumination falloff is so subtle yet transformative.",
    likes: 85,
  },
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: "n1",
    title: "Studio Kroma is LIVE now",
    message: "Live stream: Unreal Engine 5.5 virtual production breakdown & Q&A.",
    time: "10m ago",
    unread: true,
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZ4L7SMVS1XHr-ZEF7rrNIsy2YY7le1tr7Nm832o03pY-EQ0XaG8sYSJ-FxRVTMjSs5BGuyxfw0QbD9JRHMe6yt83ivjeOdx2N_aIjYExExLg9X4DCoLCrtzOgb484OgFzhsZDNGCjRL4tFg1gl3GrCo2xSnfzpgV0PsdLUNEKHq42Q3fx1JsfRIrAbW5YlF54rl65hh28cJxLBwRPSq4ZJ6gZIROvToTWcsp_P0a33zYwVe857BEU",
    videoId: "unreal-lighting-kroma",
  },
  {
    id: "n2",
    title: "Horology Noir premiered a new 4K masterwork",
    message: "Inside the World of Custom Mechanical Watches is now available in HDR.",
    time: "2h ago",
    unread: true,
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD09maEappxdACn1NVnbiV7RNXumMRaGXC3Adll07S5XEMbbue0T8UIfAF0Gse3LMU12yF-AHlpIvxsKs6u8DQgI1bzKGfb8CXthWVzhvh4KQqJCNgbCOU2I0B9GlBSHdUcHyBgt4jTTidRmAnw-Enl4LLBhrYcq4zKMZE0dnz1VJmr92sXYvXaXOrr-1i_0p1POBih3HuMJYDAScLJGKn-RnSzmd6UHpV1HeyPtFvdr9HU-83h7fJW",
    videoId: "custom-mechanical-watches",
  },
  {
    id: "n3",
    title: "Offline Vault Sync Completed",
    message: "12 downloaded masterworks synchronized in 1080p hardware ProRes.",
    time: "5h ago",
    unread: false,
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvqKilfJFi0-wL2DHiRu-epTk-5t3eWCK8tom-c_XtL-rnoIFWN_h2fPcxPStEG5I-rXFXjbRiwZhc9I0WO-CTnxz43_gRimYPhlrggys2WAjweOtam2OJxvmOJbjIKLXFXtuKCK9QCn3h_7Sb5_027tqpdAaQBfENLYBBSnQOMN3a2aOY1Du4ld75yN9ZcnaDEsTeZU41JMlmCvYBQlyhs9G2WPqUldYIoR0fd-S7do1cSuS8zUFT",
  },
];

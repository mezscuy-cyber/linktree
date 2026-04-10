/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

interface LinkItem {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  icon: string;
  delay: string;
}

interface Member {
  id: string;
  name: string;
  position: string;
  photo: string;
  divisionId: string;
}

interface Program {
  id: string;
  title: string;
  category: "Pejabat Teras" | "Divisi";
  description: string;
  icon: string;
  divisionId: string;
}

const PROGRAMS: Program[] = [
  // Pejabat Teras
  { id: "p1", title: "DPT", category: "Pejabat Teras", description: "Dewan Pertimbangan Tinggi - Mengawasi dan memberikan arahan strategis bagi BES.", icon: "fa-solid fa-gavel", divisionId: "dpt" },
  { id: "p2", title: "DPR", category: "Pejabat Teras", description: "Dewan Perwakilan Rakyat - Menampung aspirasi siswa dan merumuskan kebijakan internal.", icon: "fa-solid fa-users-rectangle", divisionId: "dpr" },
  { id: "p3", title: "MANDATARIS", category: "Pejabat Teras", description: "Pelaksana mandat utama organisasi dan penanggung jawab seluruh kegiatan.", icon: "fa-solid fa-crown", divisionId: "mandataris" },
  // Departemen
  { id: "p4", title: "INFOKOM", category: "Divisi", description: "Departemen Informasi dan Komunikasi - Mengelola media sosial dan informasi digital.", icon: "fa-solid fa-circle-info", divisionId: "infokom" },
  { id: "p5", title: "AGAMA (Islam)", category: "Divisi", description: "Departemen Agama - Meningkatkan nilai-nilai spiritual dan kegiatan keagamaan.", icon: "fa-solid fa-mosque", divisionId: "agama" },
  { id: "p6", title: "HUKUM", category: "Divisi", description: "Departemen Hukum - Menjaga ketertiban dan menegakkan aturan organisasi.", icon: "fa-solid fa-scale-balanced", divisionId: "hukum" },
  { id: "p7", title: "SOSIAL", category: "Divisi", description: "Departemen Sosial - Mengkoordinasi kegiatan sosial dan pengabdian masyarakat.", icon: "fa-solid fa-handshake-angle", divisionId: "sosial" },
  { id: "p8", title: "DISPORA", category: "Divisi", description: "Departemen Pemuda dan Olahraga - Mengembangkan bakat olahraga siswa.", icon: "fa-solid fa-volleyball", divisionId: "dispora" },
  { id: "p9", title: "BAKAT MINAT", category: "Divisi", description: "Departemen Bakat Minat - Mewadahi kreativitas seni dan minat khusus siswa.", icon: "fa-solid fa-palette", divisionId: "bakat_minat" },
  { id: "p10", title: "KESEHATAN", category: "Divisi", description: "Departemen Kesehatan - Mengelola UKS dan program kesehatan lingkungan.", icon: "fa-solid fa-heart-pulse", divisionId: "kesehatan" },
];

const MEMBERS: Member[] = [
  // MANDATARIS
  { id: "m1", name: "Gibran Fath Naseh.A", position: "Ketua", photo: "/mm/m1.jpg", divisionId: "mandataris" },
  { id: "m2", name: "Nasilya Nasma.H", position: "Wakil Ketua", photo: "/mm/m2.jpg", divisionId: "mandataris" },
  { id: "m3", name: "Nazwa Fitriani", position: "Sekretaris I", photo: "/mm/m3.jpg", divisionId: "mandataris" },
  { id: "m3b", name: "Siti Nabila", position: "Sekretaris II", photo: "/mm/m3b.jpg", divisionId: "mandataris" },
  { id: "m4", name: "Siti Halimah", position: "Bendahara I", photo: "/mm/m4.jpg", divisionId: "mandataris" },
  { id: "m4b", name: "Fatmatu zahra z.s", position: "Bendahara II", photo: "/mm/m4b.jpg", divisionId: "mandataris" },
  // DPT
  { id: "m5", name: "Rara Pratama", position: "Ketua", photo: "/mm/m5.jpg", divisionId: "dpt" },
  { id: "m6", name: "Ai Sarah Sumiati", position: "Wakil", photo: "/mm/m6.jpg", divisionId: "dpt" },
  { id: "m6b", name: "Riski Gunawan", position: "Anggota", photo: "/mm/m6b.jpg", divisionId: "dpt" },
  // DPR
  { id: "m7", name: "M. Paijal", position: "Ketua DPR", photo: "/mm/m7.jpg", divisionId: "dpr" },
  { id: "m8", name: "Alvi Nurvadilah", position: "Wakil DPR", photo: "/mm/m8.jpg", divisionId: "dpr" },
  { id: "m8b", name: "Intan Anggistiani", position: "Anggota DPR", photo: "/mm/m8b.jpg", divisionId: "dpr" },
  // INFOKOM
  { id: "m9", name: "Siva Sri lestari", position: "Koordinator INFOKOM", photo: "/mm/m9.jpg", divisionId: "infokom" },
  { id: "m10", name: "Wanda", position: "Anggota INFOKOM", photo: "/mm/m10.jpg", divisionId: "infokom" },
  { id: "m11", name: "M.rafli akbar", position: "Anggota INFOKOM", photo: "/mm/m11.jpg", divisionId: "infokom" },
  { id: "m12", name: "Khoirunnisa putri", position: "Anggota INFOKOM", photo: "/mm/m12.jpg", divisionId: "infokom" },
  // AGAMA
  { id: "m13", name: "Soifi", position: "Koordinator AGAMA", photo: "/mm/m13.jpg", divisionId: "agama" },
  { id: "m14", name: "Natasjya sri lestari", position: "Anggota AGAMA", photo: "/mm/m14.jpg", divisionId: "agama" },
  { id: "m15", name: "Putri permata sari", position: "Anggota AGAMA", photo: "/mm/m15.jpg", divisionId: "agama" },
  // HUKUM
  { id: "m16", name: "Ilham maulana", position: "Koordinator HUKUM", photo: "/mm/m16.jpg", divisionId: "hukum" },
  { id: "m17", name: "Moch rijal", position: "Anggota HUKUM", photo: "/mm/m17.jpg", divisionId: "hukum" },
  { id: "m18", name: "Adhany amelia", position: "Anggota HUKUM", photo: "/mm/m18.jpg", divisionId: "hukum" },
  { id: "m19", name: "Dede nurakmaliah", position: "Anggota HUKUM", photo: "/mm/m19.jpg", divisionId: "hukum" },
  // SOSIAL
  { id: "m20", name: "Shalma siti sopiah", position: "Koordinator SOSIAL", photo: "/mm/m20.jpg", divisionId: "sosial" },
  { id: "m21", name: "Diah sopa riah", position: "Anggota SOSIAL", photo: "/mm/m21.jpg", divisionId: "sosial" },
  { id: "m22", name: "Cici wulansari", position: "Anggota SOSIAL", photo: "/mm/m22.jpg", divisionId: "sosial" },
  // DISPORA
  { id: "m23", name: "Regina mustika rama", position: "Koordinator DISPORA", photo: "/mm/m23.jpg", divisionId: "dispora" },
  { id: "m24", name: "Moch vihir rakan setiawan", position: "Anggota DISPORA", photo: "/mm/m24.jpg", divisionId: "dispora" },
  { id: "m25", name: "Revalina", position: "Anggota DISPORA", photo: "/mm/m25.jpg", divisionId: "dispora" },
  // BAKAT MINAT
  { id: "m26", name: "Meylsa Rachma sapitri", position: "Koordinator BAKAT MINAT", photo: "/mm/m26.jpg", divisionId: "bakat_minat" },
  { id: "m27", name: "Gea maulida", position: "Anggota BAKAT MINAT", photo: "/mm/m27.jpg", divisionId: "bakat_minat" },
  { id: "m28", name: "Silfia nurkaromah", position: "Anggota BAKAT MINAT", photo: "/mm/m28.jpg", divisionId: "bakat_minat" },
  // KESEHATAN
  { id: "m29", name: "Anisa Trinanda", position: "Koordinator KESEHATAN", photo: "/mm/m29.jpg", divisionId: "kesehatan" },
  { id: "m30", name: "Zihan Cahya indriani", position: "Anggota KESEHATAN", photo: "/mm/m30.jpg", divisionId: "kesehatan" },
  { id: "m31", name: "Alya april. N", position: "Anggota KESEHATAN", photo: "/mm/m31.jpg", divisionId: "kesehatan" },
];

interface ExtraItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  description: string;
  schedule: string;
}

const EXTRA_ITEMS: ExtraItem[] = [
  {
    id: "e1",
    title: "Pramuka",
    icon: "fa-solid fa-campground",
    description: "Membentuk karakter disiplin, mandiri, dan jiwa kepemimpinan melalui kepanduan.",
    schedule: "Sabtu, 09:00 WIB"
  },
  {
    id: "e2",
    title: "Muhadoroh (Kultum)",
    icon: "fa-solid fa-microphone-lines",
    description: "Melatih kemampuan public speaking dan dakwah islami bagi siswa.",
    schedule: "Kamis, 09:00 WIB"
  },
  {
    id: "e3",
    title: "Marawis & Hadroh",
    icon: "fa-solid fa-drum-steelpan",
    description: "Seni musik islami dengan perkusi tradisional yang harmonis.",
    schedule: "Rabu, 09:00 WIB"
  },
  {
    id: "e4",
    title: "Marching Band",
    subtitle: "GEMA AL MANSHURIYAH",
    icon: "fa-solid fa-music",
    description: "Korps musik kebanggaan madrasah dengan perpaduan alat musik tiup dan perkusi.",
    schedule: "Minggu, 09:00 WIB"
  },
  {
    id: "e5",
    title: "Qiro'at",
    icon: "fa-solid fa-book-quran",
    description: "Seni membaca Al-Qur'an dengan lantunan nada yang indah dan tartil.",
    schedule: "Selasa, 09:00 WIB"
  },
  {
    id: "e6",
    title: "Palang Merah Remaja (PMR)",
    icon: "fa-solid fa-kit-medical",
    description: "Pelayanan kesehatan remaja dan pertolongan pertama pada kecelakaan.",
    schedule: "Kamis, 09:00 WIB"
  },
  {
    id: "e7",
    title: "Paskibra",
    icon: "fa-solid fa-flag",
    description: "Pelatihan baris-berbaris dan pengibaran bendera dengan kedisiplinan tinggi.",
    schedule: "Rabu, 09:00 WIB"
  },
  {
    id: "e8",
    title: "Bandung Karate Club (BKC)",
    icon: "fa-solid fa-user-ninja",
    description: "Seni bela diri karate untuk kesehatan fisik dan perlindungan diri.",
    schedule: "Sabtu, 09:00 WIB"
  },
  {
    id: "e9",
    title: "Keputrian",
    icon: "fa-solid fa-person-dress",
    description: "Wadah pembinaan khusus siswi mengenai keterampilan dan wawasan kewanitaan.",
    schedule: "Jumat, 09:00 WIB"
  },
  {
    id: "e10",
    title: "Sanggar Seni",
    icon: "fa-solid fa-masks-theater",
    description: "Eksplorasi seni peran, teater, dan ekspresi kreatif siswa.",
    schedule: "Senin, 09:00 WIB"
  },
  {
    id: "e11",
    title: "Seni Musik Tradisional",
    icon: "fa-solid fa-guitar",
    description: "Pelestarian budaya melalui alat musik tradisional nusantara.",
    schedule: "Jumat, 09:00 WIB"
  },
  // OLAHRAGA
  {
    id: "e12",
    title: "Futsal",
    icon: "fa-solid fa-futbol",
    description: "Olahraga bola besar untuk melatih ketangkasan dan kerjasama tim.",
    schedule: "Selasa, 09:00 WIB"
  },
  {
    id: "e13",
    title: "Voly",
    icon: "fa-solid fa-volleyball",
    description: "Pelatihan teknik dasar dan strategi permainan bola voli.",
    schedule: "Rabu, 09:00 WIB"
  },
  {
    id: "e14",
    title: "Bulu Tangkis",
    icon: "fa-solid fa-medal",
    description: "Olahraga raket untuk melatih kecepatan dan refleks.",
    schedule: "Kamis, 09:00 WIB"
  },
  {
    id: "e15",
    title: "Tenis Meja",
    icon: "fa-solid fa-table-tennis-paddle-ball",
    description: "Olahraga bola kecil yang melatih konsentrasi dan koordinasi.",
    schedule: "Senin, 09:00 WIB"
  }
];

const LINKS: LinkItem[] = [
  {
    id: "1",
    title: "Pendaftaran Madrasah",
    subtitle: "PPDB MA 2026",
    url: "https://s.id/PPDB_MA_2025",
    icon: "fa-solid fa-user-plus",
    delay: "0s",
  },
  {
    id: "2",
    title: "Anggota BES",
    subtitle: "Meet the Team",
    url: "#",
    icon: "fa-solid fa-users",
    delay: "0.4s",
  },
  {
    id: "3",
    title: "Program Kerja",
    subtitle: "Upcoming Events & Projects",
    url: "#",
    icon: "fa-solid fa-calendar-check",
    delay: "0.8s",
  },
  {
    id: "4",
    title: "Galeri Kegiatan",
    subtitle: "Memories & Highlights",
    url: "#",
    icon: "fa-solid fa-images",
    delay: "1.2s",
  },
  {
    id: "5",
    title: "Ekstrakurikuler",
    subtitle: "Develop Your Talents",
    url: "#",
    icon: "fa-solid fa-star",
    delay: "1.6s",
  },
  {
    id: "6",
    title: "Hubungi Kami",
    subtitle: "Get in Touch",
    url: "#",
    icon: "fa-solid fa-paper-plane",
    delay: "2.0s",
  },
];

interface SocialLink {
  id: string;
  icon: string;
  url: string;
  color: string;
}

function FlashButton({ 
  children, 
  onClick, 
  className, 
  onMouseEnter, 
  onMouseLeave,
  whileHover,
  whileTap,
  initial,
  animate,
  transition
}: { 
  children: React.ReactNode; 
  onClick?: (e?: any) => void; 
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  whileHover?: any;
  whileTap?: any;
  initial?: any;
  animate?: any;
  transition?: any;
  key?: string | number;
}) {
  const [showFlash, setShowFlash] = useState(false);

  const handleClick = () => {
    setShowFlash(true);
    setTimeout(() => setShowFlash(false), 400);
    if (onClick) onClick();
  };

  return (
    <motion.button
      initial={initial}
      animate={animate}
      whileHover={whileHover}
      whileTap={whileTap}
      onClick={handleClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`relative overflow-hidden ${className}`}
    >
      {showFlash && <div className="click-flash-effect" />}
      {children}
    </motion.button>
  );
}

interface GalleryItem {
  id: string;
  title: string;
  date: string;
  image: string;
  description: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    title: "Latihan Dasar Kepemimpinan",
    date: "12 Jan 2025",
    image: "https://picsum.photos/seed/ldks/800/600",
    description: "Membentuk karakter pemimpin masa depan yang berintegritas dan visioner."
  },
  {
    id: "g2",
    title: "Bakti Sosial Ramadhan",
    date: "25 Mar 2025",
    image: "https://picsum.photos/seed/baksos/800/600",
    description: "Berbagi kebahagiaan dan kepedulian bersama masyarakat sekitar madrasah."
  },
  {
    id: "g3",
    title: "Pekan Olahraga & Seni",
    date: "15 Feb 2025",
    image: "https://picsum.photos/seed/porseni/800/600",
    description: "Ajang kreativitas dan sportivitas antar kelas MA Al-Manshuriyah."
  },
  {
    id: "g4",
    title: "Seminar Digital Literacy",
    date: "05 Feb 2025",
    image: "https://picsum.photos/seed/seminar/800/600",
    description: "Edukasi penggunaan media sosial yang bijak dan produktif bagi siswa."
  },
  {
    id: "g5",
    title: "Go Green Campaign",
    date: "20 Jan 2025",
    image: "https://picsum.photos/seed/gogreen/800/600",
    description: "Aksi nyata pelestarian lingkungan di area madrasah dan sekitarnya."
  },
  {
    id: "g6",
    title: "Maulid Nabi Muhammad SAW",
    date: "10 Oct 2024",
    image: "https://picsum.photos/seed/maulid/800/600",
    description: "Peringatan hari besar Islam untuk meneladani akhlak Rasulullah."
  },
  {
    id: "g7",
    title: "Sholat Ashar Berjamaah & Kultum",
    date: "Setiap Hari",
    image: "https://picsum.photos/seed/sholat/800/600",
    description: "Pembiasaan ibadah berjamaah dan siraman rohani untuk memperkuat spiritualitas siswa."
  },
  {
    id: "g8",
    title: "Fingerprint Presensi Siswa",
    date: "Setiap Pagi",
    image: "https://picsum.photos/seed/fingerprint/800/600",
    description: "Kedisiplinan kehadiran melalui sistem digital sebelum memasuki ruang kelas."
  }
];

const SOCIAL_LINKS: SocialLink[] = [
  { id: "ig", icon: "fa-brands fa-instagram", url: "https://www.instagram.com/besmatcha_?igsh=MTN4OWt1djJpYXpxZA==", color: "hover:text-[#E4405F]" },
  { id: "fb", icon: "fa-brands fa-facebook", url: "https://www.facebook.com/share/1BMXVURMPb/", color: "hover:text-[#1877F2]" },
  { id: "yt", icon: "fa-brands fa-youtube", url: "https://youtube.com/@besmaalmanshuriyah?si=EewfZp2MxlbRrRbn", color: "hover:text-[#FF0000]" },
  { id: "tk", icon: "fa-brands fa-tiktok", url: "https://www.tiktok.com/@alman_105?_r=1&_t=ZS-95N2GXRyCoB", color: "hover:text-[#000000]" },
];

export default function App() {
  const [mounted, setMounted] = useState(false);
  const [currentView, setCurrentView] = useState<"links" | "structure" | "programs" | "division_profile" | "gallery" | "extracurricular" | "contact">("links");
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);
  const setCursorHovered = (_val: boolean) => {};
  
  // Mouse position for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Parallax transforms for background shapes
  const shape1X = useTransform(mouseX, [-500, 500], [-30, 30]);
  const shape1Y = useTransform(mouseY, [-500, 500], [-30, 30]);
  const shape2X = useTransform(mouseX, [-500, 500], [40, -40]);
  const shape2Y = useTransform(mouseY, [-500, 500], [40, -40]);

  useEffect(() => {
    setMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative min-h-screen flex flex-col items-center py-20 px-6 overflow-x-hidden"
    >
      {/* Background Shapes with Parallax */}
      <div className="bg-shapes">
        <motion.div style={{ x: shape1X, y: shape1Y }} className="shape shape-1" />
        <motion.div style={{ x: shape2X, y: shape2Y }} className="shape shape-2" />
        <div className="shape shape-3" />
      </div>

      {/* Header Section */}
      <header className="flex flex-col items-center mb-12 text-center z-10">
        <div className="avatar-pulse mb-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-32 h-32 rounded-full neumorphic-raised p-2 relative z-10 cursor-pointer flex items-center justify-center bg-white/50"
            onClick={() => setCurrentView("links")}
          >
            <img
              src="./logo.png"
              alt="BES Al-Manshuriyah Logo"
              className="w-full h-full object-contain rounded-full"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://picsum.photos/seed/education/400/400";
              }}
            />
          </motion.div>
        </div>

        <div className="space-y-3">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl font-[800] tracking-tight text-black font-display"
          >
            {currentView === "links" ? "BADAN EKSEKUTIF SISWA" : 
             currentView === "structure" ? "ANGGOTA BES" : 
             currentView === "programs" ? "PROGRAM KERJA" : 
             currentView === "gallery" ? "GALERI KEGIATAN" : 
             currentView === "extracurricular" ? "EKSTRAKURIKULER" : 
             currentView === "contact" ? "HUBUNGI KAMI" : "PROFIL ANGGOTA"}
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[10px] font-[300] text-black uppercase tracking-[6px]"
          >
            Madrasah Aliyah Al-Manshuriyah
          </motion.p>

          {/* Social Media Links */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex items-center justify-center space-x-4 pt-4"
          >
            {SOCIAL_LINKS.map((social) => (
              <FlashButton
                key={social.id}
                onClick={() => { window.open(social.url, "_blank"); }}
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`w-10 h-10 flex items-center justify-center rounded-xl neumorphic-raised-sm text-lg text-black/40 transition-all duration-300 ${social.color} hover:bg-white/50`}
              >
                <i className={social.icon}></i>
              </FlashButton>
            ))}
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-4xl z-10">
        {currentView === "links" ? (
          <div className="max-w-md mx-auto space-y-10">
            {LINKS.map((link, index) => (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 80, 
                  damping: 20,
                  delay: 0.8 + index * 0.12 
                }}
                className="floating-wrapper"
                style={{ animationDelay: link.delay }}
              >
                <LinkCard 
                  link={link} 
                  onHoverStart={() => {}} 
                  onHoverEnd={() => {}} 
                  onClick={() => {
                    if (link.id === "2") {
                      setTimeout(() => setCurrentView("structure"), 800);
                    } else if (link.id === "3") {
                      setTimeout(() => setCurrentView("programs"), 800);
                    } else if (link.id === "4") {
                      setTimeout(() => setCurrentView("gallery"), 800);
                    } else if (link.id === "5") {
                      setTimeout(() => setCurrentView("extracurricular"), 800);
                    } else if (link.id === "6") {
                      setTimeout(() => setCurrentView("contact"), 800);
                    }
                  }}
                />
              </motion.div>
            ))}
          </div>
        ) : currentView === "structure" ? (
          <div className="flex flex-col items-center w-full">
            <FlashButton
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              whileHover={{ opacity: 1 }}
              onClick={() => setCurrentView("links")}
              className="mb-16 px-6 py-3 rounded-full neumorphic-raised text-[10px] font-[600] uppercase tracking-[3px] text-black/60 hover:text-black transition-colors z-30"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            >
              <i className="fa-solid fa-arrow-left mr-2"></i> Kembali
            </FlashButton>

            <div className="w-full space-y-20 max-w-5xl">
              {/* Group by Category */}
              {["Pejabat Teras", "Divisi"].map((category) => (
                <div key={category} className="space-y-10">
                  <h3 className="text-[12px] font-[800] uppercase tracking-[8px] text-black/20 text-center">
                    {category === "Divisi" ? "Departemen Organisasi" : category}
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {MEMBERS.filter(m => 
                      PROGRAMS.find(p => p.divisionId === m.divisionId)?.category === category
                    ).map((member, index) => (
                      <motion.div
                        key={member.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center p-4 rounded-2xl neumorphic-raised glass-matte group hover:bg-black/5 transition-colors duration-300"
                      >
                        <div className="w-16 h-16 rounded-full overflow-hidden neumorphic-raised p-1 mr-5 shrink-0">
                          <img 
                            src={member.photo} 
                            alt={member.name} 
                            className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-500"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex flex-col text-left overflow-hidden">
                          <h4 className="text-sm font-[800] tracking-tight text-black truncate">{member.name}</h4>
                          <p className="text-[9px] font-[300] text-black/40 uppercase tracking-[2px] truncate">
                            {member.position}
                          </p>
                          <div className="flex items-center mt-1">
                             <span className="text-[7px] font-[600] text-black/20 uppercase tracking-[1px]">
                               {PROGRAMS.find(p => p.divisionId === member.divisionId)?.title}
                             </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-32 text-center max-w-lg px-6">
              <p className="text-[10px] font-[300] text-black/40 uppercase tracking-[4px] leading-relaxed">
                Anggota BES Badan Eksekutif Siswa <br/>
                Madrasah Aliyah Al-Manshuriyah 2025/2026
              </p>
            </div>
          </div>
        ) : currentView === "contact" ? (
          <div className="flex flex-col items-center w-full">
            <FlashButton
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              whileHover={{ opacity: 1 }}
              onClick={() => setCurrentView("links")}
              className="mb-16 px-6 py-3 rounded-full neumorphic-raised text-[10px] font-[600] uppercase tracking-[3px] text-black/60 hover:text-black transition-colors z-30"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            >
              <i className="fa-solid fa-arrow-left mr-2"></i> Kembali
            </FlashButton>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-5xl">
              {/* Contact Info */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-10"
              >
                <div className="space-y-6">
                  <h3 className="text-2xl font-[800] tracking-tight text-black font-display">Mari Berkolaborasi</h3>
                  <p className="text-sm font-[300] text-black/50 leading-relaxed max-w-md">
                    Punya pertanyaan, saran, atau ingin bekerjasama dengan BES MA Al-Manshuriyah? Kami siap mendengar dari Anda.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-6">
                    <div className="w-12 h-12 rounded-2xl neumorphic-raised flex items-center justify-center shrink-0 text-black/60">
                      <i className="fa-solid fa-location-dot"></i>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-[800] uppercase tracking-[2px] text-black/30 mb-1">Alamat</h4>
                      <p className="text-sm font-[500] text-black/70">Jl. Raya Al-Manshuriyah No. 123, <br/>Jawa Barat, Indonesia</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6">
                    <div className="w-12 h-12 rounded-2xl neumorphic-raised flex items-center justify-center shrink-0 text-black/60">
                      <i className="fa-solid fa-envelope"></i>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-[800] uppercase tracking-[2px] text-black/30 mb-1">Email</h4>
                      <p className="text-sm font-[500] text-black/70">bes@almanshuriyah.sch.id</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6">
                    <div className="w-12 h-12 rounded-2xl neumorphic-raised flex items-center justify-center shrink-0 text-black/60">
                      <i className="fa-solid fa-phone"></i>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-[800] uppercase tracking-[2px] text-black/30 mb-1">Telepon</h4>
                      <p className="text-sm font-[500] text-black/70">+62 812 3456 7890</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                className="neumorphic-raised p-10 rounded-[3rem] glass-matte"
              >
                <form 
                  className="space-y-6" 
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const name = formData.get('name');
                    const email = formData.get('email');
                    const message = formData.get('message');
                    const phone = "6285720914894";
                    const text = `Halo Admin BES MA Al-Manshuriyah,\n\nSaya ingin menyampaikan pesan:\n\n*Nama:* ${name}\n*Email:* ${email}\n*Pesan:* ${message}`;
                    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
                  }}
                >
                  <div className="space-y-2">
                    <label className="text-[9px] font-[800] uppercase tracking-[2px] text-black/30 ml-4">Nama Lengkap</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      placeholder="Masukkan nama Anda"
                      className="w-full px-6 py-4 rounded-2xl neumorphic-pressed bg-transparent border-none focus:ring-0 text-sm font-[500] text-black placeholder:text-black/20 transition-all"
                      onMouseEnter={() => setCursorHovered(true)}
                      onMouseLeave={() => setCursorHovered(false)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-[800] uppercase tracking-[2px] text-black/30 ml-4">Email</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      placeholder="email@example.com"
                      className="w-full px-6 py-4 rounded-2xl neumorphic-pressed bg-transparent border-none focus:ring-0 text-sm font-[500] text-black placeholder:text-black/20 transition-all"
                      onMouseEnter={() => setCursorHovered(true)}
                      onMouseLeave={() => setCursorHovered(false)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-[800] uppercase tracking-[2px] text-black/30 ml-4">Pesan</label>
                    <textarea 
                      rows={4}
                      name="message"
                      required
                      placeholder="Tuliskan pesan Anda di sini..."
                      className="w-full px-6 py-4 rounded-2xl neumorphic-pressed bg-transparent border-none focus:ring-0 text-sm font-[500] text-black placeholder:text-black/20 transition-all resize-none"
                      onMouseEnter={() => setCursorHovered(true)}
                      onMouseLeave={() => setCursorHovered(false)}
                    ></textarea>
                  </div>
                  <FlashButton
                    type="submit"
                    whileHover={{ scale: 1.02, backgroundColor: "#1a1a1a" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-5 rounded-2xl neumorphic-raised-dark text-white text-[10px] font-[800] uppercase tracking-[4px] transition-all flex items-center justify-center space-x-3"
                  >
                    <span className="text-white">Kirim Pesan</span>
                    <i className="fa-solid fa-paper-plane text-[12px] text-white"></i>
                  </FlashButton>
                </form>
              </motion.div>
            </div>

            <div className="mt-32 text-center max-w-lg px-6">
              <p className="text-[10px] font-[300] text-black/40 uppercase tracking-[4px] leading-relaxed">
                Layanan Informasi & Aspirasi Siswa <br/>
                Madrasah Aliyah Al-Manshuriyah
              </p>
            </div>
          </div>
        ) : currentView === "extracurricular" ? (
          <div className="flex flex-col items-center w-full">
            <FlashButton
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              whileHover={{ opacity: 1 }}
              onClick={() => setCurrentView("links")}
              className="mb-16 px-6 py-3 rounded-full neumorphic-raised text-[10px] font-[600] uppercase tracking-[3px] text-black/60 hover:text-black transition-colors z-30"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            >
              <i className="fa-solid fa-arrow-left mr-2"></i> Kembali
            </FlashButton>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
              {EXTRA_ITEMS.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group relative p-8 rounded-[2.5rem] neumorphic-raised glass-matte flex flex-col items-center text-center hover:bg-black/5 transition-all duration-500"
                >
                  <div className="w-20 h-20 rounded-3xl neumorphic-raised flex items-center justify-center text-3xl text-black/80 mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                    <i className={item.icon}></i>
                  </div>
                  <h4 className="text-lg font-[800] tracking-tight text-black mb-1">{item.title}</h4>
                  {item.subtitle && (
                    <p className="text-[10px] font-[600] text-black/40 uppercase tracking-[2px] mb-3">
                      {item.subtitle}
                    </p>
                  )}
                  <p className="text-[11px] font-[300] text-black/50 leading-relaxed mb-6">
                    {item.description}
                  </p>
                  <div className="mt-auto pt-4 border-t border-black/5 w-full">
                    <span className="text-[9px] font-[600] text-black/30 uppercase tracking-[2px]">
                      <i className="fa-regular fa-clock mr-2"></i> {item.schedule}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-32 text-center max-w-lg px-6">
              <p className="text-[10px] font-[300] text-black/40 uppercase tracking-[4px] leading-relaxed">
                Pengembangan Bakat & Minat Siswa <br/>
                Madrasah Aliyah Al-Manshuriyah
              </p>
            </div>
          </div>
        ) : currentView === "gallery" ? (
          <div className="flex flex-col items-center w-full">
            <FlashButton
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              whileHover={{ opacity: 1 }}
              onClick={() => setCurrentView("links")}
              className="mb-16 px-6 py-3 rounded-full neumorphic-raised text-[10px] font-[600] uppercase tracking-[3px] text-black/60 hover:text-black transition-colors z-30"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            >
              <i className="fa-solid fa-arrow-left mr-2"></i> Kembali
            </FlashButton>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl">
              {GALLERY_ITEMS.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group relative rounded-[2.5rem] overflow-hidden neumorphic-raised glass-matte p-2"
                >
                  <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-left translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="text-[8px] font-[600] text-white/50 uppercase tracking-[3px] mb-2 block">
                        {item.date}
                      </span>
                      <h4 className="text-xl font-[800] text-white tracking-tight mb-3">
                        {item.title}
                      </h4>
                      <p className="text-[10px] font-[300] text-white/60 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-32 text-center max-w-lg px-6">
              <p className="text-[10px] font-[300] text-black/40 uppercase tracking-[4px] leading-relaxed">
                Dokumentasi Kegiatan Badan Eksekutif Siswa <br/>
                Madrasah Aliyah Al-Manshuriyah 2024/2025
              </p>
            </div>
          </div>
        ) : currentView === "programs" ? (
          <div className="flex flex-col items-center w-full px-4">
            <FlashButton
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              whileHover={{ opacity: 1 }}
              onClick={() => setCurrentView("links")}
              className="mb-12 px-6 py-3 rounded-full neumorphic-raised text-[10px] font-[600] uppercase tracking-[3px] text-black/60 hover:text-black transition-colors z-30"
            >
              <i className="fa-solid fa-arrow-left mr-2"></i> Kembali
            </FlashButton>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
              {/* Pejabat Teras Section */}
              <div className="md:col-span-2 mb-8">
                <h3 className="text-[12px] font-[800] uppercase tracking-[5px] text-black/30 mb-8 text-center">Pejabat Teras</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {PROGRAMS.filter(p => p.category === "Pejabat Teras").map((program, index) => (
                    <ProgramCard 
                      key={program.id} 
                      program={program} 
                      index={index}
                      onHoverStart={() => {}}
                      onHoverEnd={() => {}}
                      onViewProfile={() => {
                        setSelectedDivision(program.divisionId);
                        setCurrentView("division_profile");
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Divisi Section */}
              <div className="md:col-span-2">
                <h3 className="text-[12px] font-[800] uppercase tracking-[5px] text-black/30 mb-8 text-center">Departemen Organisasi</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {PROGRAMS.filter(p => p.category === "Divisi").map((program, index) => (
                    <ProgramCard 
                      key={program.id} 
                      program={program} 
                      index={index + 3}
                      onHoverStart={() => {}}
                      onHoverEnd={() => {}}
                      onViewProfile={() => {
                        setSelectedDivision(program.divisionId);
                        setCurrentView("division_profile");
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center w-full px-4">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              whileHover={{ opacity: 1 }}
              onClick={() => setCurrentView("programs")}
              className="mb-12 px-6 py-3 rounded-full neumorphic-raised text-[10px] font-[600] uppercase tracking-[3px] text-black/60 hover:text-black transition-colors z-30"
            >
              <i className="fa-solid fa-arrow-left mr-2"></i> Kembali ke Program Kerja
            </motion.button>

            <div className="w-full max-w-5xl">
              <h3 className="text-[12px] font-[800] uppercase tracking-[5px] text-black/30 mb-12 text-center">
                {PROGRAMS.find(p => p.divisionId === selectedDivision)?.title}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {MEMBERS.filter(m => m.divisionId === selectedDivision).map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 rounded-[2rem] neumorphic-raised glass-matte flex flex-col items-center text-center group"
                  >
                    <div className="w-32 h-32 rounded-full overflow-hidden neumorphic-raised p-1 mb-6 group-hover:scale-105 transition-transform duration-500">
                      <img 
                        src={member.photo} 
                        alt={member.name} 
                        className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <h4 className="text-sm font-[800] tracking-tight text-black mb-1">{member.name}</h4>
                    <p className="text-[9px] font-[300] text-black/40 uppercase tracking-[2px]">
                      {member.position}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer Marquee */}
      <footer className="mt-32 w-full z-10">
        <div className="marquee-container border-t border-black/5">
          <div className="marquee-content">
            <span className="text-[10px] font-[300] uppercase tracking-[8px] text-black mx-10">
              BES MA AL-MANSHURIYAH &bull; BADAN EKSEKUTIF SISWA &bull; DIGITAL VISIONARY &bull; INNOVATIVE LEADERSHIP &bull;
            </span>
            <span className="text-[10px] font-[300] uppercase tracking-[8px] text-black mx-10">
              BES MA AL-MANSHURIYAH &bull; BADAN EKSEKUTIF SISWA &bull; DIGITAL VISIONARY &bull; INNOVATIVE LEADERSHIP &bull;
            </span>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}

function LinkCard({ 
  link, 
  onHoverStart, 
  onHoverEnd,
  onClick
}: { 
  link: LinkItem; 
  onHoverStart: () => void; 
  onHoverEnd: () => void;
  onClick?: () => void;
}) {
  const [isPressed, setIsPressed] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);
  
  // Motion values for magnetic/tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { damping: 20, stiffness: 200 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { damping: 20, stiffness: 200 });
  const springX = useSpring(x, { damping: 20, stiffness: 200 });
  const springY = useSpring(y, { damping: 20, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Magnetic intensity
    const intensity = 15;
    x.set((e.clientX - centerX) / intensity);
    y.set((e.clientY - centerY) / intensity);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsPressed(false);
    onHoverEnd();
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setShowFlash(true);
    setTimeout(() => setShowFlash(false), 400);
    setIsNavigating(true);
    if (onClick) onClick();
    // Simulate processing for demo links or provide feedback before browser unloads
    if (link.url === "#") {
      setTimeout(() => setIsNavigating(false), 2000);
    }
  };

  return (
    <motion.a
      ref={cardRef}
      href={link.url}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHoverStart}
      onMouseLeave={handleMouseLeave}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      style={{ 
        x: springX, 
        y: springY, 
        rotateX, 
        rotateY,
        perspective: 1000 
      }}
      className={`
        relative block w-full p-8 rounded-[2.5rem] transition-all duration-500 ease-out
        glass-matte
        ${isPressed ? "neumorphic-pressed" : "neumorphic-raised"}
        ${isNavigating ? "ring-2 ring-black/5 animate-pulse shadow-[0_0_30px_rgba(0,0,0,0.05)]" : ""}
      `}
    >
      {showFlash && <div className="click-flash-effect" />}
      <div className="flex items-center justify-between pointer-events-none">
        <div className="flex items-center space-x-6">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-14 h-14 rounded-2xl neumorphic-raised flex items-center justify-center text-black"
          >
            <i className={`${link.icon} text-2xl`}></i>
          </motion.div>
          <div>
            <h2 className="text-xl font-[800] tracking-tight text-black leading-tight">
              {link.title}
            </h2>
            <p className="text-[10px] font-[300] text-black/40 uppercase tracking-[3px] mt-1">
              {link.subtitle}
            </p>
          </div>
        </div>
        
        <div className="text-black/20">
          {isNavigating ? (
            <motion.i 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="fa-solid fa-circle-notch text-sm text-black/40"
            />
          ) : (
            <i className="fa-solid fa-chevron-right text-sm"></i>
          )}
        </div>
      </div>
    </motion.a>
  );
}

const ProgramCard: React.FC<{ 
  program: Program; 
  index: number;
  onHoverStart: () => void; 
  onHoverEnd: () => void;
  onViewProfile: () => void;
}> = ({ 
  program, 
  index,
  onHoverStart, 
  onHoverEnd,
  onViewProfile
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      whileHover={{ y: -10 }}
      className="p-8 rounded-[2rem] neumorphic-raised glass-matte flex flex-col items-center text-center group"
    >
      <div className="w-16 h-16 rounded-2xl neumorphic-raised flex items-center justify-center text-black mb-6 group-hover:scale-110 transition-transform duration-500">
        <i className={`${program.icon} text-2xl`}></i>
      </div>
      <h4 className="text-lg font-[800] tracking-tight text-black mb-3">{program.title}</h4>
      <p className="text-[10px] font-[300] text-black/50 uppercase tracking-[2px] leading-relaxed mb-6">
        {program.description}
      </p>
      
      <FlashButton
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          onViewProfile();
        }}
        className="mt-auto px-5 py-2.5 rounded-full neumorphic-raised text-[9px] font-[700] uppercase tracking-[2px] text-black/60 hover:text-black transition-colors"
      >
        Lihat Profil Anggota
      </FlashButton>
    </motion.div>
  );
}

const OrganigramNode: React.FC<{
  program: Program;
  isMain?: boolean;
  onViewProfile: () => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}> = ({ program, isMain, onViewProfile, onHoverStart, onHoverEnd }) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onClick={onViewProfile}
      className={`relative flex flex-col items-center p-6 rounded-[2rem] neumorphic-raised glass-matte cursor-pointer transition-all duration-500 group ${
        isMain ? "w-48 h-48 border-2 border-black/5" : "w-40 h-40"
      }`}
    >
      <div className={`rounded-2xl neumorphic-raised flex items-center justify-center text-black mb-4 group-hover:scale-110 transition-transform duration-500 ${
        isMain ? "w-16 h-16 text-2xl" : "w-12 h-12 text-xl"
      }`}>
        <i className={program.icon}></i>
      </div>
      <h4 className={`font-[800] tracking-tight text-black text-center leading-tight ${
        isMain ? "text-sm" : "text-[11px]"
      }`}>
        {program.title}
      </h4>
      <p className="text-[8px] font-[300] text-black/40 uppercase tracking-[2px] mt-2 text-center">
        {program.category === "Pejabat Teras" ? "Executive" : "Departemen"}
      </p>
      
      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 rounded-[2rem] transition-opacity duration-500 flex items-center justify-center">
        <span className="text-[8px] font-[700] uppercase tracking-[1px] text-black/60">Lihat Anggota</span>
      </div>
    </motion.div>
  );
}

interface MemberCardProps {
  member: Member;
  index: number;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

const MemberCard: React.FC<MemberCardProps> = ({ 
  member, 
  index,
  onHoverStart,
  onHoverEnd
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.02, duration: 0.5 }}
      className="group w-full aspect-[3/4] rounded-2xl overflow-hidden neumorphic-raised p-1 cursor-pointer bg-white/5 backdrop-blur-sm"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      whileHover={{ y: -5, scale: 1.02 }}
    >
      <div className="relative w-full h-full rounded-xl overflow-hidden">
        <img 
          src={member.photo} 
          alt={member.name} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4 text-left">
          <h3 className="text-white font-[800] text-[10px] tracking-tight leading-tight mb-1">
            {member.name}
          </h3>
          <p className="text-[7px] font-[300] text-white/60 uppercase tracking-[1px]">
            {member.position}
          </p>
        </div>
        
        {/* Static Label for non-hover */}
        <div className="absolute bottom-2 left-2 right-2 group-hover:opacity-0 transition-opacity duration-300">
          <div className="bg-white/90 backdrop-blur-md py-1.5 px-2 rounded-lg shadow-sm">
            <h3 className="text-[7px] font-[800] tracking-tight text-black truncate">
              {member.name}
            </h3>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

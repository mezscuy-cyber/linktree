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
  { id: "m1", name: "Ahmad Fauzi", position: "Ketua Umum", photo: "https://picsum.photos/seed/member1/400/400", divisionId: "mandataris" },
  { id: "m2", name: "Siti Aminah", position: "Wakil Ketua", photo: "https://picsum.photos/seed/member2/400/400", divisionId: "mandataris" },
  { id: "m3", name: "Budi Santoso", position: "Sekretaris I", photo: "https://picsum.photos/seed/member3/400/400", divisionId: "mandataris" },
  { id: "m3b", name: "Hendra Kurniawan", position: "Sekretaris II", photo: "https://picsum.photos/seed/member3b/400/400", divisionId: "mandataris" },
  { id: "m4", name: "Laila Sari", position: "Bendahara I", photo: "https://picsum.photos/seed/member4/400/400", divisionId: "mandataris" },
  { id: "m4b", name: "Rina Septiani", position: "Bendahara II", photo: "https://picsum.photos/seed/member4b/400/400", divisionId: "mandataris" },
  // DPT
  { id: "m5", name: "H. Abdullah", position: "Ketua DPT", photo: "https://picsum.photos/seed/member5/400/400", divisionId: "dpt" },
  { id: "m6", name: "Hj. Fatimah", position: "Anggota DPT", photo: "https://picsum.photos/seed/member6/400/400", divisionId: "dpt" },
  { id: "m6b", name: "H. Sulaiman", position: "Anggota DPT", photo: "https://picsum.photos/seed/member6b/400/400", divisionId: "dpt" },
  // DPR
  { id: "m7", name: "Rizky Pratama", position: "Ketua DPR", photo: "https://picsum.photos/seed/member7/400/400", divisionId: "dpr" },
  { id: "m8", name: "Dewi Lestari", position: "Sekretaris DPR", photo: "https://picsum.photos/seed/member8/400/400", divisionId: "dpr" },
  { id: "m8b", name: "Yusuf Mansur", position: "Anggota DPR", photo: "https://picsum.photos/seed/member8b/400/400", divisionId: "dpr" },
  // INFOKOM (4 Anggota)
  { id: "m9", name: "Andi Wijaya", position: "Koordinator INFOKOM", photo: "https://picsum.photos/seed/infokom1/400/400", divisionId: "infokom" },
  { id: "m10", name: "Rina Melati", position: "Anggota INFOKOM", photo: "https://picsum.photos/seed/infokom2/400/400", divisionId: "infokom" },
  { id: "m11", name: "Fajar Siddiq", position: "Anggota INFOKOM", photo: "https://picsum.photos/seed/infokom3/400/400", divisionId: "infokom" },
  { id: "m12", name: "Siska Putri", position: "Anggota INFOKOM", photo: "https://picsum.photos/seed/infokom4/400/400", divisionId: "infokom" },
  // AGAMA (3 Anggota)
  { id: "m13", name: "Ustadz Manshur", position: "Koordinator AGAMA", photo: "https://picsum.photos/seed/agama1/400/400", divisionId: "agama" },
  { id: "m14", name: "Siti Khadijah", position: "Anggota AGAMA", photo: "https://picsum.photos/seed/agama2/400/400", divisionId: "agama" },
  { id: "m15", name: "Ahmad Zaki", position: "Anggota AGAMA", photo: "https://picsum.photos/seed/agama3/400/400", divisionId: "agama" },
  // HUKUM (4 Anggota)
  { id: "m16", name: "Bambang", position: "Koordinator HUKUM", photo: "https://picsum.photos/seed/hukum1/400/400", divisionId: "hukum" },
  { id: "m17", name: "Agus", position: "Anggota HUKUM", photo: "https://picsum.photos/seed/hukum2/400/400", divisionId: "hukum" },
  { id: "m18", name: "Rudi", position: "Anggota HUKUM", photo: "https://picsum.photos/seed/hukum3/400/400", divisionId: "hukum" },
  { id: "m19", name: "Santi", position: "Anggota HUKUM", photo: "https://picsum.photos/seed/hukum4/400/400", divisionId: "hukum" },
  // SOSIAL (3 Anggota)
  { id: "m20", name: "Indah", position: "Koordinator SOSIAL", photo: "https://picsum.photos/seed/sosial1/400/400", divisionId: "sosial" },
  { id: "m21", name: "Joko", position: "Anggota SOSIAL", photo: "https://picsum.photos/seed/sosial2/400/400", divisionId: "sosial" },
  { id: "m22", name: "Lestari", position: "Anggota SOSIAL", photo: "https://picsum.photos/seed/sosial3/400/400", divisionId: "sosial" },
  // DISPORA (3 Anggota)
  { id: "m23", name: "Taufik", position: "Koordinator DISPORA", photo: "https://picsum.photos/seed/dispora1/400/400", divisionId: "dispora" },
  { id: "m24", name: "Eko", position: "Anggota DISPORA", photo: "https://picsum.photos/seed/dispora2/400/400", divisionId: "dispora" },
  { id: "m25", name: "Bayu", position: "Anggota DISPORA", photo: "https://picsum.photos/seed/dispora3/400/400", divisionId: "dispora" },
  // BAKAT MINAT (3 Anggota)
  { id: "m26", name: "Maya", position: "Koordinator BAKAT MINAT", photo: "https://picsum.photos/seed/bakat1/400/400", divisionId: "bakat_minat" },
  { id: "m27", name: "Dina", position: "Anggota BAKAT MINAT", photo: "https://picsum.photos/seed/bakat2/400/400", divisionId: "bakat_minat" },
  { id: "m28", name: "Reza", position: "Anggota BAKAT MINAT", photo: "https://picsum.photos/seed/bakat3/400/400", divisionId: "bakat_minat" },
  // KESEHATAN (3 Anggota)
  { id: "m29", name: "Dr. Sarah", position: "Koordinator KESEHATAN", photo: "https://picsum.photos/seed/kesehatan1/400/400", divisionId: "kesehatan" },
  { id: "m30", name: "Ani", position: "Anggota KESEHATAN", photo: "https://picsum.photos/seed/kesehatan2/400/400", divisionId: "kesehatan" },
  { id: "m31", name: "Budi", position: "Anggota KESEHATAN", photo: "https://picsum.photos/seed/kesehatan3/400/400", divisionId: "kesehatan" },
];

interface ExtraItem {
  id: string;
  title: string;
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
    schedule: "Sabtu, 14:00 WIB"
  },
  {
    id: "e2",
    title: "Paskibra",
    icon: "fa-solid fa-flag",
    description: "Pelatihan baris-berbaris dan pengibaran bendera dengan kedisiplinan tinggi.",
    schedule: "Rabu, 15:30 WIB"
  },
  {
    id: "e3",
    title: "PMR",
    icon: "fa-solid fa-kit-medical",
    description: "Pelayanan kesehatan remaja dan pertolongan pertama pada kecelakaan.",
    schedule: "Kamis, 15:30 WIB"
  },
  {
    id: "e4",
    title: "Seni Musik",
    icon: "fa-solid fa-music",
    description: "Wadah kreativitas dalam bermusik, vokal, dan pengembangan bakat seni.",
    schedule: "Jumat, 14:00 WIB"
  },
  {
    id: "e5",
    title: "Futsal",
    icon: "fa-solid fa-futbol",
    description: "Pengembangan bakat olahraga bola besar dan kerjasama tim di lapangan.",
    schedule: "Selasa, 16:00 WIB"
  },
  {
    id: "e6",
    title: "Karya Ilmiah Remaja",
    icon: "fa-solid fa-microscope",
    description: "Eksplorasi sains dan penelitian untuk mengasah daya kritis siswa.",
    schedule: "Senin, 15:30 WIB"
  }
];

const LINKS: LinkItem[] = [
  {
    id: "1",
    title: "Pendaftaran Madrasah",
    subtitle: "PPDB MA 2025",
    url: "https://s.id/PPDB_MA_2025",
    icon: "fa-solid fa-user-plus",
    delay: "0s",
  },
  {
    id: "2",
    title: "Daftar Anggota",
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
  { id: "ig", icon: "fa-brands fa-instagram", url: "#", color: "hover:text-[#E4405F]" },
  { id: "fb", icon: "fa-brands fa-facebook", url: "https://www.facebook.com/share/1BMXVURMPb/", color: "hover:text-[#1877F2]" },
  { id: "yt", icon: "fa-brands fa-youtube", url: "#", color: "hover:text-[#FF0000]" },
  { id: "tk", icon: "fa-brands fa-tiktok", url: "#", color: "hover:text-[#000000]" },
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
             currentView === "structure" ? "DAFTAR ANGGOTA" : 
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
                Daftar Anggota Badan Eksekutif Siswa <br/>
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
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-2">
                    <label className="text-[9px] font-[800] uppercase tracking-[2px] text-black/30 ml-4">Nama Lengkap</label>
                    <input 
                      type="text" 
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
                      placeholder="Tuliskan pesan Anda di sini..."
                      className="w-full px-6 py-4 rounded-2xl neumorphic-pressed bg-transparent border-none focus:ring-0 text-sm font-[500] text-black placeholder:text-black/20 transition-all resize-none"
                      onMouseEnter={() => setCursorHovered(true)}
                      onMouseLeave={() => setCursorHovered(false)}
                    ></textarea>
                  </div>
                  <FlashButton
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
                  <h4 className="text-lg font-[800] tracking-tight text-black mb-3">{item.title}</h4>
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

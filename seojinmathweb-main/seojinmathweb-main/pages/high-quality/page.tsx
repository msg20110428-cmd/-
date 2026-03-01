"use client"; // ← 반드시 최상단
import { useState } from "react";
import styles from "../../styles/index.module.css";
import PostCard from "../../components/PostCard";
import PostModal from "../../components/PostModal";
import Aurora from '../../effect/Aurora';
import DarkVeil from '../../effect/DarkVeil';

import { PostsType } from "@/pages/simple/page";

/***
 * PC 및 기타 환경을 위한 고사양 레이아웃
 */
export default function HighQuality({
  posts,
}: {
  posts: PostsType,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<{ title: string; description: string; author: string } | null>(null);
  const [sortOption, setSortOption] = useState<"최신순" | "인기순">("최신순");
  const [grades, setGrades] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");

  const openModal = (post: typeof posts[0]) => {
    setSelectedPost(post);
    setModalOpen(true);
  };

  const toggleGrade = (grade: string) => {
    setGrades(prev =>
      prev.includes(grade) ? prev.filter(g => g !== grade) : [...prev, grade]
    );
  };

  // 검색 + 학년 필터
  let filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.includes(search) || post.description.includes(search) || post.author.includes(search);
    const matchesGrade = grades.length === 0 || grades.includes(post.grade);
    return matchesSearch && matchesGrade;
  });

  // 정렬
  filteredPosts.sort((a, b) => {
    if (sortOption === "최신순") {
      return new Date(b.date).getTime() - new Date(a.date).getTime(); // 최신 -> 오래된
    } else {
      return b.likes - a.likes; // 좋아요 많은 순
    }
  });

  return (
    <div className="h-screen flex flex-col bg-[#0E0E0E] p-2 gap-2 overflow-hidden">
{/* 배경: 최상단에, 화면 전체 */}
      <Aurora
  colorStops={["#7cff67","#B19EEF","#5227FF"]}
  blend={0.5}
  amplitude={1.0}
  speed={0.5}
/>
    
      {/* 상단 영역 */}
      <div className="flex items-end gap-2"style={{
    position: 'relative', // 또는 absolute로 원하는 위치 조정 가능
    zIndex: 10             // 배경보다 위
  }}>
        <p className="text-[#33FF55] font-seoulAlrim text-4xl font-medium">서진웹</p>
        <p className="text-[#33FF55] font-seoulAlrim text-2xl font-medium">seojinmath.com</p>
      </div>

      {/* 초록 바 1 */}
      <div className="bg-[#33FF55] w-full h-[10px]"style={{
    position: 'relative', // 또는 absolute로 원하는 위치 조정 가능
    zIndex: 10             // 배경보다 위
  }}></div>

      {/* 버튼 영역 */}
      <div className="flex justify-between w-full gap-4">

        {/* 정렬 버튼 */}
        <div className="flex gap-4">
          {["최신순", "인기순"].map(label => (
            <div
              key={label}
              onClick={() => setSortOption(label as "최신순" | "인기순")}
              className="relative w-[100px] h-[40px] cursor-pointer"
            >
              <div className="border-2 border-[#33FF55] bg-[#111] w-full h-full absolute top-0 left-0"></div>
              <div
                style={{ backgroundColor: sortOption === label ? "#5A5A5A" : "#171717" }}
                className="w-[25px] h-[25px] absolute top-2 left-2 border border-[rgba(255,255,255,0.5)] transition-colors duration-200"
              ></div>
              <p className="text-[#33FF55] font-seoulAlrim text-[1rem] font-medium absolute top-1/2 right-[10%] -translate-y-1/2">
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* 학년 선택 + 검색창 */}
        <div className="flex gap-4 flex-nowrap items-center">
          {["중1","중2","중3","고1","고2","고3"].map(label => (
            <div
              key={label}
              onClick={() => toggleGrade(label)}
              className="relative w-[80px] h-[40px] cursor-pointer"
            >
              <div className="border-2 border-[#33FF55] bg-[#111] w-full h-full absolute top-0 left-0"></div>
              <div
                style={{ backgroundColor: grades.includes(label) ? "#5A5A5A" : "#171717" }}
                className="w-[25px] h-[25px] absolute top-2 left-2 border border-[rgba(255,255,255,0.5)] transition-colors duration-200"
              ></div>
              <p className="text-[#33FF55] font-seoulAlrim text-[1rem] font-medium absolute top-1/2 left-[55%] -translate-y-1/2">
                {label}
              </p>
            </div>
          ))}

          {/* 검색창 + 돋보기 */}
          <div className="relative w-[220px] h-[40px]">
            <input
              type="text"
              placeholder="검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-full bg-[#111] border-2 border-[#33FF55] px-3 pr-10 text-[#33FF55] font-seoulAlrim placeholder-[#33FF55]/50 focus:outline-none focus:bg-[#2b2b2b] transition-colors duration-200 rounded-none"
            />
            <svg
              className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-[#33FF55]"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
        </div>
      </div>

      {/* 초록 바 2 */}
      <div className="bg-[#33FF55] w-full h-[10px]"style={{
    position: 'relative', // 또는 absolute로 원하는 위치 조정 가능
    zIndex: 10             // 배경보다 위
  }}></div>

      {/* 게시물 영역 */}
      <div className={styles.scrollArea} style={{ height: "calc(100vh - 100px)", zIndex:10  }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 p-0" >
          {filteredPosts.map((post, idx) => (
            <PostCard
              key={idx}
              title={post.title}
              description={post.description}
              author={post.author}
              onClick={() => openModal(post)}
            />
          ))}
        </div>
      </div>

      {/* 모달 */}
      {selectedPost && (
        <PostModal
  isOpen={modalOpen}
  onClose={() => setModalOpen(false)}
  content={`${selectedPost.title}\n\n${selectedPost.description}\n작성자: ${selectedPost.author}`}
  images={["/owl.webp"]}
/>
      )}
    </div>
  );
}
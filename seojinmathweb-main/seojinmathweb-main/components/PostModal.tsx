import { FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  author: string;
  images?: string[];
}

const PostModal: FC<PostModalProps> = ({ isOpen, onClose, images = [], title, author }) => {
  const displayedImages = images.slice(0, 5);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null); // 추가

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 블러 + 배경 클릭 */}
          <motion.div
  className="fixed inset-0 bg-black/25  z-40"
  onClick={() => {
    if (zoomedImage) {
      // 확대 이미지가 열려 있으면 확대 이미지만 닫음
      setZoomedImage(null);
    } else {
      // 확대 이미지가 없으면 게시물 닫음
      onClose();
    }
  }}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
/>

          {/* 모달 */}
          <motion.div
            className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/75 border-3 border-[#33FF55] p-4 w-[55vw] h-[70vh] rounded-none text-white flex flex-col"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()} // 게시물 자체 클릭은 이벤트 전파 막기
          >
            {/* 제목 */}
            <h2 className="text-xl font-bold mb-2 text-[#33FF55]">{title}</h2>

            {/* 작성자 막대 */}
            <div className="relative w-full h-[0.3vw] bg-[#33FF55] mb-2">
              <p
                className="absolute right-0 bottom-0 text-[0.45vw] text-[rgba(255,255,255,0.6)] font-seoulAlrim"
                style={{ transform: "translateY(-60%) translateX(-10%)" }}
              >
                작성자 : {author}
              </p>
            </div>

            {/* 사진 영역 */}
            {/* 사진 영역 + 막대 */}
{displayedImages.length > 0 && (
  <>
    {/* 사진 영역 */}
    <div
      className="flex justify-center gap-2 mb-2 overflow-hidden"
      style={{ maxHeight: "35%", flexShrink: 0 }}
    >
      {displayedImages.map((src) => (
        <img
          key={src}
          src={src}
          alt={src}
          className="object-contain cursor-zoom-in"
          style={{
            maxHeight: "100%",
            width: `${100 / displayedImages.length}%`,
            aspectRatio: "1",
            borderRadius: "0px",
          }}
          onClick={() => setZoomedImage(src)} // 클릭 시 확대
        />
      ))}
    </div>

    {/* 사진 아래 막대 */}
    <svg
      viewBox="0 0 400 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-[0.3vw] mb-2"
    >
      <path d="M0 0H400V2H0V0Z" fill="#33FF55" />
    </svg>
  </>
)}

<AnimatePresence>
  {zoomedImage && (
    <motion.div
      className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setZoomedImage(null)}
    >
      <motion.img
        src={zoomedImage}
        alt="zoomed"
        className="border-4 border-[#33FF55] object-contain"
        style={{
          width: "50%",   // 부모 컨테이너 기준 0.5배
          height: "auto", // 세로 비율 유지
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      />
    </motion.div>
  )}
</AnimatePresence>

            {/* 좋아요 / 조회 등 기존 내용 */}
            <div className="flex justify-end w-full gap-4 mb-2">
              {/* 조회수 박스 */}
              <div className="relative w-[85px] h-[40px] cursor-pointer pointer-events-none">
                <div className="border-2 border-[#33FF55] bg-[#111] w-full h-full absolute top-0 left-0"></div>
                <p className="text-[rgba(255,255,255,1)] font-seoulAlrim text-[1rem] font-medium absolute top-1/2 left-[10px] -translate-y-1/2">
                  456
                </p>
                <p className="text-[#33FF55] font-seoulAlrim text-[1rem] font-medium absolute top-1/2 right-[10px] -translate-y-1/2">
                  조회
                </p>
              </div>
              {/* 좋아요 박스 */}
              <div className="relative w-[100px] h-[40px] cursor-pointer pointer-events-none">
                <div className="border-2 border-[#33FF55] bg-[#111] w-full h-full absolute top-0 left-0"></div>
                <p className="text-[rgba(255,255,255,1)] font-seoulAlrim text-[1rem] font-medium absolute top-1/2 left-[10px] -translate-y-1/2">
                  123
                </p>
                <p className="text-[#33FF55] font-seoulAlrim text-[1rem] font-medium absolute top-1/2 right-[10px] -translate-y-1/2">
                  좋아요
                </p>
              </div>
            </div>

            <svg
              viewBox="0 0 400 2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-[0.3vw] mb-2"
            >
              <path d="M0 0H400V2H0V0Z" fill="#33FF55" />
            </svg>

            {/* 본문 */}
            <div className="flex-1 overflow-y-auto mt-0">
              <p className="whitespace-pre-wrap text-white text-[0.8vw]">
                여기 본문 내용이 들어갑니다.
              </p>
            </div>
          </motion.div>

        </>
      )}
    </AnimatePresence>
  );
};

export default PostModal;
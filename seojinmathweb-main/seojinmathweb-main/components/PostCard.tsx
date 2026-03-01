import { FC } from "react";

interface PostCardProps {
  title: string;
  description: string;
  author: string;
  onClick?: () => void; // 클릭 이벤트 optional 추가
}

const PostCard: FC<PostCardProps> = ({ title, description, author, onClick }) => {
  return (
<div
  className="relative w-full aspect-[2.5/1] border-2 border-[rgba(51,255,85,0.5)] bg-black/15  cursor-pointer" //backdrop-blur-md 블러 넣을까? (렉오짐)
  onClick={onClick}
>

      {/* 왼쪽: 정사각형 사진/박스 (비율 위치, 비율 크기) */}
      <div
        className="absolute border border-[rgba(255,255,255,0.5)] bg-[#171717]"
        style={{
          top: "50%",        // 세로 중심 (0~100%)
          left: "20%",       // 가로 위치 (0~100%)
          width: "32%",      // 컨테이너 대비 너비 비율
          aspectRatio: "1",  // 항상 정사각형
          transform: "translate(-50%, -50%)"
        }}
      ></div>

      {/* 오른쪽 텍스트 영역 */}
      <div
        className="absolute flex flex-col"
        style={{
          top: "10%",         // 컨테이너 상단 기준
          left: "40%",        // 왼쪽 위치 비율
          width: "55%",       // 너비 비율
          height: "80%",      // 높이 비율
        }}
      >
        {/* 쓸데없는 막대 (기준) */}
        <svg
          viewBox="0 0 250 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute w-[100%] h-[0.3vw]"
          style={{
            top: "25%",         // 컨테이너 대비 위치
          }}
        >
          <path d="M0 0H250V2H0V0Z" fill="#33FF55" />
        </svg>

        {/* 타이틀: 막대 위쪽 */}
        <p
          className="text-[#33FF55] font-seoulAlrim font-medium"
          style={{
            fontSize: "0.9vw",
            position: "absolute",
            bottom: "77%",     // 막대 위쪽에 위치
            left: "0",
          }}
        >
          {title}
        </p>

        {/* 설명: 막대 아래쪽 */}
        <p
          className="text-[#33FF55] font-seoulAlrim font-medium"
          style={{
            fontSize: "0.65vw",
            position: "absolute",
            top: "32%",        // 막대 바로 아래
            left: "0",
          }}
        >
          {description}
        </p>

        {/* 작성자: 설명 아래쪽, 오른쪽 */}
        <p
          className="text-[rgba(255,255,255,0.6)] font-seoulAlrim"
          style={{
            fontSize: "0.45vw",
            position: "absolute",
            bottom: "-5%",        // 설명 아래쪽 비율
            right: "-2%",
          }}
        >
          작성자 : {author}
        </p>
      </div>
    </div>
  );
};

export default PostCard;
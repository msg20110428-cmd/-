/***
 * 포스트 데이터 **목록** 타입
 */
export type PostsType = {
  title: string,
  description: string,
  author: string,
  grade: string,
  date: string,
  likes: number,
  images: string[]
}[]

/***
 * 모바일 환경을 위한 저사양 레이아웃
 */
export default async function Simple({
  posts,
}: {
  posts: PostsType,
}) {
  return (
    <div>
      {JSON.stringify(posts)}
    </div>
  );
}
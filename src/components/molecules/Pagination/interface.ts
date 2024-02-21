/* eslint-disable no-unused-vars */
export interface PaginationProps {
  //totalCount: number; // 리스트의 아이템 총 갯수
  totalPage: number; // 리스트 페이지 총 갯수
  currentPage: number; // 현재 페이지
  //viewCount: number; // 보여지는 아이템 갯수,
  // onClickPrev: () => void; // 이전 버튼 클릭
  // onClickNext: () => void; // 다음 버튼 클릭
  onClickPage: (page: number) => void; // page 아이템 클릭 이벤트
}

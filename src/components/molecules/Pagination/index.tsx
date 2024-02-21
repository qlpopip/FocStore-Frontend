import React, { useEffect, useState } from "react";
import { Icon } from "components/atoms";
// import { RootState } from '@/shared/redux';
import { PaginationProps } from "./interface";
import "./index.scss"
/**

A pagination component that displays a list of pages and allows the user to navigate through them.
@param {Object} props - The component props.
@param {number} props.currentPage - The current active page.
@param {number} props.totalPage - The total number of pages.
@param {function} props.onClickPage - The callback function to handle clicking on a page.
@returns {JSX.Element} - The PaginationComp component.
*/

const PaginationComp: React.FC<PaginationProps> = (props) => {

  const {  //totalCount,
    currentPage,
    totalPage,
    //viewCount,
    // onClickPrev,
    // onClickNext,
    onClickPage } = props
  // const { isMobile } = useSelector((state: RootState) => state.common);
  const [cutCnt, setCutCnt] = useState(0);
  const maxPageCnt = 1;
  const [pageList, setPageList] = useState<number[]>([]);

  function handleClickPrevBtn() {
    if (currentPage > 1 && currentPage > maxPageCnt) {
      onClickPage(maxPageCnt * cutCnt);
      setCutCnt(cutCnt - 1);
    }
  }

  // responsive pagination list
  useEffect(() => {
    if (totalPage) {
      const pageList = [...Array(totalPage)]
        .map((item, idx) => idx + 1)
        .slice(maxPageCnt * cutCnt, maxPageCnt * (cutCnt + 1));
      setPageList(pageList);
      setCutCnt(Math.ceil(currentPage / maxPageCnt - 1));
    }
  }, [maxPageCnt, cutCnt, totalPage, currentPage]);

  function handleClickNextBtn() {
    if (
      currentPage !== totalPage &&
      pageList[pageList.length - 1] < totalPage
    ) {
      setCutCnt(cutCnt + 1);
      onClickPage(maxPageCnt * (cutCnt + 1) + 1);
    }
  }
  return (
    <div id='pagination'>
      <div className='pagination'>
        <ul className='pagination-list'>
          <li className={`pagination-item ${pageList[0] === 1 ? "disabled" : "icon"}`} onClick={handleClickPrevBtn}>
            <Icon name='arrow-left' className='pagination-arrow' />
          </li>
          {totalPage - 1 >= pageList[pageList.length - 1] ? "" : <>
            <li className={"pagination-item"} onClick={() =>
              onClickPage(pageList[pageList.length - 1] - pageList.length)}>
              {String(pageList[pageList.length - 1] - pageList.length)}</li>
            {totalPage - 1 ? "" : <li className={"pagination-item dot"}>  …  </li>}   </>}
          {pageList.map((item, idx) => (
            <li
              className={`pagination-item ${currentPage === item ? "on" : ""}`}
              key={idx}
              onClick={() => onClickPage(item)}>
              {item}
            </li>
          ))}
          {totalPage - 1 >= pageList[pageList.length - 1] ?
            <>
              {totalPage - 2 >= pageList[pageList.length - 1] ? <li className={"pagination-item dot"}>  …  </li> : ""}
              <li className={"pagination-item"} onClick={() => onClickPage(totalPage)}> {totalPage}</li>
            </> : ""}
          <li className={`pagination-item ${pageList[0] === totalPage ? "disabled" : "icon"}`}
            onClick={handleClickNextBtn}>
            <Icon name='arrow-right' className='pagination-arrow' />
          </li>
        </ul>
      </div>
    </div>
  );
}
export default PaginationComp
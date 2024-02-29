import React, { useEffect, useState } from "react";
import { Image } from "components/atoms";
import { PaginationProps } from "./interface";
import "./index.scss"
import IconsFile from "assets/icons";
/**

A pagination component that displays a list of pages and allows the user to navigate through them.
@param {Object} props - The component props.
@param {number} props.currentPage - The current active page.
@param {number} props.totalPage - The total number of pages.
@param {function} props.onClickPage - The callback function to handle clicking on a page.
@returns {JSX.Element} - The PaginationComp component.
*/

const PaginationComp: React.FC<PaginationProps> = (props) => {
  const {
    currentPage,
    totalPage,
    onClickPage } = props

  const array1ToTotalPage = Array.from({ length: totalPage }, (_, index) => index + 1);
  const [cutCnt, setCutCnt] = useState(0);
  const maxPageCnt = 1;
  const [pageList, setPageList] = useState<number[]>([]);
  function handleClickPrevBtn() {
    if (currentPage > 1 && currentPage > maxPageCnt) {
      onClickPage(maxPageCnt * cutCnt);
      setCutCnt(cutCnt - 1);
    }
  }
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
            <Image src={IconsFile.ArrowOrange} className='pagination-arrow' />
          </li>
          {array1ToTotalPage.map((item, idx) => (
            <li
              className={`pagination-item ${currentPage === item ? "on" : ""}`}
              key={idx}
              onClick={() => onClickPage(item)}>
              {item}
            </li>
          ))}
          <li className={`pagination-item ${pageList[0] === totalPage ? "disabled" : "icon"}`}
            onClick={handleClickNextBtn}>
            <Image src={IconsFile.ArrowOrange} className='pagination-arrow right' />
          </li>
        </ul>
      </div>
    </div>
  );
}
export default PaginationComp
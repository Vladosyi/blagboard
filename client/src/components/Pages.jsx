import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Pagination } from "react-bootstrap";

const Pages = observer(() => {
  const { device } = useContext(Context);
  // TODO: у тебя чтото похожее гдето уже писалось, и лучше бы тогда вынести в какую-то функцию или хук
  const pageCount = Math.ceil(device.totalCount / device.limit);
  const pages = [];

  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }
  // вот до сюда

  return (
    <div className="pagination">
      <Pagination className="mt-3">
        {pages.map((page) => (
          <Pagination.Item 
          className="pagination__item"
            key={page}
            active={device.page === page}
            onClick={() => device.setPage(page)}
          >
            <div className="paginations">{page}</div>
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
});

export default Pages;

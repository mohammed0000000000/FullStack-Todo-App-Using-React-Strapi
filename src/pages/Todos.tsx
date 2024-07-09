import TodoSkeleton from "../components/TodoSkeleton";
import useCustomQuery from "../hooks/useCustomQuery";
import Paginator from "../components/ui/Pageinator";
import { ChangeEvent, useState } from "react";

interface ITodo {
  id: number;
  attributes: {
    [key: string]: string;
  };
}

const TodosPage = () => {
  // Pagination

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [sortedBy, setSortedBy] = useState<string>("Latest");

  const onClickPrev = () => {
    setPage((prev) => prev - 1);
  };
  const onClickNext = () => {
    setPage((prev) => prev + 1);
  };

  const storageKey = "loggedInUser";
  const userData = JSON.parse(`${localStorage.getItem(storageKey)}`);
  const { isLoading, data, isFetching } = useCustomQuery({
    queryKey: [`todo-page-${page}`, `${pageSize}`, ` ${sortedBy}`],
    url: `/todos?pagination[pageSize]=${pageSize}&pagination[page]=${page}&sort=createdAt:${sortedBy}`,
    config: {
      headers: {
        Authorization: `Bearer ${userData.jwt}`,
      },
    },
  });
  if (isLoading) {
    return (
      <div className="max-w-md mx-auto shadow animate-pulse" role="status">
        {Array.from({ length: 3 }, (_, idx) => (
          <TodoSkeleton key={idx}></TodoSkeleton>
        ))}
      </div>
    );
  }
  const {
    meta: {
      pagination: { pageCount, total },
    },
  } = data;
  return (
    <>
      <div className="flex flex-col mx-auto max-w-md text-center space-y-3">
        <div className="flex justify-end space-x-2">
          <select
            name="sortedBy"
            className="border border-gray-500 py-2 px-4 rounded-lg"
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              setSortedBy(event.target.value);
            }}
            value={sortedBy}
          >
            <option value="" disabled selected>
              Sort By
            </option>
            <option value="asc">Oldest</option>
            <option value="desc">Latest </option>
          </select>
          <select
            name="pageSize"
            id=""
            className="border border-gray-500 py-1 px-4 rounded-lg"
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              setPageSize(Number(event.target.value))
            }
          >
            <option value={pageSize} disabled selected className="text-black">
              Page Size
            </option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        {data?.data?.length == 0 ? (
          <h3 className="text-indigo-600 font-bold text-3xl">
            NO TODOS YET...!
          </h3>
        ) : (
          data?.data?.map((todo: ITodo) => {
            // console.log(todo, todo["attribute"]);
            return (
              <div
                className="flex flex-row items-center justify-between py-2 px-3 rounded-lg even:bg-gray-200"
                key={todo.id}
              >
                <p className="font-semibold max-w-full text-lg text-nowrap text-ellipsis overflow-hidden hover:text-wrap">
                  {todo.attributes.title}
                </p>
              </div>
            );
          })
        )}
        <Paginator
          page={page}
          pageCount={pageCount}
          onClickPrev={onClickPrev}
          isLoading={isLoading || isFetching}
          total={total}
          onClickNext={onClickNext}
        ></Paginator>
      </div>
    </>
  );
};

export default TodosPage;

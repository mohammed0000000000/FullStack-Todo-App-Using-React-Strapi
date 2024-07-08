const TodoSkeleton = () => {
  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <div className="h-3 bg-gray-300 rounded-md dark:bg-gray-600 w-2/6 mb-2.5"></div>
        <div className="flex items-center space-x-2">
          <div className="h-9 bg-gray-300 rounded-md dark:bg-gray-700 w-20 mb-2"></div>
          <div className="h-9 bg-gray-300 rounded-md dark:bg-gray-700 w-20 mb-2"></div>
        </div>
      </div>
    </>
  );
};

export default TodoSkeleton;

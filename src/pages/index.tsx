import { useEffect, useState } from "react";
import axiosInstance from "../config/axios.config";
import { ITodo } from "../interfaces";
import Button from "../components/ui/Button";

const storageKey = "loggedInUser";
const userData = JSON.parse(`${localStorage.getItem(storageKey)}`);

const HomePage = () => {
  const [todoList, setTodos] = useState<ITodo[]>([]);
  useEffect(() => {
    try {
      axiosInstance
        .get("/users/me?populate=todos", {
          headers: { Authorization: `Bearer ${userData.jwt}` },
        })
        .then((response) => {
          console.log(response.data.todos);
          setTodos(response.data.todos);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Finally");
    }
  }, [userData.jwt]);

  // Render Todos
  console.log(userData);
  const renderTodos = todoList.map((todo) => {
    return (
      <div
        key={todo.id}
        className="flex flex-row items-center justify-between space-y-2 p-2 rounded-md odd:bg-gray-200"
      >
        <p className="font-semibold max-w-full">{todo.title}</p>
        <div className="flex space-x-3 items-center justify-center max-w-full">
          <Button size={"sm"}>Edit</Button>
          <Button variant={"danger"} size={"sm"}>
            Delete
          </Button>
        </div>
      </div>
    );
  });
  return (
    <>
      <div className="flex flex-col mx-auto max-w-md">{renderTodos}</div>
    </>
  );
};

export default HomePage;

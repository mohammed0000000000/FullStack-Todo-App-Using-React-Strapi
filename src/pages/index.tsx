// import { useEffect, useState } from "react";
import axiosInstance from "../config/axios.config";
// import { ITodo } from "../interfaces";
import Button from "../components/ui/Button";
import { useQuery } from "@tanstack/react-query";
import { ITodo } from "../interfaces";

const HomePage = () => {
  const storageKey = "loggedInUser";
  const userData = JSON.parse(`${localStorage.getItem(storageKey)}`);

  const { isLoading, data } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/users/me?populate=todos", {
        headers: { Authorization: `Bearer ${userData.jwt}` },
      });
      return data;
    },
  });

  console.log(data);

  /*
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
*/ // Render Todos
  // console.log(userData);
  if (isLoading) return <h3 className="">Loading...</h3>;
  // if (error) return <h3 className="">Something Went Wrong Try Again...</h3>;
  return (
    <>
      <div className="flex flex-col mx-auto max-w-md text-center">
        {data.todos.length == 0 ? (
          <h3 className="text-indigo-600 font-bold text-3xl">
            NO TODOS YET...!
          </h3>
        ) : (
          data.todos.map((todo: ITodo) => {
            return (
              <div
                className="flex flex-row items-center justify-between space-y-2 p-2 rounded-md odd:bg-gray-200"
                key={todo.id}
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
          })
        )}
      </div>
    </>
  );
};

export default HomePage;

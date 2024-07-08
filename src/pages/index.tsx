import { ChangeEvent, FormEvent, useState } from "react";
// import { ITodo } from "../interfaces";
import Button from "../components/ui/Button";
import { ITodo } from "../interfaces";
import useCustomQuery from "../hooks/useCustomQuery";
import Model from "../components/ui/Model";
import Input from "../components/ui/Input";
import axiosInstance from "../config/axios.config";
import Textarea from "../components/ui/Textarea";
import toast from "react-hot-toast";
import TodoSkeleton from "../components/TodoSkeleton";

const HomePage = () => {
  const storageKey = "loggedInUser";
  const userData = JSON.parse(`${localStorage.getItem(storageKey)}`);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [todoData, setTodoData] = useState<ITodo>({
    id: 0,
    title: "",
    description: "",
  });
  const [createTodoData, setCreateTodoData] = useState({
    title: "",
    description: "",
  });
  const [updateTodoData, setUpdateTodoData] = useState(false);
  const [isConfirmModelOpen, setIConfirmModelOpen] = useState(false);
  const [queryVersion, setQueryVersion] = useState<number>(1);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const closeConformModel = () => setIConfirmModelOpen(false);
  const [isOpenToCreateTodo, setOPenToCreateTodo] = useState(false);
  // Fetching & Re-Fetching Todo-S
  const { isLoading, data } = useCustomQuery({
    queryKey: ["todoList", `${queryVersion}`],
    url: "/users/me?populate=usertodos",
    config: {
      headers: {
        Authorization: `Bearer ${userData.jwt}`,
      },
    },
  });
  const closeModel = () => {
    setTodoData((prev) => {
      return {
        id: prev.id,
        title: "",
        description: "",
      };
    });
    setIsOpen(false);
  };
  const closeModelToCreateTodo = () => setOPenToCreateTodo(false);

  // Create a new Todo
  const [isLoadingCreateTodo, setLoadingCreateTodo] = useState(false);
  const createTodoHandle = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoadingCreateTodo(true);
    console.log(typeof userData.user.id);
    console.log(userData.user.id);
    const { title, description } = createTodoData;
    try {
      const response = await axiosInstance.post(
        "/todos",
        {
          data: {
            title,
            description,
            user: [userData.user.id],
          },
        },
        {
          headers: {
            Authorization: `Bearer ${userData.jwt}`,
          },
        }
      );
      console.log(response);
      if (response.status == 200) {
        toast.success("Created successfully", {
          position: "bottom-center",
          duration: 1500,
          style: {
            background: "#000",
            color: "#fff",
            width: "fit-content",
          },
        });
        setQueryVersion((prev) => prev + 1);
        setLoadingCreateTodo(false);
        closeModelToCreateTodo();
        setCreateTodoData((prev) => ({ ...prev, title: "", description: "" }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  //
  const submitFormHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { title, description } = todoData;
    setUpdateTodoData(true);
    try {
      const response = await axiosInstance.put(
        `/todos/${todoData.id}`,
        {
          data: {
            title,
            description,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${userData.jwt}`,
          },
        }
      );
      if (response.status == 200) {
        toast.success("Updated successfully", {
          position: "bottom-center",
          duration: 1500,
          style: {
            background: "#000",
            color: "#fff",
            width: "fit-content",
          },
        });
        setQueryVersion((prev) => prev + 1);
        closeModel();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setUpdateTodoData(false);
    }
  };
  // OnChangeHandler
  const onChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setTodoData({ ...todoData, [name]: value });
    setCreateTodoData({ ...createTodoData, [name]: value });
  };

  // OnDeleteHandler
  const onDeleteHandler = async () => {
    setIsDeleteLoading(true);
    try {
      const response = await axiosInstance.delete(`/todos/${todoData.id}`, {
        headers: {
          Authorization: `Bearer ${userData.jwt}`,
        },
      });
      if (response.status == 200) {
        toast.success("Deleted successfully", {
          position: "bottom-center",
          duration: 1500,
          style: {
            background: "#000",
            color: "#fff",
            width: "fit-content",
          },
        });
        setIsDeleteLoading(false);
        setQueryVersion((prev) => prev + 1);
        closeConformModel();
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto shadow animate-pulse" role="status">
        {Array.from({ length: 3 }, (_, idx) => (
          <TodoSkeleton key={idx}></TodoSkeleton>
        ))}
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-col mx-auto max-w-md text-center space-y-3">
        <div>
          <Button
            className="w-fit mx-auto my-10 hover:bg-black duration-300 animate-pulse"
            onClick={() => setOPenToCreateTodo(true)}
          >
            Post new Todo
          </Button>
        </div>
        {data?.usertodos?.length == 0 ? (
          <h3 className="text-indigo-600 font-bold text-3xl">
            NO TODOS YET...!
          </h3>
        ) : (
          data?.usertodos?.map((todo: ITodo) => {
            return (
              <div
                className="flex flex-row items-center justify-between py-2 px-3 rounded-lg even:bg-gray-200"
                key={todo.id}
              >
                <p className="font-semibold max-w-full text-lg">{todo.title}</p>
                <div className="flex space-x-3 items-center justify-center max-w-full">
                  <Button
                    size={"sm"}
                    className="hover:bg-black"
                    onClick={() => {
                      setIsOpen(true);
                      setTodoData({
                        id: todo.id,
                        title: todo.title,
                        description: todo.description,
                      });
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant={"danger"}
                    size={"sm"}
                    className="hover:bg-red-500"
                    onClick={() => {
                      setIConfirmModelOpen(true);
                      setTodoData({ ...todo });
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            );
          })
        )}

        {/* Model For Create TODO */}

        <Model
          isOpen={isOpenToCreateTodo}
          closeModal={closeModelToCreateTodo}
          title="CREATE TODO"
        >
          <form
            className="flex flex-col items-center space-y-3"
            onSubmit={createTodoHandle}
          >
            <div className="w-full">
              <label htmlFor="title" className="font-semibold text-lg">
                Title
              </label>
              <Input id="title" name="title" onChange={onChangeHandler}></Input>
            </div>
            <div className="w-full text-lg">
              <label htmlFor="description" className="font-semibold">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                onChange={onChangeHandler}
              ></Textarea>
            </div>
            <div className="w-full flex flex-row items-center justify-between space-x-5">
              <Button
                size={"default"}
                fullWidth={true}
                className="hover:bg-indigo-black bg-indigo-600"
                isLoading={isLoadingCreateTodo}
              >
                Create
              </Button>
              <Button
                variant={"danger"}
                size={"default"}
                fullWidth={true}
                className="hover:bg-red-500"
                onClick={closeModelToCreateTodo}
                type="button"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Model>

        {/* Model For Edit TODO */}
        <Model isOpen={isOpen} closeModal={closeModel} title="EDIT TODO">
          <form
            className="flex flex-col items-center space-y-3"
            onSubmit={submitFormHandler}
          >
            <div className="w-full">
              <label htmlFor="id" className="font-semibold">
                ID
              </label>
              <Input
                value={todoData.id}
                name="id"
                width={"full"}
                disabled
                id="id"
              ></Input>
            </div>
            <div className="w-full">
              <label htmlFor="title" className="font-semibold">
                Title
              </label>
              <Input
                value={todoData.title}
                id="title"
                name="title"
                onChange={onChangeHandler}
              ></Input>
            </div>
            <div className="w-full">
              <label htmlFor="description" className="font-semibold">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                onChange={onChangeHandler}
              >
                {todoData.description}
              </Textarea>
            </div>
            <div className="w-full flex flex-row items-center justify-between space-x-5">
              <Button
                size={"default"}
                fullWidth={true}
                className="hover:bg-black bg-indigo-600"
                isLoading={updateTodoData}
              >
                Update
              </Button>
              <Button
                variant={"danger"}
                size={"default"}
                fullWidth={true}
                className="hover:bg-red-500"
                onClick={closeModel}
                type="button"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Model>

        {/* Model For Delete Todo */}
        <Model
          isOpen={isConfirmModelOpen}
          closeModal={closeConformModel}
          title="DELETE TODO"
        >
          <p className="text-center my-7 text-xl p-2">
            Click on Delete to Remove Todo or Cancel
          </p>
          <div className="flex flex-row space-x-3">
            <Button
              variant={"danger"}
              size={"default"}
              fullWidth={true}
              className="hover:bg-red-600"
              onClick={onDeleteHandler}
              isLoading={isDeleteLoading}
            >
              Yes, Remove
            </Button>
            <Button
              variant={"cancel"}
              size={"default"}
              fullWidth={true}
              className="hover:bg-gray-400"
              onClick={() => closeConformModel()}
              type="button"
            >
              Cancel
            </Button>
          </div>
        </Model>
      </div>
    </>
  );
};

export default HomePage;

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

  */

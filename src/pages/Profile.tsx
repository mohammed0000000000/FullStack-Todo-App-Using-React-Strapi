import Input from "../components/ui/Input";
import useCustomQuery from "../hooks/useCustomQuery";

const ProfilePage = () => {
  const storageKey = "loggedInUser";
  const userData = JSON.parse(`${localStorage.getItem(storageKey)}`);
  const { data, isLoading } = useCustomQuery({
    url: "/users/me?populate=usertodos",
    queryKey: [`${userData.jwt}`],
    config: {
      headers: { Authorization: `Bearer ${userData.jwt}` },
    },
  });

  if (isLoading) {
    return <h1 className="mx-auto text-indigo-600 text-3xl">Loading...</h1>;
  }
  console.log(data);
  return (
    <div className="max-w-lg mx-auto p-3 shadow-xl border-2  border-gray-600">
      <div className="my-2 px-1 text-lg font-bold">
        <label htmlFor="id">ID</label>
        <Input disabled id="id" value={data.id}></Input>
      </div>
      <div className="my-2 px-1 text-lg font-bold">
        <label htmlFor="username">Username</label>
        <Input disabled id="username" value={data.username}></Input>
      </div>
      <div className="my-2 px-1 text-lg font-bold">
        <label htmlFor="email">Email</label>
        <Input disabled type="email" value={data.email}></Input>
      </div>
      <div className="my-2 px-1 text-lg font-bold ">
        You have {data.usertodos.length} Todo
      </div>
    </div>
  );
};

export default ProfilePage;

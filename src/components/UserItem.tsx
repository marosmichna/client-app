import UserItemSmall from "./UserItemSmall";

const UserItem = () => {
  return (
    <div className="flex items-center justify-center gap-2 border rounded-2xl p-4 shadow-md">
        <UserItemSmall />
        <div>
            <h1 className="font-bold">User Name</h1>
            <p>useremail@gmail.com</p>
        </div>
    </div>
  )
}

export default UserItem;


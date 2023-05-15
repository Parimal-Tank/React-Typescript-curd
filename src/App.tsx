import { useState } from 'react';
import './App.css';
import AddUser from './components/AddUser';
import { IBaseUser, IUser } from './components/Interface';
import UserTable from './components/UserTable';
import EditUser from './components/EditUser';


const defaultUsers: Array<IUser> = [
  { firstName: "Parimal", lastName: "Tank", id: 1, password: 'parimal' , email: "parimaltank2001@gmail.com" },
];

const initCurrentUser: IUser = { firstName: "", lastName: "", password:"", id: 0 , email: ""};

function App() {

  const [ users , setUsers ] = useState(defaultUsers);
  const [ editUser , setEditUser ] = useState(initCurrentUser);
  const [ editing , setEdit ] = useState(false);

  const onAddUser = (newUser: IBaseUser) => {
       const id = users.length + 1;
       setUsers([ ...users , {  ...newUser , id } ]);
  }

  const onCurrentUser = (user: IUser) => {
     setEditUser(user);
     setEdit(true);
  }

  const onUpdateUser = (id: number , newUser: IUser ) => {
      setEdit(false); 
      console.log('this is new user',newUser)
      setUsers(users.map(i => (i.id === id ? newUser : i)));
  }

  const onDeleteUser = (currentUser: IUser) => {
     setUsers(users.filter(i => i.id !== currentUser.id));
  }

  return (
    <div className="App">
      <h3 className='my-5'>User Registration Form</h3>

      <div className="user-flex-wrapper">
        {editing ? (
          <>  
           <h3 className='my-5'>Edit User</h3>
          <EditUser
            user={editUser}
            onUpdateUser={onUpdateUser}
            setEdit={setEdit}
          />
          </>
        ) : (
          <AddUser onAddUser={onAddUser} />
        )}
         <h1 className='mt-5'>View Users</h1>
        <UserTable
          users={users}
          onEdit={onCurrentUser}
          onDelete={onDeleteUser}
        />
      </div>
    </div>
  );
}

export default App;
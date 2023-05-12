import React, { useEffect, useState } from 'react'
import { IUser } from './Interface'

interface IProps {
   user : IUser;
   onUpdateUser : (id: number , user: IUser) => void;
   setEdit : (bool: boolean) => void;
}

const EditUser = (props: IProps) => {

  const [ user , setUser ] = useState(props.user);
  
  useEffect(() => setUser(props.user) , [props]);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();

     props.onUpdateUser(user.id , user);
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
     const { name , value } = e.target;
     setUser({ ...user , [name] : value });
  }


  return (
    <div>
       <h1>Edit User</h1>

       <form onSubmit={onFormSubmit}>
             <label>FirstName</label>
             <input
                type="text"
                placeholder="please input name"
                name="firstName"
                value={user.firstName}
                onChange={onInputChange}
              />
             <label>LastName</label>
             <input
                type="text"
                placeholder="please input name"
                name="lastName"
                value={user.lastName}
                onChange={onInputChange}
              />
             <label>Email</label>
             <input
                type="text"
                placeholder="please input name"
                name="email"
                value={user.email}
                onChange={onInputChange}
              />
             <label>FirstName</label>
             <input
                type="text"
                placeholder="please input name"
                name="password"
                value={user.password}
                onChange={onInputChange}
              />

            <div className="form-row">
              <button>Update</button>
              <button onClick={() => props.setEdit(false)}>Cancel</button>
            </div>
            
       </form>
    </div>
  )
}

export default EditUser

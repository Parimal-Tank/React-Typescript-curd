import React from 'react'
import {IUser} from './Interface'

interface Iprops { 
  users: Array<IUser>;
  onEdit: (user: IUser) => void;
  onDelete: (user: IUser) => void;
}

const UserTable: React.FunctionComponent<Iprops> = (props) => {

  return (
    <div>
         <h1 className='mt-5'>View Users</h1>

         <div className='d-flex justify-content-center align-items-center'>
         <table className='table my-5'>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Actions</th>
            </tr>
  
         <tbody>
         {props.users.length > 0 ? (
            props.users.map(i => (
              <tr key={i.id}>
                <td>{i["firstName"]}</td>
                <td>{i["lastName"]}</td>
                <td>{i["email"]}</td>
                <td>{i["password"]}</td>
                <td>
                  <button className='btn btn-primary mx-2' onClick={() => props.onEdit(i)}>Edit</button>
                  <button className='btn btn-danger' onClick={() => props.onDelete(i)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No any users found!</td>
            </tr>
          )}
        </tbody>
        </table>

         </div>
    </div>
  )
}

export default UserTable

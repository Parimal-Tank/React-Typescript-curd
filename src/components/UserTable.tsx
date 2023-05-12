import React from 'react'
import {IUser} from './Interface'

interface Iprops { 
  users: Array<IUser>;
  onEdit: (user: IUser) => void;
  onDelete: (user: IUser) => void;
}

const UserTable: React.FunctionComponent<Iprops> = (props) => {

  console.log('This is User Data',props.users);

  return (
    <div>
         <h1>View Users</h1>
         <table>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>profession</th>
                <th>Action</th>
              </tr>
         </table>
         <tbody>
         {props.users.length > 0 ? (
            props.users.map(i => (
              <tr key={i.id}>
                <td>{i["firstName"]}</td>
                <td>{i["lastName"]}</td>
                <td>{i["email"]}</td>
                <td>{i["password"]}</td>
                <td>
                  <button onClick={() => props.onEdit(i)}>edit</button>
                  <button onClick={() => props.onDelete(i)}>delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>no users</td>
            </tr>
          )}
        </tbody>
    </div>
  )
}

export default UserTable

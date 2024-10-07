import React from 'react';
import DeleteUser from './DeleteUser';
import EditUser from './EditUser';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
const Table: React.FC = () => {
    // MTF-smart-security

    const users = useSelector((state: RootState) => state.users.users);
    return (
    
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b text-center">List</th> 
                        <th className="py-2 px-4 border-b text-center">Role</th> 
                        <th className="py-2 px-4 border-b text-center">E-mail</th> 
                        <th className="py-2 px-4 border-b text-center">Last name</th> 
                        <th className="py-2 px-4 border-b text-center">First name</th> 
                        <th className="py-2 px-4 border-b text-center">Action</th> 
                    </tr>
                </thead>
                <tbody>
                    {users.map((user:any) => (
                        <tr key={user.id}>
                            <td className="py-2 px-4 border-b text-center">{user.id}</td> 
                            <td className="py-2 px-4 border-b text-center">{user.role}</td> 
                            <td className="py-2 px-4 border-b text-center">{user.email}</td> 
                            <td className="py-2 px-4 border-b text-center">{user.lastName}</td> 
                            <td className="py-2 px-4 border-b text-center">{user.firstName}</td> 
                            <td className="flex gap-2 items-center justify-center py-2 px-4 border-b text-center"><DeleteUser/><EditUser/></td> 
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};



export default Table;



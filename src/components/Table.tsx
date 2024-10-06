import React, { useState, useEffect } from 'react';
import DeleteUser from './DeleteUser';
import EditUser from './EditUser';
import { fetchUsers } from '../server/app'; 

const Table: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);

    // Function to fetch users and update the state
    const loadUsers = async () => {
        const usersData = await fetchUsers();
        setUsers(usersData.data);
    };

    // Load users on component mount
    useEffect(() => {
        loadUsers();
    }, []);

    // Function to refresh users after an update
    const refreshUsers = () => {
        loadUsers();
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b text-center">List</th> 
                        <th className="py-2 px-4 border-b text-center">First name</th> 
                        <th className="py-2 px-4 border-b text-center">Last name</th> 
                        <th className="py-2 px-4 border-b text-center">E-mail</th> 
                        <th className="py-2 px-4 border-b text-center">Phone number</th> 
                        <th className="py-2 px-4 border-b text-center">Role</th>
                        <th className="py-2 px-4 border-b text-center">Action</th> 
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user, index) => (
                            <tr key={user._id}>
                                <td className="py-2 px-4 border-b text-center">{index + 1}</td> 
                                <td className="py-2 px-4 border-b text-center">{user.firstName}</td> 
                                <td className="py-2 px-4 border-b text-center">{user.lastName}</td> 
                                <td className="py-2 px-4 border-b text-center">{user.email}</td> 
                                <td className="py-2 px-4 border-b text-center">{user.phoneNumber}</td> 
                                <td className="py-2 px-4 border-b text-center">{user.role}</td> 
                                <td className="flex gap-2 items-center justify-center py-2 px-4 border-b text-center">
                                    <DeleteUser />
                                    <EditUser 
                                        id={user._id} 
                                        firstName={user.firstName} 
                                        lastName={user.lastName} 
                                        email={user.email} 
                                        role={user.role} 
                                        phoneNumber={user.phoneNumber}
                                        refreshUsers={refreshUsers} 
                                    />
                                </td> 
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="py-2 px-4 text-center">
                                loading users / not found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
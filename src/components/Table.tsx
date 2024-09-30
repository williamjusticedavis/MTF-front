import React from 'react';
import DeleteUser from './DeleteUser';
import EditUser from './EditUser';

const Table: React.FC = () => {
    const users = [
        {
            "id": 1,
            "role": "SuperAdmin",
            "email": "admin1@example.com",
            "lastname": "Cohen",
            "firstname": "Yossi"
        },
        {
            "id": 2,
            "role": "Admin",
            "email": "admin2@example.com",
            "lastname": "Levi",
            "firstname": "Sharon"
        },
        {
            "id": 3,
            "role": "User",
            "email": "user1@example.com",
            "lastname": "Pincus",
            "firstname": "Maya"
        },
        {
            "id": 4,
            "role": "User",
            "email": "user2@example.com",
            "lastname": "Barak",
            "firstname": "Adi"
        },
        {
            "id": 5,
            "role": "SuperAdmin",
            "email": "admin3@example.com",
            "lastname": "Shachar",
            "firstname": "Shachar"
        }
    ];


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
                        <th className="py-2 px-4 border-b text-center">Acction</th> 
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="py-2 px-4 border-b text-center">{user.id}</td> 
                            <td className="py-2 px-4 border-b text-center">{user.role}</td> 
                            <td className="py-2 px-4 border-b text-center">{user.email}</td> 
                            <td className="py-2 px-4 border-b text-center">{user.lastname}</td> 
                            <td className="py-2 px-4 border-b text-center">{user.firstname}</td> 
                            <td className="flex gap-2 items-center justify-center py-2 px-4 border-b text-center"><DeleteUser/><EditUser/></td> 
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};



export default Table;
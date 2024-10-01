import React, { useState, useEffect } from 'react';
import DeleteUser from './DeleteUser';
import EditUser from './EditUser';
import { fetchUsers } from '../server/app'; // ייבוא הפונקציה

const Table: React.FC = () => {
    // מצב עבור המשתמשים
    const [users, setUsers] = useState<any[]>([]);

    // שימוש ב- useEffect כדי למשוך את המשתמשים מהשרת כאשר הקומפוננטה נטענת
    useEffect(() => {
        const loadUsers = async () => {
            const usersData = await fetchUsers();
            setUsers(usersData); // עדכון מצב המשתמשים
        };

        loadUsers();
    }, []); // [] מבטיח שזה יקרה רק פעם אחת כשהקומפוננטה נטענת

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
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user.id}>
                                <td className="py-2 px-4 border-b text-center">{user.id}</td> 
                                <td className="py-2 px-4 border-b text-center">{user.role}</td> 
                                <td className="py-2 px-4 border-b text-center">{user.email}</td> 
                                <td className="py-2 px-4 border-b text-center">{user.lastname}</td> 
                                <td className="py-2 px-4 border-b text-center">{user.firstname}</td> 
                                <td className="flex gap-2 items-center justify-center py-2 px-4 border-b text-center">
                                    <DeleteUser />
                                    <EditUser />
                                </td> 
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="py-2 px-4 text-center">
                                No users found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;

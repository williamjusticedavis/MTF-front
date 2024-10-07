import React, { useState, useEffect } from 'react';
import DeleteUser from './DeleteUser';
import EditUser from './EditUser';
import { SyncLoader } from 'react-spinners';
import { fetchUsers } from '../server/app';

const Table: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // סטייט לניהול מצב טעינה
    const [error, setError] = useState<string | null>(null); // סטייט לניהול מצב שגיאות

    // Function to fetch users and update the state
    const loadUsers = async () => {
        setLoading(true); // מתחילים טעינה
        setError(null); // איפוס שגיאות בהתחלה

        try {
            const usersData = await fetchUsers();
            if (usersData.data && usersData.data.length > 0) {
                setUsers(usersData.data); // עדכון המשתמשים
            } else {
                setError('No users found.'); // אם אין משתמשים, שגיאה רלוונטית
            }
        } catch (err) {
            setError('Failed to fetch users. Please try again later.'); // במקרה של שגיאת שרת
        } finally {
            setLoading(false); // סיום מצב טעינה
        }
    };

    // Load users on component mount
    useEffect(() => {
        loadUsers();
    }, []);

    // Function to refresh users after an update
    const refreshUsers = () => {
        loadUsers();
    };

    // הצגת הודעת טעינה בזמן טעינת הנתונים
    if (loading) {
        return (
            <div className="flex items-center justify-center">
            <SyncLoader
                color="#87ab65"
                margin={6}
                size={30}
            />
        </div>
        );
    }

    // הצגת הודעת שגיאה במקרה של תקלה
    if (error) {
        return (
            <div className="text-center py-4 text-red-500">
                {error}
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white table-auto">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b text-center text-xs sm:text-base">List</th>
                        <th className="py-2 px-4 border-b text-center text-xs sm:text-base">First name</th>
                        <th className="py-2 px-4 border-b text-center text-xs sm:text-base">Last name</th>
                        <th className="py-2 px-4 border-b text-center text-xs sm:text-base">E-mail</th>
                        <th className="py-2 px-4 border-b text-center text-xs sm:text-base">Phone number</th>
                        <th className="py-2 px-4 border-b text-center text-xs sm:text-base">Role</th>
                        <th className="py-2 px-4 border-b text-center text-xs sm:text-base">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user, index) => (
                            <tr key={user._id}>
                                <td className="py-2 px-4 border-b text-center text-xs sm:text-base">{index + 1}</td>
                                <td className="py-2 px-4 border-b text-center text-xs sm:text-base truncate">{user.firstName}</td>
                                <td className="py-2 px-4 border-b text-center text-xs sm:text-base truncate">{user.lastName}</td>
                                <td className="py-2 px-4 border-b text-center text-xs sm:text-base truncate">{user.email}</td>
                                <td className="py-2 px-4 border-b text-center text-xs sm:text-base truncate">{user.phoneNumber}</td>
                                <td className="py-2 px-4 border-b text-center text-xs sm:text-base">{user.role}</td>
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
                            <td colSpan={7} className="py-2 px-4 text-center text-xs sm:text-base">
                                No users found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;

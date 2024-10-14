import React, { useEffect } from "react";
import { SyncLoader } from "react-spinners";

import EditSite from "./EditSite";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchUsers } from "../redux/usersSlice";
import DeleteSite from "./DeleteSite";


const TableSide: React.FC = () => {
    const test = () =>{
        console.log("test");
        
    }
    const dispatch: AppDispatch = useDispatch();

    const loading = useSelector((state: RootState) => state.users.loading);
    const error = useSelector((state: RootState) => state.users.error);

    // Sends a request to the server
    const loadUsers = () => {
        dispatch(fetchUsers());
    };

    // Runs the function so that it doesn't change much
    useEffect(() => {
        loadUsers();
    }, []);


    if (loading) {
        return (
            <div className="flex items-center justify-center">
                <SyncLoader color="#87ab65" margin={6} size={30} />
            </div>
        );
    }

    if (error) {
        return <div className="text-center py-4 text-red-500">{error}</div>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white table-auto">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b text-center text-xs sm:text-base">
                            Name
                        </th>
                        <th className="py-2 px-4 border-b text-center text-xs sm:text-base">
                            Status Side
                        </th>
                        <th className="py-2 px-4 border-b text-center text-xs sm:text-base">
                            loction
                        </th>
                        <th className="py-2 px-4 border-b text-center text-xs sm:text-base">
                            Space
                        </th>
                        <th className="py-2 px-4 border-b text-center text-xs sm:text-base">
                            National center
                        </th>
                        <th className="py-2 px-4 border-b text-center text-xs sm:text-base">
                            Role
                        </th>
                        <th className="py-2 px-4 border-b text-center text-xs sm:text-base">
                            permission
                        </th>
                        <th className="py-2 px-4 border-b text-center text-xs sm:text-base">
                            Status User
                        </th>
                        <th className="py-2 px-4 border-b text-center text-xs sm:text-base">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <td className="py-2 px-4 border-b text-center text-xs sm:text-base truncate"></td>
                    <td className="py-2 px-4 border-b text-center text-xs sm:text-base truncate"></td>
                    <td className="py-2 px-4 border-b text-center text-xs sm:text-base truncate"></td>
                    <td className="py-2 px-4 border-b text-center text-xs sm:text-base truncate"></td>
                    <td className="py-2 px-4 border-b text-center text-xs sm:text-base truncate"></td>
                    <td className="py-2 px-4 border-b text-center text-xs sm:text-base"></td>
                    <td className="py-2 px-4 border-b text-center text-xs sm:text-base truncate"></td>
                    <td className="py-2 px-4 border-b text-center text-xs sm:text-base truncate"></td>
                    <td className="flex gap-2 items-center justify-center py-2 px-4 border-b text-center">
                        <DeleteSite itemName={""} onDelete={test} onCancel={test}/>
                        <EditSite/>
                    </td>

                    <tr>
                        <td
                            colSpan={7}
                            className="py-2 px-4 text-center text-xs sm:text-base"
                        >
                            No side found.
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    );
};

export default TableSide;

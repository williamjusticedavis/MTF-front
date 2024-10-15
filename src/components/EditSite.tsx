import React from 'react';
import { MdModeEdit } from "react-icons/md";

const EditSite: React.FC = () => {
    return (
        <div>
            <button className="text-gray-500 transition-transform duration-200 transform hover:scale-150 hover:text-gray-800 focus:scale-150 focus:outline-none" >
                <MdModeEdit />
            </button>

        </div>
    );
};

export default EditSite;
import React from "react";
import { MdDelete } from "react-icons/md";

interface DeleteSite {
    itemName: string;
    onDelete: () => void;
    onCancel: () => void;
}

const DeleteSite: React.FC<DeleteSite> = ({
    itemName,
    onDelete,
    onCancel,
 }) => {
    return (
        <div>
            <button
                className='text-gray-500 transition-transform duration-200 transform hover:text-gray-800 hover:scale-150 focus:scale-150 focus:outline-none'
            >
                <MdDelete />
            </button>

            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
                <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 max-w-md w-full">
                    <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
                    <p className="mb-6 text-gray-400">
                        Are you sure you want to delete <span className="text-white">{itemName}</span>? This action cannot be undone.
                    </p>
                    <div className="flex justify-end space-x-4">
                        <button
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                            onClick={onDelete}
                        >
                            Confirm
                        </button>
                        <button
                            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteSite;

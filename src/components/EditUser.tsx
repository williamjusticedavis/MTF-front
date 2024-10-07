import React, { useState, useEffect } from 'react';
import { MdModeEdit } from "react-icons/md";
import { useForm } from 'react-hook-form';
import { updateUser } from '../server/app';  // Import the updateUser function
import { firstNameValidation, lastNameValidation, roleValidation, emailValidation, phoneValidation } from '../validation/userValidation';

interface UserDetails {
  id: string;  // The id prop to identify the user
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phoneNumber: string;
  refreshUsers: () => void; // Add refreshUsers as a prop
}

const EditUser: React.FC<UserDetails> = ({ id, firstName, lastName, email, role, phoneNumber, refreshUsers }) => {
  const [showModal, setShowModal] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<UserDetails>();

  // Set form values when the modal opens
  useEffect(() => {
    if (showModal) {
      setValue("firstName", firstName);
      setValue("lastName", lastName);
      setValue("email", email);
      setValue("role", role);
      setValue("phoneNumber", phoneNumber);
    }
  }, [showModal, setValue, firstName, lastName, email, role, phoneNumber]);

  const onSubmit = async (data: UserDetails) => {
    try {
      console.log('Editing user ID:', id); // Log the user ID being edited
      console.log('Data being sent:', data); // Log the data being sent to the server

      // Call the updateUser function, passing the user ID and updated data
      const response = await updateUser(id, data);
      console.log('Updated User Response:', response);

      // Refresh the users list after successful update
      refreshUsers();

      alert('User updated successfully');
      setShowModal(false);  // Close the modal after a successful update
    } catch (error) {
      console.error('Error updating user', error);
    }
  };

  const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value
      .replace(/^\s+/, '')
      .replace(/\s{2,}/g, ' ')
      .replace(/[^A-Za-z\s]/g, ''); 
  };

  const handleBlur = (fieldName: keyof UserDetails) => (e: React.FocusEvent<HTMLInputElement>) => {
    const trimmedValue = e.target.value.trim();
    setValue(fieldName, trimmedValue);
  };

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value
      .replace(/\D/g, '')  // Remove all non-numeric characters
      .slice(0, 10);  // Limit to 10 digits
  };

  return (
    <div>
      <button className="text-gray-500 transition-transform duration-200 transform hover:scale-150 hover:text-gray-800 focus:scale-150 focus:outline-none" onClick={() => setShowModal(true)}>
      <MdModeEdit />
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Edit User</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
              <div className="flex flex-col space-y-2">
                <label htmlFor="firstName" className="text-gray-600">First Name</label>
                <input
                  id="firstName"
                  {...register('firstName', firstNameValidation)}
                  className="border p-2 w-full"
                  onInput={handleNameInput}
                  onBlur={handleBlur('firstName')}
                />
                {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="lastName" className="text-gray-600">Last Name</label>
                <input
                  id="lastName"
                  {...register('lastName', lastNameValidation)}
                  className="border p-2 w-full"
                  onInput={handleNameInput}
                  onBlur={handleBlur('lastName')}
                />
                {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="email" className="text-gray-600">Email</label>
                <input
                  id="email"
                  {...register('email', emailValidation)}
                  className="border p-2 w-full"
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="role" className="text-gray-600">Role</label>
                <div className="relative">
                  <select
                    id="role"
                    {...register('role', roleValidation)}
                    className="appearance-none border border-gray-300 rounded-md p-3 w-full"
                  >
                    <option value="">Select Role</option>
                    <option value="Admin">Admin</option>
                    <option value="Editor">Editor</option>
                    <option value="Viewer">Viewer</option>
                  </select>
                  {errors.role && <p className="text-red-500">{errors.role.message}</p>}
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="phoneNumber" className="text-gray-600">Phone Number</label>
                <input
                  id="phoneNumber"
                  {...register('phoneNumber', phoneValidation)}
                  className="border p-2 w-full"
                  onInput={handlePhoneInput}
                />
                {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber.message}</p>}
              </div>

              <div className="flex justify-between mt-4">
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                  Save
                </button>
                <button
                  type="button"
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditUser;
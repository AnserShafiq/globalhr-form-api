'use client'
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

export default function NewAgent() {
  const [message, setMessage] = useState<string>('');
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [contact, setContact] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [emailCheck, setEmailCheck] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContactNumber = (value: string): void => {
    let receivedEntry = value.replace(/\D/g, '');

    if (receivedEntry.length === 10) {
      receivedEntry = receivedEntry.slice(0, 10);
      receivedEntry = receivedEntry.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2 $3');
    } else if (receivedEntry.length > 10 || receivedEntry.length === 11) {
      receivedEntry = receivedEntry.slice(0, 11);
      receivedEntry = receivedEntry.replace(/(\d{4})(\d{7})/, '$1 $2');
    }
    setContact(receivedEntry);
  };

  const checkEmailUnique = async (email: string): Promise<boolean> => {
    try {
      const resp = await fetch(`/api/admin/details/${email}`);
      const check = await resp.json();
      console.log(check)
      if(check){
        return false
      }else{
        return true
      }
    } catch (error) {
      console.error('Unable to access API', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { name, email, password, role } = formData;

    if (!name || !email || !contact || !password || !role) {
      setMessage('All fields are required.');
      setLoading(false);
      return;
    }

    const isUnique = await checkEmailUnique(email);
    console.log('Email unique: ', isUnique);
    if (!isUnique) {
      setEmailCheck(true);
      setLoading(false);
      return;
    }
    setEmailCheck(false)
    const data = {
      name,
      email,
      contactNumber: contact,
      password,
      role,
    };

    const response = await fetch('/api/admin/add-new', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setMessage('Agent created successfully. Reloading...');
      setTimeout(() => window.location.reload(), 1500);
    } else {
      setMessage('Failed to create agent. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col py-18 font-poppins">
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div className="inline-flex items-end gap-3 mb-2">
          <h1 className="text-lg font-bold underline tracking-wide">Creating a New Agent</h1>
          {message && <p className="text-xs font-[500] text-green-500 pb-1">{message}</p>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="name" className="text-md lg:text-lg font-medium capitalize">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            className="bg-gray-200 rounded-xl p-2"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-x-7 gap-y-4 mt-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-md lg:text-lg font-medium capitalize">
              E-mail {emailCheck && <p className="text-xs font-[500] text-red-500 pb-1">Email already exists, enter a new one.</p>}
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className="bg-gray-200 rounded-xl p-2"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="contactNumber" className="text-md lg:text-lg font-medium capitalize">
              Contact Number
            </label>
            <input
              type="tel"
              name="contactNumber"
              id="contactNumber"
              value={contact}
              onChange={(e) => handleContactNumber(e.target.value)}
              className="bg-gray-200 rounded-xl p-2"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-md lg:text-lg font-medium capitalize">
              Password
            </label>
            <div className="w-full grid grid-cols-[90%_10%] bg-gray-200 rounded-xl pr-2">
              <input
                type={hidePassword ? 'password' : 'text'}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                className="rounded-l-xl pl-2 py-2"
                required
              />
              {hidePassword ? (
                <EyeOff onClick={() => setHidePassword(false)} className="h-5 w-auto mx-auto my-auto cursor-pointer" />
              ) : (
                <Eye onClick={() => setHidePassword(true)} className="h-5 w-auto mx-auto my-auto cursor-pointer" />
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="role" className="text-md lg:text-lg font-medium capitalize">
              Role
            </label>
            <select
              name="role"
              id="role"
              value={formData.role}
              onChange={handleInputChange}
              className="bg-gray-200 rounded-xl p-2"
              required
            >
              <option value="" disabled>Select option</option>
              <option value="recruiter">Recruiter</option>
              <option value="administrator">Administrator</option>
              <option value="manager">Manager</option>
            </select>
          </div>
        </div>

        <button
          className="text-md mt-6 px-4 py-2 rounded-xl bg-red-ghr text-gray-100 font-semibold tracking-wide w-fit mx-auto cursor-pointer"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create'}
        </button>
      </form>
    </div>
  );
}

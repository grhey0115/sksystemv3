import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Avatar from 'react-avatar';
import { FaCamera } from 'react-icons/fa';
import axios from 'axios';

export default function ViewProfile() {
    const { user, personalInformation = {}, educationalBackground = {}, employment = {} } = usePage().props;

    const { data, setData, patch } = useForm({
        first_name: user?.first_name || '',
        middle_name: user?.middle_name || '',
        last_name: user?.last_name || '',
        email: user?.email || '',
        phone_number: user?.phone_number || '',
        avatar: null,

        // Personal Information
        barangay: personalInformation?.barangay || '',
        city: personalInformation?.city || '',
        religion: personalInformation?.religion || '',
        civil_status: personalInformation?.civil_status || '',
        gender: personalInformation?.gender || '',
        is_solo_parent: personalInformation?.is_solo_parent || '',

        // Educational Background
        current_status: educationalBackground?.current_status || '',
        year_graduated: educationalBackground?.year_graduated || '',

        // Employment
        current_employment_status: employment?.current_employment_status || '',
        employment_sector: employment?.employment_sector || '',
    });

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log('Selected file:', file); // Log the file for debugging
    
            const formData = new FormData();
            formData.append('avatar', file);  // Ensure this key matches what Laravel expects
    
            axios.patch(route('profile.updateAvatar'), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(response => {
                alert('Avatar updated successfully!');
            })
            .catch((error) => {
                console.error('Error updating avatar:', error.response ? error.response.data : error.message);
                alert('There was an error updating the avatar.');
            });
        } else {
            alert('No file selected.');
        }
    };

    // Function to handle profile fields update
    const handleProfileUpdate = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('first_name', data.first_name || user.first_name || '');
        formData.append('middle_name', data.middle_name || user.middle_name || '');
        formData.append('last_name', data.last_name || user.last_name || '');
        formData.append('email', data.email || user.email || '');
        formData.append('phone_number', data.phone_number || user.phone_number || '');
        formData.append('city', data.city || personalInformation.city || '');
        formData.append('religion', data.religion || personalInformation.religion || '');
        formData.append('civil_status', data.civil_status || personalInformation.civil_status || '');
        formData.append('gender', data.gender || personalInformation.gender || '');
        formData.append('is_solo_parent', data.is_solo_parent || personalInformation.is_solo_parent || '');
        formData.append('current_status', data.current_status || educationalBackground.current_status || '');
        formData.append('year_graduated', data.year_graduated || educationalBackground.year_graduated || '');
        formData.append('current_employment_status', data.current_employment_status || employment.current_employment_status || '');
        formData.append('employment_sector', data.employment_sector || employment.employment_sector || '');

        axios.patch(route('profile.update'), formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(() => {
            alert('Profile updated successfully!');
        })
        .catch((error) => {
            console.error('Error updating profile:', error.response ? error.response.data : error.message);
            alert('There was an error updating the profile.');
        });
    };

    return (
        <AuthenticatedLayout
            user={user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">View Profile</h2>}
        >
            <Head title="View Profile" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white shadow-sm sm:rounded-lg">
                    {/* Profile Header */}
                    <div className="flex items-center bg-gradient-to-r from-red-500 to-gray-700 text-white p-6 rounded-t-lg relative">
                        <div className="relative">
                            <Avatar
                                name={`${user?.first_name} ${user?.middle_name} ${user?.last_name}`}
                                round={true}
                                size="100"
                                alt="User Avatar"
                                maxInitials={2}
                            />
                            <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-gray-800 p-2 rounded-full cursor-pointer">
                                <FaCamera className="text-white" />
                            </label>
                            <input
                                id="avatar-upload"
                                type="file"
                                name="avatar"  // This should match the key used in FormData.append()
                                accept="image/*"
                                className="hidden"
                                onChange={handleAvatarChange}  // This should call the function
                            />
                        </div>
                        <div className="ml-4">
                            <h1 className="text-xl font-semibold">{user?.first_name} {user?.last_name}</h1>
                            <p>{user?.email}</p>
                        </div>
                    </div>

                    {/* Profile Information Sections */}
                    <div className="p-6 bg-white">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Personal Information */}
                            <div>
                                <h2 className="text-lg font-semibold text-purple-600">Personal Information</h2>
                                <div className="mt-2">
                                    <div className="flex justify-between">
                                        <p className="text-gray-600">Name</p>
                                        <p>{user?.first_name} {user?.last_name}</p>
                                    </div>
                                    <div className="flex justify-between mt-2">
                                        <p className="text-gray-600">City/Municipality</p>
                                        <p>{data.city}</p>
                                    </div>
                                    <div className="flex justify-between mt-2">
                                        <p className="text-gray-600">Religion</p>
                                        <p>{data.religion}</p>
                                    </div>
                                    <div className="flex justify-between mt-2">
                                        <p className="text-gray-600">Gender</p>
                                        <p>{data.gender}</p>
                                    </div>
                                    <div className="flex justify-between mt-2">
                                        <p className="text-gray-600">Civil Status</p>
                                        <p>{data.civil_status}</p>
                                    </div>
                                    <div className="flex justify-between mt-2">
                                        <p className="text-gray-600">Solo Parent</p>
                                        <p>{data.is_solo_parent ? "Yes" : "No"}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Educational Background */}
                            <div>
                                <h2 className="text-lg font-semibold text-purple-600">Educational Background</h2>
                                <div className="mt-2">
                                    <div className="flex justify-between">
                                        <p className="text-gray-600">Current Educational Status</p>
                                        <p>{data.current_status}</p>
                                    </div>
                                    <div className="flex justify-between mt-2">
                                        <p className="text-gray-600">Year Graduated</p>
                                        <p>{data.year_graduated}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Employment */}
                            <div>
                                <h2 className="text-lg font-semibold text-purple-600">Employment</h2>
                                <div className="mt-2">
                                    <div className="flex justify-between">
                                        <p className="text-gray-600">Current Employment Status</p>
                                        <p>{data.current_employment_status}</p>
                                    </div>
                                    <div className="flex justify-between mt-2">
                                        <p className="text-gray-600">Employment Sector</p>
                                        <p>{data.employment_sector}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Button to update profile fields */}
                        <div className="mt-6">
                            <button
                                type="submit"
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                onClick={handleProfileUpdate}
                            >
                                Update Profile Information
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

import React from 'react';
import { useForm } from '@inertiajs/react';

const Step4Form = ({ step3Data = {} }) => {
  const { data, setData, post, processing } = useForm({
    name: '',
    relationship: '',
    contact_number: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/profile-step4', {
      onSuccess: () => {
        // Redirect to a confirmation page or another step
        window.location.href = '/dashboard';
      },
    });
  };

  const handlePreview = () => {
    Inertia.visit('/profile-step3', {
      data: step3Data,
    });
  };

  return (
    <div className="flex h-screen flex-col md:flex-row">
      {/* Left Side - Steps */}
      <div className="w-full md:w-2/4 bg-gradient-to-b from-gray-500 to-red-400 flex flex-col justify-center items-center text-white p-10">
        <div className="space-y-8">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 border-2 border-white rounded-full">
              1
            </div>
            <span className="ml-4">Personal Information</span>
          </div>
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 border-2 border-white rounded-full">
              2
            </div>
            <span className="ml-4">Educational Background</span>
          </div>
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 border-2 border-white rounded-full">
              3
            </div>
            <span className="ml-4">Additional Information</span>
          </div>
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 border-2 border-white rounded-full">
              4
            </div>
            <span className="ml-4">Emergency Contact</span>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-3/4 bg-white p-10 flex justify-center items-center">
        <div className="w-full max-w-sm">
          <h2 className="text-xl font-bold mb-4">Emergency Contact</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter full name"
              />
            </div>

            {/* Relationship */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Relationship
              </label>
              <input
                type="text"
                name="relationship"
                value={data.relationship}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter relationship"
              />
            </div>

            {/* Contact Number */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Contact Number
              </label>
              <input
                type="text"
                name="contact_number"
                value={data.contact_number}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter contact number"
              />
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={data.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter address"
              />
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={handlePreview}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Previous
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                disabled={processing}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Step4Form;

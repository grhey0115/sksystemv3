import React from 'react';
import { useForm } from '@inertiajs/react';
import { TagsInput } from 'react-tag-input-component';

const Step3Form = ({ step2Data = {} }) => {
  const { data, setData, post, processing } = useForm({
    is_currently_working: '0', // Default to No
    hobbies: [],
    is_pwd: '0', // Default to No
    has_conflict_with_law: '0', // Default to No
    is_indigenous: '0', // Default to No
    is_registered_voter: '0', // Default to No
    attended_assembly: '0', // Default to No
    why_no_assembly: '',
    residency_status: '', // Options will be handled with dropdown
  });

  const handleTagChange = (tags) => {
    setData({ ...data, hobbies: tags });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData({ ...data, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/profile-step3', {
      onSuccess: () => {
        window.location.href = '/profile-step4';
      },
    });
  };

  const handlePreview = () => {
    Inertia.visit('/profile-step2', {
      data: step2Data,
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
          <h2 className="text-xl font-bold mb-4">Additional Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Current Employment */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Currently Working
              </label>
              <div className="flex space-x-4">
                <label>
                  <input
                    type="radio"
                    name="is_currently_working"
                    value="1"
                    onChange={handleChange}
                    checked={data.is_currently_working === '1'}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="is_currently_working"
                    value="0"
                    onChange={handleChange}
                    checked={data.is_currently_working === '0'}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>

            {/* Hobbies */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Hobbies
              </label>
              <TagsInput
                tags={data.hobbies}
                onChange={handleTagChange}
                placeholder="Enter your hobbies"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* PWD */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Person with Disability
              </label>
              <div className="flex space-x-4">
                <label>
                  <input
                    type="radio"
                    name="is_pwd"
                    value="1"
                    onChange={handleChange}
                    checked={data.is_pwd === '1'}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="is_pwd"
                    value="0"
                    onChange={handleChange}
                    checked={data.is_pwd === '0'}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>

            {/* Conflict with Law */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Have Conflict with Law
              </label>
              <div className="flex space-x-4">
                <label>
                  <input
                    type="radio"
                    name="has_conflict_with_law"
                    value="1"
                    onChange={handleChange}
                    checked={data.has_conflict_with_law === '1'}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="has_conflict_with_law"
                    value="0"
                    onChange={handleChange}
                    checked={data.has_conflict_with_law === '0'}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>

            {/* Indigenous Status */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Indigenous
              </label>
              <div className="flex space-x-4">
                <label>
                  <input
                    type="radio"
                    name="is_indigenous"
                    value="1"
                    onChange={handleChange}
                    checked={data.is_indigenous === '1'}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="is_indigenous"
                    value="0"
                    onChange={handleChange}
                    checked={data.is_indigenous === '0'}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>

            {/* Registered Voter */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Registered Voter
              </label>
              <div className="flex space-x-4">
                <label>
                  <input
                    type="radio"
                    name="is_registered_voter"
                    value="1"
                    onChange={handleChange}
                    checked={data.is_registered_voter === '1'}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="is_registered_voter"
                    value="0"
                    onChange={handleChange}
                    checked={data.is_registered_voter === '0'}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>

            {/* Attended Assembly */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Attended Assembly
              </label>
              <div className="flex space-x-4">
                <label>
                  <input
                    type="radio"
                    name="attended_assembly"
                    value="1"
                    onChange={handleChange}
                    checked={data.attended_assembly === '1'}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="attended_assembly"
                    value="0"
                    onChange={handleChange}
                    checked={data.attended_assembly === '0'}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>

            {data.attended_assembly === '0' && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Why No Assembly
                </label>
                <textarea
                  name="why_no_assembly"
                  value={data.why_no_assembly}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter reason if no assembly"
                />
              </div>
            )}

            {/* Residency Status */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Residency Status
              </label>
              <select
                name="residency_status"
                value={data.residency_status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Residency Status</option>
                <option value="Permanent">Permanent</option>
                <option value="Temporary">Temporary</option>
              </select>
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
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Step3Form;

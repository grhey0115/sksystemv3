import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';

const Step2Form = ({ step1Data = {} }) => {
  const { data, setData, post, processing } = useForm({
    current_status: '',
    year_level: '',
    course: '', 
    year_graduated: '',
    last_year_attended: '',
  });

  useEffect(() => {
    // Retrieve stored data from localStorage
    const savedData = JSON.parse(localStorage.getItem('step2Data')) || {};
    setData(savedData);
  }, [setData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/profile-step2', {
      onSuccess: () => {
        window.location.href = '/profile-step3';
      },
    });
  };

  const handlePreview = () => {
    // Store current form data in localStorage
    localStorage.setItem('step2Data', JSON.stringify(data));

    Inertia.visit('/profile-step1', {
      method: 'get',
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
          <h2 className="text-xl font-bold mb-4">Educational Background</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Current Status
              </label>
              <div className="flex space-x-4">
                <label>
                  <input
                    type="radio"
                    name="current_status"
                    value="student"
                    onChange={handleChange}
                    checked={data.current_status === 'student'}
                    className="mr-2"
                  />
                  Student
                </label>
                <label>
                  <input
                    type="radio"
                    name="current_status"
                    value="graduate"
                    onChange={handleChange}
                    checked={data.current_status === 'graduate'}
                    className="mr-2"
                  />
                  Graduate
                </label>
                <label>
                  <input
                    type="radio"
                    name="current_status"
                    value="out_of_school_youth"
                    onChange={handleChange}
                    checked={data.current_status === 'out_of_school_youth'}
                    className="mr-2"
                  />
                  Out of School Youth
                </label>
              </div>
            </div>

            {data.current_status === 'student' && (
              <>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Year Level
                  </label>
                  <input
                    type="text"
                    name="year_level"
                    placeholder="e.g., 3rd Year"
                    value={data.year_level}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Course
                  </label>
                  <select
                    name="course"
                    value={data.course}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Course</option>
                    <option value="junior_highschool">Junior Highschool</option>
                    <option value="senior_highschool_gas">Senior Highschool - GAS</option>
                    <option value="senior_highschool_abm">Senior Highschool - ABM</option>
                    <option value="senior_highschool_humms">Senior Highschool - HUMMS</option>
                    <option value="senior_highschool_stem">Senior Highschool - STEM</option>
                    <option value="bsit">BS Information Technology</option>
                    <option value="bscs">BS Computer Science</option>
                    <option value="bsba">BS Business Administration</option>
                    {/* Add more courses as needed */}
                  </select>
                </div>
              </>
            )}

            {data.current_status === 'graduate' && (
              <>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Course
                  </label>
                  <input
                    type="text"
                    name="course"
                    value={data.course}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Year Graduated
                  </label>
                  <input
                    type="text"
                    name="year_graduated"
                    value={data.year_graduated}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </>
            )}

            {data.current_status === 'out_of_school_youth' && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Last Year Attended
                </label>
                <input
                  type="date"
                  name="last_year_attended"
                  value={data.last_year_attended}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

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

export default Step2Form;

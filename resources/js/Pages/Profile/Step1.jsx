import React, { useCallback, useState } from 'react';
import { useForm } from '@inertiajs/react';

const Step1Form = ({ prefilledData = {} }) => {
  const { data, setData, post, processing, errors } = useForm({
    barangay: prefilledData.barangay || '',
    sitio: prefilledData.sitio || '',
    religion: prefilledData.religion || '',
    civil_status: prefilledData.civil_status || '',
    is_solo_parent: prefilledData.is_solo_parent || false, // Ensure default is boolean
    gender: prefilledData.gender || '',
    family_members: prefilledData.family_members || '',
    siblings: prefilledData.siblings || '',
    valid_id_paths: prefilledData.valid_id_paths || [],
  });

  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState(data.valid_id_paths);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    if (files.length + newFiles.length <= 2) {
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      setData((prevData) => ({ ...prevData, valid_id_paths: [...prevData.valid_id_paths, ...newFiles] }));
    } else {
      alert('Please upload only 2 files');
    }
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setData((prevData) => {
      const newFiles = prevData.valid_id_paths.filter((_, i) => i !== index);
      return { ...prevData, valid_id_paths: newFiles };
    });
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    const newFiles = Array.from(e.dataTransfer.files);
    if (files.length + newFiles.length <= 2) {
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      setData((prevData) => ({ ...prevData, valid_id_paths: [...prevData.valid_id_paths, ...newFiles] }));
    } else {
      alert('Please upload only 2 files');
    }
  }, [files, setData]);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : (type === 'radio' ? value === '1' : value)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('step1Data', JSON.stringify(data));
    const formData = new FormData();
    for (const key in data) {
      if (key === 'valid_id_paths') {
        data.valid_id_paths.forEach(file => formData.append('valid_id_paths[]', file));
      } else {
        formData.append(key, data[key]);
      }
    }
    post('/profile-step1', formData, {
      onSuccess: () => {
        localStorage.removeItem('step1Data');
        window.location.href = '/profile-step2';
      },
      onError: (error) => {
        console.error('Error:', error);
      },
    });
  };

  const barangays = [
    'Ablayan', 'Babayongan', 'Balud', 'Banhigan', 'Bulak', 'Caleriohan', 'Caliongan',
    'Casay', 'Catolohan', 'Cawayan', 'Consolacion', 'Coro', 'Dugyan', 'Dumalan',
    'Jolomaynon', 'Lanao', 'Langkas', 'Lumbang', 'Malones', 'Maloray', 'Mananggal',
    'Manlapay', 'Mantalongon', 'Nalhub', 'Obo', 'Obong', 'Panas', 'Poblacion',
    'Sacsac', 'Salug', 'Tabon', 'Tapun', 'Tuba'
  ];

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
          <h2 className="text-xl font-bold mb-4">Personal Information</h2>
          <p className="text-sm mb-6">Please fill up the necessary Information</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <select
              name="barangay"
              value={data.barangay}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Barangay</option>
              {barangays.map((barangay) => (
                <option key={barangay} value={barangay}>
                  {barangay}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="sitio"
              placeholder="Sitio"
              value={data.sitio}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="religion"
              placeholder="Religion"
              value={data.religion}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex space-x-4">
              <select
                name="civil_status"
                value={data.civil_status}
                onChange={handleChange}
                required
                className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Civil Status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="widowed">Widowed</option>
                <option value="divorced">Divorced</option>
              </select>
              <div className="w-1/2 flex items-center">
                <label className="mr-2">Are you a solo parent?</label>
                <label className="mr-4">
                  <input
                    type="radio"
                    name="is_solo_parent"
                    value="1"
                    checked={data.is_solo_parent === true}
                    onChange={handleChange}
                    className="mr-1"
                  />
                  YES
                </label>
                <label>
                  <input
                    type="radio"
                    name="is_solo_parent"
                    value="0"
                    checked={data.is_solo_parent === false}
                    onChange={handleChange}
                    className="mr-1"
                  />
                  NO
                </label>
              </div>
            </div>
            <select
              name="gender"
              value={data.gender}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <div className="flex space-x-4">
              <input
                type="number"
                name="family_members"
                placeholder="No. of Family Members"
                value={data.family_members}
                onChange={handleChange}
                disabled={data.is_solo_parent === false}
                className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                name="siblings"
                placeholder="No. of Siblings"
                value={data.siblings}
                onChange={handleChange}
                className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload Valid IDs</label>
              <div
                className={`border-2 border-dashed ${dragging ? 'border-blue-500' : 'border-gray-300'} rounded-lg p-6 flex flex-col items-center ${dragging ? 'bg-gray-100' : ''}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <div className="text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v6a1 1 0 001 1h16a1 1 0 001-1V7M5 3h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zM10 14l2 2 4-4" />
                  </svg>
                  <input
                    type="file"
                    name="valid_id_paths"
                    accept="image/*,application/pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                    multiple
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer bg-white border border-gray-300 rounded-md py-2 px-4 inline-flex items-center text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  >
                    Choose files
                  </label>
                  <p className="text-xs text-gray-500 mt-1">JPG, PNG & PDF</p>
                  {files.length > 0 && (
                    <div className="text-xs text-gray-700 mt-2">
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center gap-2 mb-1">
                          <span className="inline-flex items-center gap-x-0.5 rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                            {file.name}
                            <button
                              type="button"
                              className="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-gray-500/20"
                              onClick={() => handleRemoveFile(index)}
                            >
                              <span className="sr-only">Remove</span>
                              <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 stroke-gray-600/50 group-hover:stroke-gray-600/75">
                                <path d="M4 4l6 6m0-6l-6 6" />
                              </svg>
                              <span className="absolute -inset-1" />
                            </button>
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              disabled={processing}
            >
              {processing ? 'Processing...' : 'Next'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Step1Form;

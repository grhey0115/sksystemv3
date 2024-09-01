import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import Step1Form from './Step1Form';
import Step2Form from './Step2Form';
import Step3Form from './Step3Form';
import Step4Form from './Step4Form';

const MultiStepForm = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const { data, setData, post, processing, errors, reset } = useForm({
        barangay: '',
        sitio: '',
        religion: '',
        civil_status: '',
        is_solo_parent: false,
        gender: '',
        family_members: '',
        siblings: '',
        valid_id_paths: ['', ''],
        // Add additional fields for other steps
    });

    const handleStepChange = (step) => {
        setCurrentStep(step);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('form.submit')); // Adjust route as necessary
    };

    return (
        <div className="flex h-screen flex-col md:flex-row">
            {/* Step Navigation */}
            <div className="w-full md:w-2/4 bg-gradient-to-b from-gray-500 to-red-400 flex flex-col justify-center items-center text-white p-10">
                <div className="space-y-8">
                    {[1, 2, 3, 4].map(step => (
                        <div key={step} className="flex items-center">
                            <div className="flex items-center justify-center w-8 h-8 border-2 border-white rounded-full">
                                {step}
                            </div>
                            <span className="ml-4">Step {step}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Form Content */}
            <div className="w-full md:w-3/4 bg-white p-10 flex justify-center items-center">
                <div className="w-full max-w-md">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {currentStep === 1 && <Step1Form data={data} setData={setData} />}
                        {currentStep === 2 && <Step2Form data={data} setData={setData} />}
                        {currentStep === 3 && <Step3Form data={data} setData={setData} />}
                        {currentStep === 4 && <Step4Form data={data} setData={setData} />}

                        <div className="flex justify-between mt-4">
                            {currentStep > 1 && (
                                <button
                                    type="button"
                                    onClick={() => handleStepChange(currentStep - 1)}
                                    className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                                >
                                    Back
                                </button>
                            )}
                            {currentStep < 4 ? (
                                <button
                                    type="button"
                                    onClick={() => handleStepChange(currentStep + 1)}
                                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                                >
                                    Next
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                                >
                                    Submit
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MultiStepForm;

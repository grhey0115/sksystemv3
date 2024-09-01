// js/pages/Profile/PersonalInformationForm.jsx
import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function PersonalInformationForm({ data }) {
    const [formData, setFormData] = useState(data || {
        barangay: '',
        sitio: '',
        religion: '',
        civil_status: '',
        is_solo_parent: false,
        gender: '',
        family_members: 0,
        siblings: 0,
    });

    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        Inertia.post('/profile-step1', formData);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="barangay"
                value={formData.barangay}
                onChange={handleChange}
                placeholder="Barangay"
            />
            {/* Add inputs for other fields */}
            <button type="submit">Save and Continue</button>
        </form>
    );
}

import React, { useState } from 'react';

export default function ItemForm({ name = '', description = '', onSubmit, onCancel }) {
    const [formData, setFormData] = useState({ name, description });
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleCancel = () => {
        onCancel();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    Description:
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div>
                <button type="submit">Submit</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
            </div>
        </form>
    );
}
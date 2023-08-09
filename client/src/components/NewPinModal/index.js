import React from "react";

function FormModal({ openForm, onClose, onSubmit, formValues, setFormValues, position }) {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formValues);
        onClose();
    };

    return (
        <div
            className={`modal ${openForm ? 'is-active' : ''}`}
            style={{
                position: 'absolute',
                top: `${position.y - 90}px`, 
                left: `${position.x + 30}px`,
                // top: `${position.y}px`, 
                // left: `${position.x}px`,
            }}
            onClick={(e) => {
                e.stopPropagation(); 
            }}
        >
            <div className="modal-card" onClick={(e) => e.stopPropagation()}> 
                <header className="modal-card-head">
                    <p className="modal-card-title">Add a Pin!</p>
                    <button className="delete" aria-label="close" onClick={onClose}></button>
                </header>
                <section className="modal-card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <label className="label">Pin Title</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    name="title"
                                    value={formValues.title}
                                    onChange={handleInputChange}
                                    placeholder="Enter a title for this pin"
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Pin Text</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    name="description"
                                    value={formValues.description}
                                    onChange={handleInputChange}
                                    placeholder="Describe your encounter"
                                />
                            </div>
                        </div>
                        <button className="button is-primary" type="submit">Save Marker</button>
                        <button className="button" type="button" onClick={onClose}>Cancel</button>
                    </form>
                </section>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={onClose}></button> 
        </div>
    );
    
}

export default FormModal;
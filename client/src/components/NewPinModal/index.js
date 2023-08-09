import React from "react";

function FormModal({ openForm, onClose, onSubmit, formValues, setFormValues, position, coordinates }) {
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
                        <div className="mb-3">
                            <input type="hidden" name="lat" value={coordinates.lat} />
                            <input type="hidden" name="lng" value={coordinates.lng} />
                            <p><strong>Latitude:</strong> {coordinates.lat.toFixed(4)}</p>
                            <p><strong>Longitude:</strong> {coordinates.lng.toFixed(4)}</p>
                        </div>
                        <button className="button is-primary" type="submit">Save Marker</button>
                        <button className="button" type="button" onClick={onClose}>Cancel</button>
                    </form>
                </section>
            </div>
        </div>
    );
    
}

export default FormModal;
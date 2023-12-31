import React from 'react';
import Button from 'react-bootstrap/Button'
import { useMutation } from '@apollo/client';
import { REMOVE_PIN } from '../../utils/mutations';

const RemovePinHook = () => {
    const [removePin, { loading, error }] = useMutation(REMOVE_PIN);

    const removePinById = async (id) => {
        console.log("ID:", id);
        try {
            const { data } = await removePin({ variables: { pinId: id } });
            console.log("DATA:", data);
            return data.removePin;
        } catch (error) {
            console.error('Error deleting pin:', error);
            return false;
        }
    };

    return { removePinById, loading, error };
};

const RemovePin = ({ pinId, onDelete }) => {
    const { removePinById, loading, error } = RemovePinHook();

    const deleteHandle = async () => {
            const result = await removePinById(pinId);
            if (result) {
                onDelete();
                console.log('Pin deleted successfully');
            } else {
                console.log('Error deleting pin');
            }
    };

    return (
        <div className="d-flex" style={{ justifyContent: 'center', width: '100%' }}>
            <Button className='pin-card-btn' variant="danger" onClick={deleteHandle} disabled={loading}>Delete Pin</Button>
            {loading && <p>Deleting...</p>}
            {error && <p>Error: {error.message}</p>}
        </div>
    );
};

export default RemovePin;

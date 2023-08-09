import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { REMOVE_PIN } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries'
import Auth from '../../utils/auth'


const RemovePinHook = () => {
  const [removePin, { loading, error }] = useMutation(REMOVE_PIN);

  const removePinById = async (id) => {
    try {
        const { data } = await removePin({ variables: { id } });
        return data.removePin;
    } catch (error) {
        console.error('Error deleting pin:', error);
        return false;
    }
  };

  return { removePinById, loading, error };
};

const RemovePin = ({ pinId }) => {
    const { removePinById, loading, error } = RemovePinHook;

    const deleteHandle = async () => {
      const result = await removePinById(pinId)
      if (result) {
        console.log('Object deleted successfully');
      } else {
        console.log('Error deleting pin:');
      }
    };

    return (
      <div>
        <button onClick={deleteHandle} disabled={loading}>Delete Pin</button>
        {loading && <p>Deleting...</p>}
        {error && <p>Error: {error.message}</p>}
      </div>
    );
};

export default RemovePin;

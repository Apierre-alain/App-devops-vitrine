import { useState, useEffect } from 'react';
import api from '../../utils/api';
import './ItemModal.css';


export default function ItemModal({ isOpen, onClose, userId, onItemAdded, editItem }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (editItem) {
            setName(editItem.name);
            setDescription(editItem.description);
        }
        else {
            setName('');
            setDescription('');
        }
    }, [editItem]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!name.trim() || !description.trim()) {
            setError('Tous les champs sont requis');
            return;
        }

        setLoading(true);
        setError('');

        try {
                        const response = editItem
                                ? await api.put(`/items/${editItem._id}`, { name, description })
                                : await api.post('/items', { name, description });
            
            onItemAdded(response.data);
            setName('');
            setDescription('');
        } catch (err) {
            const action = editItem ? 'modification' : 'création';
            setError(err.response?.data?.error || `Erreur lors de la ${action} de l'item`);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setName('');
        setDescription('');
        setError('');
        onClose();
    };

    return (
        <div className="item-modal-overlay" onClick={handleClose}>
            <div className="item-modal" onClick={(e) => e.stopPropagation()}>
                <div className="item-modal-header">
                    <h2>{editItem ? 'Modifier un item' : 'Ajouter un item'}</h2>
                    <button type="button" onClick={handleClose}>×</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="item-modal-content">
                        {error && <div className="item-modal-error">{error}</div>}
                        <div className="item-modal-field">
                            <label htmlFor="item-name">Nom de l'item:</label>
                            <input
                                type="text"
                                id="item-name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Entrez le nom de l'item"
                                maxLength={30}
                            />
                        </div>
                        <div className="item-modal-field">
                            <label htmlFor="item-description">Description:</label>
                            <textarea
                                id="item-description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Entrez la description"
                            ></textarea>
                        </div>
                    </div>
                    <div className="item-modal-footer">
                        <button type="button" onClick={handleClose} disabled={loading}>
                            Annuler
                        </button>
                        <button type="submit" disabled={loading}>
                            {loading ? (editItem ? 'Modification...' : 'Création...') : (editItem ? 'Modifier' : 'Confirmer')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
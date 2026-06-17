import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemList from '../../components/itemList/ItemList';
import ItemModal from '../../components/itemModal/ItemModal';
import api from '../../utils/api';
import './Dashboard.css';

function Dashboard() {
    const [items, setItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);
    
    const fetchItems = async () => {
        try {
            const response = await api.get('/items');
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    useEffect(() => {
        if (user?._id) {
            fetchItems();
        }
    }, [user]);
    
    const handleItemAdded = (newItem) => {
        if (editingItem) {
            // Mode édition : remplacer l'item existant
            setItems(items.map(item => item._id === newItem._id ? newItem : item));
            setEditingItem(null);
        } else {
            // Mode ajout : ajouter à la fin
            setItems([...items, newItem]);
        }
        setIsModalOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };

    const handleDelete = async (itemId) => {
        try {
            await api.delete(`/items/${itemId}`);
            setItems(items.filter(item => item._id !== itemId));
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    if (!user) {
        return (
            <div className="dashboard">
                <h1>Vous devez être connecté pour accéder au tableau de bord.</h1>
                <button onClick={() => navigate('/login')}>Se connecter</button>
            </div>
        );
    }

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>Tableau de bord</h1>
                <button className="logout-btn" onClick={handleLogout}>Déconnexion</button>
            </div>
            <div className="dashboard-body"> 
                <ItemList 
                    items={items} 
                    onDelete={handleDelete} 
                    onEdit={(itemId) => {
                        const item = items.find(i => i._id === itemId);
                        setEditingItem(item);
                        setIsModalOpen(true);
                    }} 
                />
                <button className="add-item-btn" onClick={() => { setEditingItem(null); setIsModalOpen(true); }}>Ajouter un nouvel item</button>
            </div>
                {user && (
                <ItemModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setEditingItem(null);
                    }}
                    onItemAdded={handleItemAdded}
                        
                    editItem={editingItem}
                />
            )}
        </div>
    );
}

export default Dashboard;
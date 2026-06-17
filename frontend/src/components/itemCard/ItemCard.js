import './ItemCard.css';

export default function ItemCard({ name, description, _id, onDelete, onEdit }) {
    return (
        <div className="item-card">
            <div className="item-card-header">
                <h3>{name}</h3>
                <div className="item-card-buttons">
                    <button onClick={() => onEdit(_id)}>Modifier</button>
                    <button onClick={() => onDelete(_id)}>Supprimer</button>
                </div>
            </div>
            <div className="item-card-content">
                <p>{description}</p>
            </div>
        </div>
    );
};
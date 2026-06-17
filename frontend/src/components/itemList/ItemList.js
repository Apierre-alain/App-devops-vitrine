import ItemCard from '../itemCard/ItemCard';
import './ItemList.css';

export default function ItemList({ items, onDelete, onEdit }) {
  return (
    <div className="item-list">
        {items.map((item) => (
            <ItemCard
                name={item.name}
                description={item.description}    
                _id={item._id}
                onDelete={() => onDelete(item._id)}
                onEdit={() => onEdit(item._id)}
            />
        ))}
    </div>
  );
}
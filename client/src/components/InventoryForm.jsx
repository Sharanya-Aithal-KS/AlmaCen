import { useState, useEffect } from 'react';
import './InventoryForm.css';

const InventoryForm = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    price: '',
    category: '',
    lowStockThreshold: 10
  });

  useEffect(() => {
    if (!initialData) return;

    setFormData({
      name: initialData.name ?? '',
      quantity: initialData.quantity ?? '',
      price: initialData.price ?? '',
      category: initialData.category ?? '',
      lowStockThreshold: initialData.lowStockThreshold ?? 10
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="inventory-form" onSubmit={handleSubmit}>
      <h2>{initialData ? 'Edit Item' : 'Add New Item'}</h2>

      <div className="form-group">
        <label>Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>
            <option value="Daily Essentials">Daily Essentials</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashions">Fashions</option>
            <option value="Groceries">Groceries</option>
            <option value="Stationeries">Stationeries</option>
            <option value="Toys & Games">Toys & Games</option>
          </select>
        </div>

        <div className="form-group">
          <label>Low Stock Threshold</label>
          <input
            type="number"
            name="lowStockThreshold"
            value={formData.lowStockThreshold}
            onChange={handleChange}
            min="0"
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn-primary">
          {initialData ? 'Update Item' : 'Add Item'}
        </button>
      </div>
    </form>
  );
};

export default InventoryForm;

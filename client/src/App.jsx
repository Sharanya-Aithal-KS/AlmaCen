import { useState, useEffect } from 'react';

import Login from './components/Login';
import Signup from './components/Signup';
import CategoryNav from './components/CategoryNav';
import InventoryTable from './components/InventoryTable';
import InventoryForm from './components/InventoryForm';
import AlertBanner from './components/AlertBanner';
import ConfirmDialog from './components/ConfirmDialog';

import './index.css';

function App() {
  /* ================= AUTH ================= */
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(sessionStorage.getItem('token'))
  );
  const [authPage, setAuthPage] = useState('login');

  /* ================= DATA ================= */
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ================= UI ================= */
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  /* ================= DELETE MODAL ================= */
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  /* ================= FETCH ITEMS ================= */
  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/inventory', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      });

      if (!res.ok) throw new Error('Failed to fetch items');
      const data = await res.json();
      setItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchItems();
  }, [isAuthenticated]);

  /* ================= SAVE (ADD / EDIT) ================= */
  const handleSave = async (itemData) => {
    try {
      const url = editingItem
        ? `/api/inventory/${editingItem._id}`
        : '/api/inventory';

      const method = editingItem ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        },
        body: JSON.stringify(itemData)
      });

      if (!res.ok) throw new Error('Failed to save item');

      await fetchItems();
      setShowForm(false);
      setEditingItem(null);
    } catch (err) {
      alert(err.message);
    }
  };

  /* ================= STOCK IN ================= */
 const handleIn = async (item) => {
  await fetch(`/api/inventory/${item._id}/in`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    }
  });
  fetchItems();
};







  /* ================= STOCK OUT ================= */
 const handleOut = async (item) => {
  await fetch(`/api/inventory/${item._id}/out`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    }
  });
  fetchItems();
};
  /* ================= DELETE ================= */
  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    await fetch(`/api/inventory/${itemToDelete._id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    });

    setConfirmOpen(false);
    setItemToDelete(null);
    fetchItems();
  };

  /* ================= FILTER ================= */
  const filteredItems = items.filter(item =>
    selectedCategory === 'All'
      ? true
      : item.category === selectedCategory
  );

  /* ================= AUTH GATE ================= */
  if (!isAuthenticated) {
    return authPage === 'login' ? (
      <Login
        onLogin={() => setIsAuthenticated(true)}
        onSwitch={() => setAuthPage('signup')}
      />
    ) : (
      <Signup onSwitch={() => setAuthPage('login')} />
    );
  }

  /* ================= UI ================= */
  return (
    <div className="app-container">
      <CategoryNav
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        showForm={showForm}
        toggleForm={() => {
          setEditingItem(null);
          setShowForm(!showForm);
        }}
        onLogout={() => {
          sessionStorage.removeItem('token');
          setIsAuthenticated(false);
        }}
      />

      {/* 🔑 ALERTS SHOWN ONLY WHEN FORM IS CLOSED */}
      {!showForm && <AlertBanner items={filteredItems} />}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {showForm && (
        <InventoryForm
          onSubmit={handleSave}
          initialData={editingItem}
          onCancel={() => {
            setShowForm(false);
            setEditingItem(null);
          }}
        />
      )}

      {loading ? (
        <p>Loading inventory...</p>
      ) : (
        <InventoryTable
          items={filteredItems}
          onEdit={(item) => {
            setEditingItem(item);
            setShowForm(true);
          }}
          onIn={handleIn}
          onOut={handleOut}
          onDelete={handleDeleteClick}
        />
      )}

      <ConfirmDialog
        open={confirmOpen}
        message={`Are you sure you want to delete "${itemToDelete?.name}"?`}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
      />

      <footer className="app-footer">
        © {new Date().getFullYear()} <strong>AlmaCen</strong>. All rights reserved.
      </footer>
    </div>
  );
}

export default App;

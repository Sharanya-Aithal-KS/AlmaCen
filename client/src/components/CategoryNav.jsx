import './CategoryNav.css';

const CategoryNav = ({
  selectedCategory,
  setSelectedCategory,
  showForm,
  toggleForm,
  onLogout
}) => {
  const categories = [
    'All',
    'Daily Essentials',
    'Electronics',
    'Fashions',
    'Groceries',
    'Stationeries',
    'Toys & Games'
  ];

  return (
    <div className="category-nav">
      <h1 className="nav-brand">
        <span className="brand-gradient">Alma</span>
        <span className="brand-gradient">Cen</span>
      </h1>
      {categories.map(category => (
        <div
          key={category}
          className={`nav-tab ${
            selectedCategory === category ? 'active' : ''
          }`}
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </div>
      ))}

      <div
        className="nav-tab add-tab"
        onClick={toggleForm}
      >
        {showForm ? 'Close Form' : '+ Add Item'}
      </div>

      <div
        className="nav-tab logout-tab"
        onClick={onLogout}
      >
        Logout
      </div>
    </div>
  );
};

export default CategoryNav;

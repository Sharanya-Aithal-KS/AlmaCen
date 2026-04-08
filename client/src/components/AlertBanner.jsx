import './AlertBanner.css';

const AlertBanner = ({ items }) => {
  const lowStockItems = items.filter(
    item =>
      item.quantity > 0 &&
      item.quantity <= item.lowStockThreshold
  );

  const outOfStockItems = items.filter(
    item => item.quantity === 0
  );

 return (
  <div className="alert-container">
    {/* OUT OF STOCK ALERT */}
    {outOfStockItems.length > 0 && (
      <div className="alert-banner alert-out">
        <h3>❌ Out of Stock Alert</h3>
        <ol>
          {outOfStockItems.map(item => (
            <li key={item._id}>
              <strong>{item.name}</strong> are currently unavailable
            </li>
          ))}
        </ol>
      </div>
    )}

    {/* LOW STOCK ALERT */}
    {lowStockItems.length > 0 && (
      <div className="alert-banner alert-low">
        <h3>⚠️ Low Stock Alert</h3>
        <ol>
          {lowStockItems.map(item => (
            <li key={item._id}>
              <strong>{item.name}</strong> are low on stock (Qty: {item.quantity})
            </li>
          ))}
        </ol>
      </div>
    )}
  </div>
);

};

export default AlertBanner;

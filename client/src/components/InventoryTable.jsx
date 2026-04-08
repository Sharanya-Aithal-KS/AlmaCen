import React from 'react';
import './InventoryTable.css';

const InventoryTable = ({ items, onEdit, onDelete, onOut, onIn }) => {
  return (
    <div className="table-container">
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Stock In</th>
            <th>Stock Out</th>
            <th>Stock Trend</th>
            <th>Status</th>
            <th>Stocks</th>
            <th>Controls</th>
          </tr>
        </thead>

        <tbody>
          {items.map(item => {
            const isOutOfStock = item.quantity === 0;
            const isLowStock =
              item.quantity > 0 &&
              item.quantity <= item.lowStockThreshold;

            const stockIn = item.stockIn ?? 0;
            const stockOut = item.stockOut ?? 0;

            let trendLabel = 'Stable';
            let trendClass = 'trend-stable';

            if (stockIn < stockOut) {
              trendLabel = 'Increasing';
              trendClass = 'trend-up';
            } else if (stockIn > stockOut) {
              trendLabel = 'Decreasing';
              trendClass = 'trend-down';
            }

            return (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>₹{item.price}</td>
                <td>{item.category || '-'}</td>
                
                <td className={isOutOfStock ? 'text-danger' : ''}>
                  {item.quantity}
                </td>
                <td className="text-success">{stockIn}</td>
                <td className="text-danger">{stockOut}</td>

                {/* STOCK TREND */}
                <td>
                  <span className={`trend-badge ${trendClass}`}>
                    {trendLabel}
                  </span>
                </td>

                

                {/* STATUS */}
                <td>
                  {isOutOfStock ? (
                    <span className="badge badge-out">Out of Stock</span>
                  ) : isLowStock ? (
                    <span className="badge badge-low">Low Stock</span>
                  ) : (
                    <span className="badge badge-in">In Stock</span>
                  )}
                </td>

                {/* STOCK ACTIONS */}
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn-icon in"
                      onClick={() => onIn(item)}
                    >
                      IN
                    </button>

                    <button
                      className="btn-icon out"
                      onClick={() => onOut(item)}
                      disabled={item.quantity === 0}
                    >
                      OUT
                    </button>
                  </div>
                </td>

                {/* CONTROL ACTIONS */}
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn-icon edit"
                      onClick={() => onEdit(item)}
                    >
                      Modify
                    </button>

                    <button
                      className="btn-icon delete"
                      onClick={() => onDelete(item)}
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}

          {items.length === 0 && (
            <tr>
              <td colSpan="10" className="no-data">
                No inventory items found. Add one above!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;

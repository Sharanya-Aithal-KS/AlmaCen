import './ConfirmDialog.css';

const ConfirmDialog = ({ open, message, onConfirm, onCancel }) => {
  if (!open) return null;

  return (
    <div className="confirm-overlay">
      <div className="confirm-box">
        <h3 className="nav-brand">
        <span className="brand-gradient">Alma</span>
        <span className="brand-gradient">Cen</span>
        <span className="brand-gradient1">  says:</span>
      </h3>
        <p>{message}</p>

        <div className="confirm-actions">
          <button className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;

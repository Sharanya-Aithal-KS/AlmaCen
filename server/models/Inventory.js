const mongoose = require('mongoose');
const inventorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  stockIn: {
  type: Number,
  default: 0
},
stockOut: {
  type: Number,
  default: 0
},
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: false,
  },
  lowStockThreshold: {
    type: Number,
    default: 10,
  },
}, { timestamps: true });
// Virtual property to check low stock status
inventorySchema.virtual('isLowStock').get(function() {
  return this.quantity < this.lowStockThreshold;
});
inventorySchema.set('toJSON', { virtuals: true });
inventorySchema.set('toObject', { virtuals: true });
module.exports = mongoose.model('Inventory', inventorySchema);
import React, { useState } from 'react';

const OffersForm = ({ onSubmit, initialData = {} }) => {
  const [offer, setOffer] = useState({
    discount_percentage: initialData.discount_percentage || 0,
    start_date: initialData.start_date || '',
    end_date: initialData.end_date || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(offer);
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border rounded">
      <label>Discount %</label>
      <input type="number" step="0.01" value={offer.discount_percentage} onChange={(e) => setOffer({...offer, discount_percentage: e.target.value})} className="form-control mb-2" required />
      <label>Start Date</label>
      <input type="date" value={offer.start_date} onChange={(e) => setOffer({...offer, start_date: e.target.value})} className="form-control mb-2" required />
      <label>End Date</label>
      <input type="date" value={offer.end_date} onChange={(e) => setOffer({...offer, end_date: e.target.value})} className="form-control mb-2" required />
      <button type="submit" className="btn btn-warning w-100">Save Offer</button>
    </form>
  );
};
export default OffersForm;
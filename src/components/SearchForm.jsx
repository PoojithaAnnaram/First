import { useState } from 'react';

const CASE_TYPES = [
  'CRL (Criminal)',
  'CS (Civil Suit)',
  'WP (Writ Petition)',
  'CRA (Criminal Appeal)',
  'CA (Civil Appeal)',
  'MA (Miscellaneous Application)',
  'CRLA (Criminal Appeal)',
  'FAO (First Appeal from Order)',
];

const COURTS = [
  'Delhi High Court',
  'Bombay High Court',
  'Calcutta High Court',
  'Madras High Court',
  'Karnataka High Court',
  'Kerala High Court',
  'Allahabad High Court',
  'Rajasthan High Court',
  'Gujarat High Court',
  'Patna High Court',
];

function SearchForm({ onSearch, loading }) {
  const [formData, setFormData] = useState({
    caseType: 'CRL (Criminal)',
    caseNumber: '',
    year: new Date().getFullYear().toString(),
    court: 'Delhi High Court',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.caseNumber) {
      alert('Please enter a case number');
      return;
    }
    onSearch(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="court">Court</label>
          <select
            id="court"
            name="court"
            value={formData.court}
            onChange={handleChange}
          >
            {COURTS.map((court) => (
              <option key={court} value={court}>
                {court}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="caseType">Case Type</label>
          <select
            id="caseType"
            name="caseType"
            value={formData.caseType}
            onChange={handleChange}
          >
            {CASE_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="caseNumber">Case Number</label>
          <input
            type="text"
            id="caseNumber"
            name="caseNumber"
            placeholder="Enter case number"
            value={formData.caseNumber}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="year">Year</label>
          <input
            type="number"
            id="year"
            name="year"
            min="1950"
            max={new Date().getFullYear()}
            value={formData.year}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="button-group">
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? (
            <>
              <span className="loading"></span>
              Fetching...
            </>
          ) : (
            'Search Case'
          )}
        </button>
      </div>
    </form>
  );
}

export default SearchForm;

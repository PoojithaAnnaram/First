import { useState } from 'react';
import Captcha from './Captcha';
import { useToast } from '../contexts/ToastContext';

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
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [errors, setErrors] = useState({});
  const { addToast } = useToast();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.caseNumber.trim()) {
      newErrors.caseNumber = 'Case number is required';
    }

    if (!formData.year || formData.year < 1950 || formData.year > new Date().getFullYear()) {
      newErrors.year = 'Please enter a valid year';
    }

    if (!captchaVerified) {
      newErrors.captcha = 'Please verify CAPTCHA';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      addToast('Please fix the errors in the form', 'error');
      return;
    }

    onSearch(formData);
    setCaptchaVerified(false);
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
            className={errors.caseNumber ? 'input-error' : ''}
          />
          {errors.caseNumber && <span className="error-text">{errors.caseNumber}</span>}
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
            className={errors.year ? 'input-error' : ''}
          />
          {errors.year && <span className="error-text">{errors.year}</span>}
        </div>
      </div>

      <div className="form-group" style={{ gridColumn: '1 / -1' }}>
        <label>Security Verification</label>
        <Captcha onVerify={setCaptchaVerified} />
        {errors.captcha && <span className="error-text">{errors.captcha}</span>}
      </div>

      <div className="button-group">
        <button type="submit" className="btn-primary" disabled={loading || !captchaVerified}>
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

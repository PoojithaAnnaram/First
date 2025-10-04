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

const STATES = [
  'Andhra Pradesh',
  'Bihar',
  'Chhattisgarh',
  'Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Tamil Nadu',
  'Telangana',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
];

const DISTRICTS = {
  'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool'],
  'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Darbhanga'],
  'Chhattisgarh': ['Raipur', 'Bilaspur', 'Durg', 'Korba', 'Rajnandgaon'],
  'Delhi': ['Central Delhi', 'East Delhi', 'New Delhi', 'North Delhi', 'South Delhi', 'West Delhi'],
  'Goa': ['North Goa', 'South Goa'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar'],
  'Haryana': ['Faridabad', 'Gurgaon', 'Hisar', 'Rohtak', 'Panipat'],
  'Himachal Pradesh': ['Shimla', 'Kangra', 'Mandi', 'Solan', 'Una'],
  'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Deoghar'],
  'Karnataka': ['Bengaluru Urban', 'Mysuru', 'Hubli', 'Mangaluru', 'Belagavi'],
  'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kollam'],
  'Madhya Pradesh': ['Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Ujjain'],
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik'],
  'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur', 'Sambalpur'],
  'Punjab': ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda'],
  'Rajasthan': ['Jaipur', 'Jodhpur', 'Kota', 'Bikaner', 'Udaipur'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem'],
  'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Khammam', 'Karimnagar'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Ghaziabad', 'Agra', 'Varanasi'],
  'Uttarakhand': ['Dehradun', 'Haridwar', 'Roorkee', 'Haldwani', 'Rudrapur'],
  'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri'],
};

const COURT_LEVELS = [
  'High Court',
  'District Court',
  'Sessions Court',
  'Civil Court',
  'Magistrate Court',
];

function SearchForm({ onSearch, loading }) {
  const [formData, setFormData] = useState({
    caseType: 'CRL (Criminal)',
    caseNumber: '',
    year: new Date().getFullYear().toString(),
    state: 'Delhi',
    district: 'Central Delhi',
    courtLevel: 'High Court',
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
    const { name, value } = e.target;

    if (name === 'state') {
      setFormData({
        ...formData,
        state: value,
        district: DISTRICTS[value][0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="state">State</label>
          <select
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
          >
            {STATES.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="district">District</label>
          <select
            id="district"
            name="district"
            value={formData.district}
            onChange={handleChange}
          >
            {DISTRICTS[formData.state].map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="courtLevel">Court Level</label>
          <select
            id="courtLevel"
            name="courtLevel"
            value={formData.courtLevel}
            onChange={handleChange}
          >
            {COURT_LEVELS.map((level) => (
              <option key={level} value={level}>
                {level}
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

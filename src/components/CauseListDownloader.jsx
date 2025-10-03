import { useState } from 'react';

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

function CauseListDownloader() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [selectedCourt, setSelectedCourt] = useState('Delhi High Court');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const handleDownload = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/download-cause-list`;
      const headers = {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          court: selectedCourt,
          date: selectedDate,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to download cause list');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cause-list-${selectedCourt.replace(/\s+/g, '-')}-${selectedDate}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="section-title">Download Cause List</h2>
      <p className="subtitle">Download daily cause lists for scheduled hearings</p>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="cause-court">Court</label>
          <select
            id="cause-court"
            value={selectedCourt}
            onChange={(e) => setSelectedCourt(e.target.value)}
          >
            {COURTS.map((court) => (
              <option key={court} value={court}>
                {court}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="cause-date">Date</label>
          <input
            type="date"
            id="cause-date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </div>

      <div className="button-group">
        <button
          type="button"
          className="btn-secondary"
          onClick={handleDownload}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="loading"></span>
              Downloading...
            </>
          ) : (
            'Download Cause List'
          )}
        </button>
      </div>

      {error && <div className="error">{error}</div>}
      {success && (
        <div style={{
          background: '#c6f6d5',
          color: '#22543d',
          padding: '16px',
          borderRadius: '8px',
          marginTop: '16px',
          fontSize: '14px'
        }}>
          Cause list downloaded successfully!
        </div>
      )}
    </div>
  );
}

export default CauseListDownloader;

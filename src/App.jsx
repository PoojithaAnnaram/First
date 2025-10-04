import { useState } from 'react';
import SearchForm from './components/SearchForm';
import CaseResults from './components/CaseResults';
import CauseListDownloader from './components/CauseListDownloader';
import Header from './components/Header';
import { useToast } from './contexts/ToastContext';

function App() {
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { addToast } = useToast();

  const handleSearch = async (searchParams) => {
    setLoading(true);
    setError(null);
    setCaseData(null);

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/fetch-case-data`;
      const headers = {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(searchParams),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch case data');
      }

      const data = await response.json();
      setCaseData(data);
      addToast('Case data fetched successfully!', 'success');
    } catch (err) {
      setError(err.message);
      addToast('Failed to fetch case data', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="main-content">
        <div className="container">
          <h1>Court Data Fetcher</h1>
          <p className="subtitle">
            Fetch case details, judgments, and orders from Indian High Courts and District Courts
          </p>
          <SearchForm onSearch={handleSearch} loading={loading} />
          {error && <div className="error">{error}</div>}
        </div>

        <div className="container">
          <CauseListDownloader />
        </div>

        {caseData && <CaseResults data={caseData} />}
      </div>
    </>
  );
}

export default App;

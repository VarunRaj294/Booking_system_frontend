import React, { useState } from 'react';
import DatasetUploader from '../components/CSVUploader';
import './DatasetUploadPage.css';

const DatasetUploadPage = () => {
  const [uploadedData, setUploadedData] = useState(null);

  const handleDataUpload = (data) => {
    setUploadedData(data);
    console.log('Uploaded data:', data);
    // Here you can process the data or send it to your backend
  };

  return (
    <div className="dataset-upload-page">
      <h2>Dataset Management</h2>
      <DatasetUploader onDataUpload={handleDataUpload} />
      
      {uploadedData && (
        <div className="data-preview">
          <h3>Data Preview</h3>
          <div className="preview-table">
            <table>
              <thead>
                <tr>
                  {Object.keys(uploadedData[0]).map((header) => (
                    <th key={header}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {uploadedData.slice(0, 5).map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, i) => (
                      <td key={i}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>Showing first 5 rows of {uploadedData.length} total rows</p>
        </div>
      )}
    </div>
  );
};

export default DatasetUploadPage; 
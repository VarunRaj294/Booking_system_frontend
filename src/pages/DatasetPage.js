import React from 'react';
import DatasetManager from '../components/DatasetManager';
import './DatasetPage.css';

const DatasetPage = () => {
  return (
    <div className="dataset-page">
      <div className="page-header">
        <h1>Dataset Management</h1>
        <p>Upload, view, and manage your datasets</p>
      </div>
      <DatasetManager />
    </div>
  );
};

export default DatasetPage; 
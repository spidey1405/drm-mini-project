import React from 'react';
import Table from './components/Table/Table';
import classes from './App.module.scss';

function App() {
  return (
    <div className={classes.ScreenDisplay}>
      <h1 className={classes.Header}>Product Data</h1>
      <Table />
    </div>
  );
}

export default App;

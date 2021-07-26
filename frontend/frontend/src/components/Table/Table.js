import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import classes from './Table.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import Spinner from '../spinner/spinner';

import {
  getFromDatabase,
  getAllCategories,
  getAllSubCategories,
  dbValues,
  isLoading,
  alterEdit,
  updateSubCategory,
  updateInputField,
  addToDatabase,
  validateEntry,
} from '../../features/backendConnect/backendSlice';

const columns = [
  {
    field: 'productName',
    headerName: 'Product',
    flex: 1,
    minWidth: 200,
    editable: true,
  },
  {
    field: 'subcategory',
    headerName: 'Sub Category',
    width: 200,
    editable: true,
  },
  {
    field: 'category',
    headerName: 'Category',
    width: 200,
    editable: true,
  },
];
// const rows = [
//   //{ id: 4, product: '', subcategory: '', category: '', endRow: true },
// ];

export default function DataTable(props) {
  const dispatch = useDispatch();
  const {
    rows,
    editMode,
    categories,
    subcategories,
    categorySelected,
    subcategorySelected,
    newProductInput,
    validEntry,
    errorMessage,
  } = useSelector(dbValues);
  const loading = useSelector(isLoading);
  React.useEffect(() => {
    /*
      Loading the data from the database in this way is
      not a feasible solution for large scale apps, instead something like
      pagination would work, but for the sake of simplcity, I am loading it
      this way.
    */
    dispatch(getFromDatabase());
    dispatch(getAllCategories());
    dispatch(getAllSubCategories());
  }, [dispatch]);
  return (
    <div style={{ height: 400, width: '100%' }}>
      {loading && <Spinner />}
      <div className={classes.Button}>
        <Button
          variant='contained'
          onClick={() => {
            if (!editMode) dispatch(alterEdit());
            else {
              dispatch(addToDatabase());
              dispatch(alterEdit());
            }
          }}>
          {' '}
          {editMode ? 'Save' : 'Add'}
        </Button>
      </div>
      {editMode && (
        <div className={classes.Row}>
          <input
            className={classes.InputBox}
            value={newProductInput}
            placeholder={'Product Name'}
            onChange={(event) => {
              dispatch(updateInputField(event.target.value));
              dispatch(validateEntry());
            }}
          />
          <Select
            options={subcategories}
            placeholder={'Choose Sub Category'}
            onChange={(item) => {
              dispatch(updateSubCategory(item));
            }}
            value={subcategorySelected}
          />
          <Select
            value={categorySelected}
            options={categories}
            placeholder={'Category'}
          />
        </div>
      )}

      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        checkboxSelection
        disableSelectionOnClick
        isCellEditable={(params) => params.row.endRow}
      />
      {!validEntry && errorMessage !== null && (
        <p className={classes.popupMessage}>Error Happened: {errorMessage}</p>
      )}
    </div>
  );
}

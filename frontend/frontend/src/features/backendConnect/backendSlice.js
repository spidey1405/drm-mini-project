import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { updateddb, getData, getCategories, getSubCategories } from './dbAPI';

const initialState = {
  rows: [],
  status: 'idle',
  editMode: false,
  categories: [],
  subcategories: [],
  categorySelected: null,
  subcategorySelected: null,
  newProductInput: '',
  validEntry: false,
  errorMessage: null,
};

export const addToDatabase = createAsyncThunk(
  'backend/addToDatabase',
  async (arg, { dispatch, getState }) => {
    const state = getState();
    if (!state.dbSlice.validEntry) {
      alert('Invalid Format. Please cross check the inputs.');
      return {};
    }
    const requestObject = {
      productName: state.dbSlice.newProductInput,
      subCategoryType: state.dbSlice.subcategorySelected.value,
    };
    const response = await updateddb(requestObject);
    console.log('Response = ', response);
    await dispatch(getFromDatabase());
    //const response = await updateddb();
    return response;
  }
);

export const getFromDatabase = createAsyncThunk(
  'backend/getFromDatabase',
  async () => {
    const response = await getData();
    return response;
  }
);

export const getAllCategories = createAsyncThunk(
  'backend/getCategories',
  async () => {
    const response = await getCategories();
    return response;
  }
);

export const getAllSubCategories = createAsyncThunk(
  'backend/getSubCategories',
  async () => {
    const response = await getSubCategories();
    return response;
  }
);

export const dbSlice = createSlice({
  name: 'dbAPI',
  initialState,
  reducers: {
    alterEdit: (state) => {
      state.editMode = !state.editMode;
      if (!state.editMode) {
        state.newProductInput = '';
      }
    },
    changeEdit: (state, action) => {
      state.editMode = action.payload.value;
    },
    updateSubCategory: (state, action) => {
      state.subcategorySelected = action.payload;
      const category = state.categories.filter(
        (element) => element.label === action.payload.category
      );
      state.categorySelected = category;
    },
    updateInputField: (state, action) => {
      state.newProductInput = action.payload;
    },
    validateEntry: (state, action) => {
      let regexExp = /^[a-z\d\-_\s]+$/i;
      if (state.newProductInput.length < 3) {
        state.errorMessage = 'Product name cannot be less than 3.';
        state.validEntry = false;
      } else if (!regexExp.test(state.newProductInput)) {
        state.errorMessage =
          'Name must only have spaces, dashes and alpha numeric characters.';
        state.validEntry = false;
      } else {
        state.validEntry = true;
        state.errorMessage = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFromDatabase.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getFromDatabase.fulfilled, (state, action) => {
        state.rows = action.payload;
        state.validEntry = false;
        state.status = 'idle';
      })
      .addCase(getFromDatabase.rejected, (state, action) => {
        console.log('Action Rejected = ', action);
        state.status = 'error';
      });

    builder
      .addCase(addToDatabase.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToDatabase.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      .addCase(addToDatabase.rejected, (state, action) => {
        console.log('Action = ', action);
        state.status = 'error';
      });

    builder
      .addCase(getAllCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload.map((element) => ({
          label: element['categoryType'],
          value: element.id,
        }));
        state.status = 'idle';
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.status = 'error';
      });

    builder
      .addCase(getAllSubCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllSubCategories.fulfilled, (state, action) => {
        state.subcategories = action.payload.map((element) => ({
          label: element['subcategoryType'],
          value: element.id,
          category: element['categoryTitle'],
        }));
        state.subcategorySelected = state.subcategories[0];
        const category = state.categories.filter(
          (element) => element.label === state.subcategories[0].category
        );
        state.categorySelected = category;
        state.status = 'idle';
      })
      .addCase(getAllSubCategories.rejected, (state, action) => {
        console.log('Action = ', action);
        state.status = 'error';
      });
  },
});

export const {
  alterEdit,
  validateEntry,
  changeEdit,
  updateSubCategory,
  updateInputField,
} = dbSlice.actions;
export const dbValues = (state) => state.dbSlice;
export const isLoading = (state) => state.dbSlice.status === 'loading';

export default dbSlice.reducer;

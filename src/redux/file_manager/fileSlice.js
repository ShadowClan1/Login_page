import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import constants from "../../config/constants";
const initialState = {
  current: [],
  copy: [],
  move: [],
  parentId: 0,
  currentDir: [{ id: 0, name: "root" }],
};
function createData(id, name, size, createdAt) {
  return {
    id,
    name,
    size,
    createdAt,
  };
}
initialState.current = [
  createData(1, "Cupcake", 305, 3.7, 67, 4.3),
  createData(2, "Donut", 452, 25.0, 51, 4.9),
  createData(3, "Eclair", 262, 16.0, 24, 6.0),
  createData(4, "Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData(5, "Gingerbread", 356, 16.0, 49, 3.9),
];

export const fetchCurrentDirThunk = createAsyncThunk(
  "file/fetchCurrentDir",
  async (parentDir, thunkAPI) => {
    const data = await axios.get(
      `${constants.BACKEND_URL}/fileManager/dir?q=${parentDir}`
    );
    console.log(data);
    if (data.status === 200) {
      return data.data.dirs;
    } else return [];
  }
);
export const createFolderReducerThunk = createAsyncThunk(
  "file/createFolderReducer",
  async (payload, thunkAPI) => {
    const data = await axios.post(
      `${constants.BACKEND_URL}/fileManager/createDir`,
      { ...payload, parentDir: thunkAPI.getState().fileManager.parentId }
    );
    console.log(data);
    if (data.status === 200) {
      console.log(data, 'data for dir is here')
      return data.data.dir;
    } else return {};
  }
);
export const deleteFileOrDirThunk = createAsyncThunk(
  "file/deleteFileOrDirThunk",
  async (payload, thunkAPI) => {
    let currentArray = thunkAPI.getState().fileManager.current;
    const toDelete = payload.map(e=>currentArray.find(ele => ele.id === e));

    const data = await axios.post(
      `${constants.BACKEND_URL}/fileManager/delete`,
      {array : toDelete}
    );
    
    if (data.status === 200) {
      return payload;
    } else return {};
  }
);

export const uploadFileReducerThunk = createAsyncThunk(
  "file/uploadFile",
  async (files, thunkAPI) => {
    const formData = new FormData();
    formData.append("parentDir", thunkAPI.getState().fileManager.parentId);
    // console.log(files, "files", Array.from(files))
    Array.from(files).forEach((file, index) => {
      formData.append(`files`, file);
    });
    const res = await axios.post(
      `${constants.BACKEND_URL}/fileManager/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

   if(res.status == 200) {
    return res.data.files
   }
  }
);
export const pasteItemsThunk = createAsyncThunk(
  "file/pasteItemsThunk",
  async ({files , type}, thunkAPI) => {

    const res = await axios.post(
      `${constants.BACKEND_URL}/fileManager/paste`,
      {files, type, parentDir :thunkAPI.getState().fileManager.parentId }
    );
      
    if(res.status === 200) {
      return type == 'COPY' ? res.data.data : files
    }
  
  }
);
export const renameFileThunk = createAsyncThunk(
  "file/renameFileThunk",
  async ({file , newName}, thunkAPI) => {

    const res = await axios.post(
      `${constants.BACKEND_URL}/fileManager/rename`,
      {file, newName }
    );
      
    if(res.status === 200) {
      return {...file, name : newName }
    }
  
  }
);

//{id, key, name, size, createdAt}
const fileSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    createFolderReducer: (state, { payload }) => {
      payload.id = state.current.length + 1;
      state.current = [...state.current, { ...payload }];
    },
    deleteFileReducer: (state, { payload: { list } }) => {
      console.log(list, "this is list");
      state.current = state.current.filter((e) => !list.includes(e.id));
    },
    moveFileReducer: (state, { payload }) => {
      state.move = payload;
    },
    copyFileReducer: (state, { payload }) => {
      state.copy = payload
      
    },
    setParentId: (state, { payload: { id, name } }) => {
      state.parentId = id;
      let indexOf = state.currentDir.findIndex((e) => e.id === id);
      if (indexOf === -1) {
        state.currentDir = [...state.currentDir, { id, name }];
      } else {
        state.currentDir = state.currentDir.filter((e, i) => i <= indexOf);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentDirThunk.pending, (state) => {
        // Set the status to 'loading' when the async thunk is pending
        // state.status = 'loading';
      })
      .addCase(fetchCurrentDirThunk.fulfilled, (state, action) => {
        // Set the status to 'succeeded' and update the data when the async thunk is fulfilled
        // state.status = 'succeeded';
        state.current = action.payload;
      })
      .addCase(createFolderReducerThunk.fulfilled, (state, action) => {
        // Set the status to 'succeeded' and update the data when the async thunk is fulfilled
        // state.status = 'succeeded';
        state.current = [...state.current, { ...action.payload }];
      })
      .addCase(fetchCurrentDirThunk.rejected, (state, action) => {
        // Set the status to 'failed' and store the error when the async thunk is rejected
        // state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(uploadFileReducerThunk.fulfilled, (state, action) => {
        state.current = [...state.current, ...action.payload]
       })
      .addCase(deleteFileOrDirThunk.fulfilled, (state, action) => {
        state.current = state.current.filter((e) => !action.payload.includes(e.id))
       })
      .addCase(pasteItemsThunk.fulfilled, (state, action) => {
        state.current = [...state.current , ...action.payload]
        state.copy = []
        state.move = []
       })
      .addCase(renameFileThunk.fulfilled, (state, {payload}) => {
        state.current = [...state.current.filter(e=>e.id!=payload.id), payload]
       });
  },
});

export const { createFolderReducer, deleteFileReducer, setParentId , moveFileReducer, copyFileReducer} =
  fileSlice.actions;
export default fileSlice.reducer;

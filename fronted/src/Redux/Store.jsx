// import storage from "redux-persist/lib/storage";
// import { persistStore,persistReducer } from "redux-persist";

// const persistconfig={
//     key:"user",
//     storage
// }
// const persistreducer = persistReducer(persistconfig , Users);
// const store = configureStore({
//     reducer:{
//         Users:persistreducer
//     }
// });
// const persist = persistStore(store);
// export {persist,store};
import { configureStore } from "@reduxjs/toolkit";
// ////////////////////
import Users from "./Reducers";

import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";



import storage from "redux-persist/lib/storage";




const store = configureStore({
  reducer: {
    user: persistReducer(
      {
        key: "user",
        storage,
      },
      Users
    ),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { persistor, store };

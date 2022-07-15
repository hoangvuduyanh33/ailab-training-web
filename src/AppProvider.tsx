import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { persistor, store } from "./app/store";
import theme from "./theme";
import App from "./App";
import { PersistGate } from "redux-persist/integration/react";
const AppProvider: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<></>} persistor={persistor}>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </PersistGate>
    </Provider>
  );
};

export default AppProvider;

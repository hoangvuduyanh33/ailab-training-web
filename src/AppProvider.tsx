import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import theme from "./theme";
import App from "./App";
const AppProvider: React.FC = () => {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Provider>
  );
};

export default AppProvider;

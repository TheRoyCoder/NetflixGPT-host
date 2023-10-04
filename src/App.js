import Body from "./component/Body";
import { Provider } from "react-redux";
import appStore from "./utils/redux/appStore";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Provider store={appStore}>
      <Body />
    </Provider>
  );
}

export default App;

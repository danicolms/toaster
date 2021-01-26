import React, { useEffect } from "react";
import { render } from "react-dom";
import ToastProvider, { useToast } from "./components/ToasterManager";

const TestComponent = () => {
  const toastActions = useToast();

  useEffect(() => {
    if (toastActions) {
      toastActions.addToast("Hello", "success");
      toastActions.addToast("Hello", "error");
      toastActions.addToast("Hello", "warning");
      toastActions.addToast("Hello", "info");
    }
  }, []);
  return <div style={{ height: "100vh" }}> Im a test component</div>;
};

class App extends React.Component {
  render() {
    return (
      <ToastProvider>
        <TestComponent></TestComponent>
      </ToastProvider>
    );
  }
}

render(<App />, document.getElementById("root"));

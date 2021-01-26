import React, { useEffect } from "react";
import { render } from "react-dom";
import ToastProvider, { useToast } from "./components/ToasterManager";

const TestComponent = () => {
  const toastActions = useToast();

  useEffect(() => {
    if (toastActions) {
      toastActions.addToast("Hello", "success");
    }
  }, []);
  return <div style={{ height: "100vh" }}> Im a test component</div>;
};

const SUCCESS = (message) => (
  <div style={{ background: "red" }}> {message}</div>
);
class App extends React.Component {
  render() {
    return (
      <ToastProvider toastComponents={{ success: SUCCESS }}>
        <TestComponent></TestComponent>
      </ToastProvider>
    );
  }
}

render(<App />, document.getElementById("root"));

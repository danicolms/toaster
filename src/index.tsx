import React, { useEffect } from "react";
import { render } from "react-dom";
import ToastProvider, { useToast } from "@danicolms/toaster";

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

const SUCCESS = (message) => (
  <div style={{ background: "green" }}> {message}</div>
);
const ERROR = (message) => <div style={{ background: "red" }}> {message}</div>;
const WARNING = (message) => (
  <div style={{ background: "yellow" }}> {message}</div>
);
const INFO = (message) => <div style={{ background: "blue" }}> {message}</div>;
class App extends React.Component {
  render() {
    return (
      <ToastProvider
        toastComponents={{
          success: SUCCESS,
          error: ERROR,

         
        }}
      >
        <TestComponent></TestComponent>
      </ToastProvider>
    );
  }
}

render(<App />, document.getElementById("root"));

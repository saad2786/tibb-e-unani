import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Member from "./page/Member";
import Record from "./page/Record";
import Home from "./page/Home";
import Records from "./features/Record/Records";
import Entry from "./page/Entry";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />
            <Route path="members" element={<Member />} />
            <Route path="records" element={<Record />} />
            <Route path="record/:recordId" element={<Records />} />
            <Route path="entry/:entryId" element={<Entry />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={36}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 5000,
          style: {
            background: "#fff",
            color: "#222831",
            fontWeight: 500,
            fontSize: 18,
          },

          success: {
            duration: 4000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
          error: {
            duration: 5000,
            theme: {
              primary: "red",
              secondary: "black",
            },
          },
        }}
      />
    </QueryClientProvider>
  );
};

export default App;

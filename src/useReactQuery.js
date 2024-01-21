"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import EstateInfo from "./pages/dashboard/enterprise/estates/estateInfo/estateInfo";
import EstateInfoII from "./pages/dashboard/enterprise/estates/estateInfo/components/estateInfo";
import PropertyDetails from "./pages/dashboard/owner/propertylisting/property/components/propertyDetails";
import Property from "./pages/dashboard/owner/propertylisting/property/property";
import Estate from "./pages/dashboard/enterprise/estates/estates";

export const ReactQueryProvider = () => {
  const queryClient = new QueryClient();
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <EstateInfo />
        <EstateInfoII />
        <PropertyDetails />
        <Property />
        <Estate />
      </QueryClientProvider>
    </div>
  );
};

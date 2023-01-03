import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import * as ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import theme from "./theme";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(container);
const queryClient = new QueryClient();

root.render(
    <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <ChakraProvider theme={theme}>
            <RouterProvider router={router} />
        </ChakraProvider>
    </QueryClientProvider>
);

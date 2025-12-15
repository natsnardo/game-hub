"use client";

import type { ReactNode } from "react";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";

export function Provider(props: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      disableTransitionOnChange
      defaultTheme="dark"
      enableSystem={false}
    >
      <ChakraProvider value={defaultSystem}>{props.children}</ChakraProvider>
    </ThemeProvider>
  );
}

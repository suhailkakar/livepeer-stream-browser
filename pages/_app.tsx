import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react";

export default function App({ Component, pageProps }: AppProps) {
  const client = createReactClient({
    provider: studioProvider({
      apiKey: "881598cf-c59f-4df3-bc81-19a0cf826462",
    }),
  });

  return (
    <LivepeerConfig client={client}>
      <Component {...pageProps} />
    </LivepeerConfig>
  );
}

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
      apiKey: "4d824972-f6e6-4437-b3f8-25d6db1087ea",
    }),
  });

  return (
    <LivepeerConfig client={client}>
      <Component {...pageProps} />
    </LivepeerConfig>
  );
}

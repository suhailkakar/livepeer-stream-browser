import Nav from "@/components/Nav";
import { Player } from "@livepeer/react";
import { useRouter } from "next/router";
import React from "react";

export default function Watch() {
  const router = useRouter();

  const { id } = router.query;

  return (
    <div>
      <Nav />
      <div className="flex items-center w-screen justify-center mt-20">
        <div className="w-2/3">
          <Player showPipButton playbackId={id as string} />
        </div>
      </div>
    </div>
  );
}

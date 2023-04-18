import Nav from "@/components/Nav";
import Button from "@/components/shared/Button";
import Input from "@/components/shared/Input";
import { useCreateStream } from "@livepeer/react";
import React, { useEffect, useRef, useState } from "react";
import { Client } from "@livepeer/webrtmp-sdk";
import Link from "next/link";

export default function Create(): JSX.Element {
  const [streamName, setStreamName] = useState<string>("");
  const [isLive, setIsLive] = useState<boolean>(false);
  const video = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const { mutate: createStream, data: stream } = useCreateStream({
    name: streamName,
  });

  useEffect(() => {
    (async () => {
      if (stream) {
        if (video.current) {
          video.current.volume = 0;

          streamRef.current = await navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: true,
          });

          video.current.srcObject = streamRef.current;
          video.current.play();
          goLive();
        }
      }
    })();
  }, [stream]);

  const goLive = () => {
    const streamKey = stream?.streamKey;
    console.log("asd");
    if (!streamRef.current) {
      alert("Video stream was not started.");
    }

    if (!streamKey) {
      alert("Invalid streamKey.");
      return;
    }

    const client = new Client();

    // @ts-ignore
    const session = client.cast(streamRef.current, streamKey);
    setIsLive(true);
    session.on("open", () => {
      console.log("Stream started.");
    });

    session.on("close", () => {
      console.log("Stream stopped.");
    });

    session.on("error", (err) => {
      console.log("Stream error.", err.message);
    });
  };

  return (
    <>
      <Nav />
      <div className="mx-12 flex justify-center flex-col items-center">
        <div className="w-1/3 mt-20">
          {!isLive ? (
            <>
              <Input
                label="Stream Name"
                placeholder="My first stream"
                onChange={(e) => setStreamName(e.target.value)}
              />
              <div className="flex justify-end">
                <Button
                  className="bg-primary border-primary text-background px-4 py-2.5 text-sm"
                  onClick={() => createStream?.()}
                >
                  Create Stream
                </Button>
              </div>
            </>
          ) : (
            <>
              <p className="text-3xl text-white text-center">You are live!</p>
              <p className="text-md mt-4 text-white text-center">You can view the stream <Link 
              href={`/watch/${stream?.playbackId}`}
              className="text-primary">
              here</Link></p>
              <div className="flex mt-5">
                <p className="font-regular text-zinc-500 w-32">Playback Id: </p>
                <p className="text-white ml-2 hover:text-primary hover:cursor-pointer">
                  {stream?.playbackId}
                </p>
              </div>
            </>
          )}
          <video className="mt-9 rounded-md" ref={video} />
        </div>
      </div>
    </>
  );
}

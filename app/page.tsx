"use client";

import { Button } from "@/components/ui/button";
import { useLocalStream } from "@/hooks/useStore";
import { useEffect, useRef, useMemo, useState } from "react";

export default function Home() {
  const localRef = useRef<null | HTMLVideoElement>(null);
  const remoteRef = useRef<null | HTMLVideoElement>(null);

  const localStream = useLocalStream((state) => state.localStream);
  const setLocalStream = useLocalStream((state) => state.setLocalStream);
  // const remoteStream = useLocalStream((state) => state.remoteStream);

  const videoData = useMemo(
    () => [
      { id: "user-1", ref: localRef },
      { id: "user-2", ref: remoteRef },
    ],
    []
  );

  useEffect(() => {
    init(setLocalStream);
  }, []);

  useEffect(() => {
    if (
      localStream !== null &&
      localRef.current !== null &&
      remoteRef.current !== null
    ) {
      // console.log("local stream", localStream.getTracks());
      localRef.current.srcObject = localStream;
      remoteRef.current.srcObject = localStream;
    } else {
      console.log("local stream is null", localStream);
    }
  }, [localStream]);

  return (
    <main className="w-[100vw] h-[100vh] bg-primary">
      <div
        id="app"
        className="w-full h-[50%] md:h-[80%] lg:h-full p-2 md:p-6 lg:p-12 space-y-10 md:space-y-20 lg:space-y-32 flex flex-col"
      >
        <div
          id="streams"
          className="w-full h-[70%] flex items-center space-x-2 md:space-x-8 lg:space-x-16"
        >
          {videoData.map(({ id, ref }) => (
            <div
              id={id}
              key={id}
              className="h-full border-2 rounded-2xl flex items-center justify-center overflow-hidden"
            >
              <video ref={ref} autoPlay className="w-full h-full" />
            </div>
          ))}
        </div>
        <div id="actions" className="w-full flex justify-center items-center">
          <Button>Start</Button>
        </div>
      </div>
    </main>
  );
}

const init = async (fun: (stream: MediaStream) => void) => {
  navigator.permissions
    .query({ name: "microphone" })
    .then((permissionObj) => {
      console.log(permissionObj.state);
    })
    .catch((error) => {
      console.log("Got error :", error);
    });

  navigator.permissions
    .query({ name: "camera" })
    .then((permissionObj) => {
      console.log(permissionObj.state);
    })
    .catch((error) => {
      console.log("Got error :", error);
    });

  const localStream = await navigator.mediaDevices?.getUserMedia({
    video: true,
    audio: false,
  });
  fun(localStream);
};

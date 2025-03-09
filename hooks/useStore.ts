import { create } from "zustand";

interface BearState {
  localStream: MediaStream | null;
  setLocalStream: (stream: MediaStream) => void;
  removeStream: () => void;
}

const useLocalStream = create<BearState>()((set) => ({
  localStream: null,
  setLocalStream: (stream: MediaStream) => set({ localStream: stream }),
  removeStream: () => set({ localStream: null }),
}));

const useRemoteStream = create((set) => ({
  remoteStream: null,
  setRemoteStream: (stream: MediaStream) => set({ remoteStream: stream }),
  removeStream: () => set({ remoteStream: null }),
}));

export { useLocalStream };

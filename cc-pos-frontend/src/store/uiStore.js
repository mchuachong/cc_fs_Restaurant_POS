import { create } from "zustand";

export const NavStateStore = create((set,get)=>({
    navState:"hidden",
    setNavState: (navState) => set({navState})
}))
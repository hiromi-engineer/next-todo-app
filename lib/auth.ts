import { useEffect, useState } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import {
  User,
  getAuth,
} from "firebase/auth";
import { app } from "./firebase";

type UserState = User | null;

export const userState = atom<UserState>({
  key: "userState",
  default: null,
  dangerouslyAllowMutability: true,
});

export const auth = getAuth(app);

export const useUser = (): UserState => {
  return useRecoilValue(userState);
};
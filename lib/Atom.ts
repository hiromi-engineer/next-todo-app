import { atom } from "recoil";

export interface EditTodo {
  title: string;
  desc: string;
  status: string;
  deadline: string;
}
export const defaultTodo :EditTodo = {title: '', desc: '', status: 'ĉŞçĉ', deadline: ''}
export const todoAtom = atom({
  key: 'todo',
  default: defaultTodo,
})
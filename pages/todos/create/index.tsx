import React, {useEffect} from 'react';
import {db} from '../../../lib/firebase';
import { addDoc, collection, Timestamp } from "firebase/firestore";
import Link from 'next/link';
import Form from '../../../components/Form';
import { useRecoilState } from 'recoil';
import { todoAtom, EditTodo, defaultTodo } from '../../../lib/Atom';
import { useRouter } from 'next/router'

const Create = () => {
  const [todo, setTodo] = useRecoilState(todoAtom);
  useEffect(() => {
    setTodo(defaultTodo);
  },[]);
  const router = useRouter();
  const addTodo = ( todo: EditTodo ): void => {
    const now = new Date();
    const nowData = now.getFullYear().toString() + '-' + ( '0' + (now.getMonth() + 1).toString()).slice(-2) + '-' + ( '0' + now.getDate().toString()).slice(-2);
    try {
      addDoc(collection(db, "todos"), {...todo, create: nowData,timestamp: Timestamp.fromDate(now)});
      router.push('/todos/');
    }  catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  return (
    <>
      <h1>新規作成</h1>
      <Form submitFunc={addTodo} />
      <Link href={'/todos/'} style={{display: 'inline-block',marginTop: '20px'}}>戻る</Link>
    </>
  )
}

export default Create;

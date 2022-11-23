import {useEffect, useState} from 'react';
import {db} from '../../../../lib/firebase';
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import Form from '../../../../components/Form';
import { useSetRecoilState } from 'recoil';
import { todoAtom, EditTodo } from '../../../../lib/Atom';
import Link from 'next/link';
import { useRouter } from 'next/router'

const TodoEdit = () => {
  const setTodo = useSetRecoilState(todoAtom);
  const [loading, setLoading] = useState<boolean>(true);
  const [dataExist, setDataExist] = useState<boolean>(false);
  const router = useRouter();
  const isReady = router.isReady;
  const id = router.query.id ?? '';
  useEffect(() => {
    if(isReady) {
      const decRef = id && doc(db, 'todos', id as string);
      decRef ? getDoc(decRef).then( data => {
          const todoData = data.data();
          todoData && setTodo({title: todoData.title, desc: todoData.desc, status: todoData.status, deadline: todoData.deadline}); 
          todoData && setDataExist(true);
          setLoading(false);
        } ) : setLoading(false);
    }
  }, [isReady]);
  const editTodo = ( todo: EditTodo ): void => {
    const todoUpdate = doc(db, "todos", id as string);
    updateDoc(todoUpdate, {...todo});
    router.push(`/todos/${id}`);
  }
  const deleteTodo = (): void => {
    deleteDoc(doc(db, "todos", id as string));
    router.push(`/todos/`);
  }
  return (
    <>
      {!loading && <>
        <h1>TODOの編集</h1>
        {dataExist ? (
          <>
            <Form submitFunc={editTodo} deleteFunc={deleteTodo} />
            <Link href={`/todos/${id}`} style={{display: 'inline-block',marginTop: '20px'}}>キャンセル</Link>
          </>
        ) : (
          <>
            <p>編集するTODOが見つかりません</p>
            <Link href={'/todos/'} style={{display: 'inline-block',marginTop: '20px'}}>TODO一覧に戻る</Link>
          </>
        )}
      </>
      }
    </>
  )
}

export default TodoEdit;

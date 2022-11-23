import {useEffect, useState} from 'react';
import {db} from '../../../lib/firebase';
import { doc, getDoc } from "firebase/firestore";
import Link from 'next/link';
import { useRouter } from 'next/router'

interface TodoDetail {
  id?: string;
  title?: string;
  desc?: string;
  status?: string;
  create?: string;
  deadline?: string;
}

const TodoDetail = () => {
  const [todoDetail, setTodoDetail] = useState<TodoDetail>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [dataExist, setDataExist] = useState<boolean>(false);
  const router = useRouter();
  const id = router.query.id ?? '';
  const isReady = router.isReady;
  useEffect(() => {
    if(isReady) {
      const decRef = id && doc(db, 'todos', id as string);
      decRef ? getDoc(decRef).then( data => {
        const todoData = data.data();
        todoData && setTodoDetail({title: todoData.title, desc: todoData.desc, status: todoData.status, create: todoData.create, deadline: todoData.deadline}); 
        todoData && setDataExist(true);
        setLoading(false);
      } ) : setLoading(false);
    }
  }, [isReady]);
  return (
    <>
      {!loading && <>
        {dataExist ? (
          <>
            <h1>{todoDetail.title}</h1>
            <p style={{margin: '5px 0', fontWeight: 'bold'}}>{todoDetail.status}</p>
            <p style={{fontSize: '0.8em', margin: '5px 0'}}>作成日：<time>{todoDetail.create}</time></p>
            <p style={{fontSize: '0.8em', margin: '5px 0'}}>期限：<time>{todoDetail.deadline}</time></p>
            <p>{todoDetail.desc}</p>
            <Link href={`/todos/${id}/edit`} style={{display: 'inline-block',marginTop: '20px'}}><button>編集する</button></Link><br />
          </>
        )
        : <p>編集するTODOが見つかりません</p>}
        <Link href={'/todos/'} style={{display: 'inline-block',marginTop: '20px'}}>TODO一覧に戻る</Link>
      </>
      }
    </>
  )
}

export default TodoDetail;

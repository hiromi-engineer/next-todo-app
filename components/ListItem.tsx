import Link from 'next/link';

interface ListTodo {
  id: string;
  title: string;
  desc: string;
  status: string;
  create: string;
  deadline: string;
}

const ListItem = ({todo} : {todo: ListTodo}) => {
  return (
    <div id={todo.id}>
      <Link
      href={`/todos/${todo.id}/`}
      style={{fontSize: '1.2em', margin: '10px 0 0', fontWeight: 'bold', textDecoration: 'underline'}}
      >
        {todo.title}
      </Link>
      <p style={{fontSize: '0.8em', margin: '5px 0', fontWeight: 'bold'}}>{todo.status}</p>
      <p style={{fontSize: '0.8em', margin: '5px 0'}}>作成日：<time>{todo.create}</time> 期限：<time>{todo.deadline}</time></p>
    </div>
  )
}

export default ListItem;

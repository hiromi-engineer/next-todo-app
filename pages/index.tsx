import Link from 'next/link';
import {useUser} from "../lib/auth";

const Home = () => {
  const user = useUser();
  return (
    <div>
      <h1 style={{fontSize: '3em'}}>TODO APP</h1>
      <div>
        {user ? (
          <>
            <Link href="/todos/">TODO一覧</Link>
          </>
          ) : (
          <>
            <Link href="/signin/">ログイン</Link>
            <Link href="/signup/" style={{marginLeft: '10px'}}>会員登録</Link>
          </>
          )
        }
      </div>
    </div>
  )
}

export default Home;
import Link from 'next/link';
import { auth, useUser} from "../lib/auth";
import { signOut } from 'firebase/auth';

const Header = () => {
  const user = useUser();
  const logout = () => {
    return signOut(auth);
  };
  return (
    <header
    style={{position: 'fixed',top: '0', left:'0', backgroundColor: 'white', padding: '10px', width: '100%',display:'flex', justifyContent: 'space-between'}}
    >
      <Link href="/" style={{fontWeight: 'bold', fontSize: '1.2em'}}>TODO APP</Link>
      <div
      style={{display:'flex', marginLeft: 'auto', width: 'fit-content'}}
      >
        {user ? (
          <>
            <a onClick={logout} style={{cursor: 'pointer'}}>ログアウト</a>
          </>
          ) : (
          <>
            <Link href="/signin/">ログイン</Link>
            <Link href="/signup/" style={{marginLeft: '10px'}}>会員登録</Link>
          </>
          )
        }
      </div>
    </header>
  )
}

export default Header;

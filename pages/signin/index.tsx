import { auth} from '../../lib/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRef, useState } from "react";
import { useRouter } from 'next/router';

const Signin = () => {
  const [error, setError] = useState<string>('');
  const router = useRouter();
  const email = useRef<HTMLInputElement>(null!);
  const password = useRef<HTMLInputElement>(null!);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    

    signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then(() => {
        router.push('/todos/');
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/invalid-email':
            setError('正しいメールアドレスの形式で入力してください。');
            break;
          case 'auth/user-not-found':
            setError('メールアドレスかパスワードに誤りがあります。');
            break;
          case 'auth/wrong-password':
            setError('メールアドレスかパスワードに誤りがあります。');
            break;
          default:
            setError('メールアドレスかパスワードに誤りがあります。');
            break;
        }
      });
  };
  return (
    <>
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
          <label htmlFor="email">メールアドレス</label>
          <input ref={email} type="email" placeholder="email" />
        </div>
        <div>
          <label htmlFor="password">パスワード</label>
          <input ref={password} type="password" placeholder="password" />
        </div>
        <div>
          <button>ログイン</button>
        </div>
      </form>
    </>
  );
}

export default Signin;
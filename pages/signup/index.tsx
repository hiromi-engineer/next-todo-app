import { auth } from '../../lib/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import Link from 'next/link';

const SignUp = () => {
  const [complete, setComplete] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then(() => {
        setComplete(true);
      })
      .catch((error) => {
        console.log(error.code);
        switch (error.code) {
          case 'auth/invalid-email':
            setError('正しいメールアドレスの形式で入力してください。');
            break;
            case 'auth/weak-password':
              setError('パスワードは6文字以上を設定する必要があります。');
              break;
          case 'auth/email-already-in-use':
            setError('そのメールアドレスは登録済みです。');
            break;
          default:
            setError('メールアドレスかパスワードに誤りがあります。');
            break;
        }
      });
  };

  return (
    <div>
      <h1>ユーザ登録</h1>
      { complete ? (
        <>
          <p>登録完了しました</p>
          <Link href="/signin/"></Link>
        </>
      ): (
        <form onSubmit={handleSubmit}>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div>
            <label htmlFor="email">メールアドレス</label>
            <input id="email" name="email" type="email" placeholder="email" />
          </div>
          <div>
            <label htmlFor="password">パスワード</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="password"
            />
          </div>
          <div>
            <button>登録</button>
          </div>
        </form>
      ) }
    </div>
  );
};

export default SignUp;
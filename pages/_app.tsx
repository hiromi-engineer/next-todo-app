import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot, useSetRecoilState } from "recoil";
import Header from '../components/Header';
import { useEffect, useState } from "react";
import { auth, userState } from '../lib/auth';
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";

type Props = {
  children: JSX.Element;
};

const privateRoute = ['todos'];
const publicRoute = ['signin', 'signup'];

const Auth = ({ children }: Props): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isShow, setIsShow] = useState<boolean>(false)
  const setUser = useSetRecoilState(userState);
  const router = useRouter();
  const isReady = router.isReady;

  useEffect(() => {
    onAuthStateChanged(auth, async(user) => {
      setUser(user);
      isReady && setIsLoading(false);
      if( !isLoading ) {
        const paths = router.pathname.split('/');
        if(user) {
          ( publicRoute.find(item => item === paths[1] ) ) ? router.push('/todos/') : setIsShow(true);
        } else {
          ( privateRoute.find(item => item === paths[1] ) ) ? router.push('/signin/') : setIsShow(true);
        }
      }
    });
  }, [isReady, isLoading, router]);

  return isShow ? children : <p>Loading...</p>;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Auth>
        <>
          <Header />
          <div style={{padding: '40px 20px 0'}}>
            <Component {...pageProps} />
          </div>
        </>
      </Auth>
    </RecoilRoot>
  );
}

export default MyApp;
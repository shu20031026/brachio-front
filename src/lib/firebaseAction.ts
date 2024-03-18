import {
  getAuth,
  Auth,
  GithubAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
  AdditionalUserInfo,
} from "firebase/auth";
import { firebaseApp } from "./FirebaseConfig";
import { Dispatch, SetStateAction } from "react";

let provider: GithubAuthProvider | null = null;
let auth: Auth | null = null;
let token: string | null = null;

export const createAndSetGitHubAuthProviderWithScope = () => {
  if (provider === null) {
    provider = new GithubAuthProvider();
    provider.addScope('repo'); 
  }
  return provider;
}

export const initializeAuthIfRequired = () => {
  if (auth === null) {
    auth = getAuth(firebaseApp);
    console.log(auth);
  }
  return auth;
}

export const handleSignInClick = (details: AdditionalUserInfo | null, setDetails: Dispatch<SetStateAction<AdditionalUserInfo | null>>) => {
  provider = createAndSetGitHubAuthProviderWithScope();
  auth = initializeAuthIfRequired();
  
  if (token === null) {
    signInWithPopup(auth, provider)
    .then((result) => {
      setDetails(getAdditionalUserInfo(result));
      const credential = GithubAuthProvider.credentialFromResult(result);
      if (credential && credential.accessToken) {
        token = credential.accessToken;
        console.log('token: ' + credential.accessToken);
      }
      console.log(result.user);
    })
    .catch((error) => {
      console.error('Sign-in error:', error);
      console.log(provider);
      console.log(auth);
      console.log(details?.username);
      // エラーが発生した場合の処理を追加することができます。
    });
  }
}
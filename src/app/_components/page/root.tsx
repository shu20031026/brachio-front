'use client'

import { FC } from "react"
import { useEffect, useState } from 'react';
import {
  getAuth,
  Auth,
  GithubAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { firebaseApp } from "@/lib/FirebaseConfig";

const OWNER = "shu20031026"
const REPO = "brachio-front"

// Root
const Root:FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [auth, setAuth] = useState<Auth | null>(null);
  const [provider, setProvider] = useState<GithubAuthProvider | null>(null);

  useEffect(() => {
    if (provider === null) {
      const newProvider = new GithubAuthProvider();
      newProvider.addScope('repo'); 
      setProvider(newProvider);
    }
  }, [provider]);

  useEffect(() => {
    if (provider !== null && auth === null) {
      setAuth(getAuth(firebaseApp));
      console.log(auth);
    }
  }, [auth, provider]);

  useEffect(() => {
    if (provider !== null && auth !== null && token === null) {
      signInWithPopup(auth, provider).then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        if (credential && credential.accessToken) {
          setToken(credential.accessToken);
          console.log('token: ' + credential.accessToken);
        }
        console.log(result.user);
      });
    }
  }, [auth, provider, token]);

  useEffect(() => {
    if (token !== null) {
      fetch(`https://api.github.com/repos/${OWNER}/${REPO}/issues`, {
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application / vnd.github.v3 + json',
        },
      }).then((result) => {
        result.json().then((result) => {
          console.log(result);
        });
      });
    }
  }, [token]);

  return (
    <div className="w-full h-screen overflow-hidden">
      <div>Root</div>
      <div>ろぐいんとか</div>
    </div>
  )
}

export default Root
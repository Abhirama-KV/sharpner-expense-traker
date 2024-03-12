import { useEffect, useState } from "react";
import PasswordReset from "./PasswordReset";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'

const Auth = () => {
    const [login, setLogin] = useState(false);
    const [displayPassword, setDisplayPassword] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleAuth = async () => {
        console.log(email + ' ' + password)
        if (login) {

            await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
                console.log(userCredential)

            }).catch((err) => { setError('either username or password is wrong'); console.log(err) })
        } else if (password != confirmPassword) {
            setError('password and new password doesnt match')
        } else {
            setError('')
            await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
                console.log(userCredential)

            }).catch((err) => { setError('either username or password is wrong'); console.log(err) })
        }
    }

    useEffect(() => {
        console.log('useeffect called')
        const authentication = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user)
                navigate('/body')
            } else {
                console.log('not log in')
                navigate('/')
            }
        })

        return () => authentication
    },[])



    const changePassword = () => {
        sendPasswordResetEmail(auth, email).then(() => console.log('password reset email sent')).catch((err) => console.log(err))
    }

    const submitHandler = (e) => {
        e.preventDefault()
        setEmail('')

        setPassword('')
        setConfirmPassword('')
        setError('')
    }

    return (
        <div className="my-[13%] ">

            <form onSubmit={submitHandler} className="border border-gray-600 w-3/12 ml-[35%] rounded-lg">
                {!displayPassword &&
                    <div>

                        <h1 className="font-bold text-2xl my-4">{login ? 'Login' : 'Sign Up'}</h1>

                        <div>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} className="border border-gray-300 rounded-md my-2 py-2 px-2 w-10/12" type="text" placeholder="Email..." />
                        </div>

                        <div>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} className="border border-gray-300 rounded-md my-2 py-2 px-2 w-10/12" type="password" placeholder="Password..." />
                        </div>

                        <div>
                            {!login && <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="border border-gray-300 rounded-md my-2 py-2 px-2 w-10/12" type="password" placeholder="Confirm Password..." />}
                        </div>

                        {error && <h1 className="text-red-700">{error}</h1>}

                        <div>
                            <button onClick={handleAuth} className="bg-blue-500 w-8/12 rounded-2xl my-2 p-2 font-bold text-xl text-white">{login ? 'Login' : 'Sign Up'}</button>
                        </div>

                        {login && <div className="my-2"><a onClick={changePassword} className="cursor-pointer">forget password?</a></div>}

                    </div>
                }

                {/* {displayPassword &&
                    <PasswordReset changePassword={changePassword} password={password} confirmPassword={confirmPassword} passwordResetHandler={passwordResetHandler} setPassword={setPassword} setConfirmPassword={setConfirmPassword} />
                } */}
            </form>

            {!displayPassword && <div>

                <p className=" mr-12">{login ? 'dont have account?' : 'already have account?'}
                    <a className="cursor-pointer" onClick={() => setLogin(!login)}>{login ? 'sign up' : 'login'}</a></p>
            </div>
            }
        </div>
    )
}

export default Auth;
import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import ProfilePage from "./ProfilePage";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import MainPage from "./MainPage";

const Body = () => {
    const [profilePage, setProfilePage] = useState(false)
    const [mainPage, setMainPage] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        console.log('useeffect called')
        const authentication = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/body')
            } else {
                navigate('/')
            }
        })

        return () => authentication
    }, [])

    const handleProfile = (fullName, photoURL) => {
        updateProfile(auth?.currentUser, {
            displayName: fullName,
            photoURL: photoURL
        })
        console.log(fullName, photoURL)
    }


    return (


        <div>
            {console.log('user')}
            {console.log(auth?.currentUser)}
            {console.log(auth?.currentUser.photoURL && auth?.currentUser.displayName)}
            {!profilePage ? <div>
                {!(auth?.currentUser?.displayName && auth?.currentUser?.photoURL) &&
                    <div className="flex justify-between border border-b-black">
                        <h1>{profilePage ? 'Winners neverQuit, Quitters never Win' : 'Welcome to ExpenseTracker'}</h1>
                        {!profilePage && <h1>Your profile is incomplete.<span onClick={() => setProfilePage(true)} className="text-blue-600 cursor-pointer">complete now</span></h1>}
                        {profilePage && <h1>Your profile is incomplete, complete now</h1>}
                    </div>
                }
                {console.log(mainPage)}
                {console.log(profilePage)}
            </div>
                :


                !mainPage? <div><ProfilePage handleProfile={handleProfile} mainPage={setMainPage} />{console.log(mainPage)}</div>:
        <div><MainPage />{console.log(mainPage)}</div>
            

            }


            {/* {profilePage && <ProfilePage handleProfile={handleProfile} />} */}

            {/* {!mainPage && <MainPage /> } */}


        </div>
    )
}

export default Body;
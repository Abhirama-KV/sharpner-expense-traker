import { useState } from "react";

const ProfilePage = (props) => {
    const [fullName, setFullName] = useState('')
    const [photoURL, setPhotoURL] = useState('')

    function submitHandler(e){
        e.preventDefault()
        props.handleProfile(fullName,photoURL)
            props.mainPage(true)
        }

    return (

     

        <div >
            <form className="" onSubmit={submitHandler}>
                <div className="ml-[35%] mt-[5%] w-6/12 border border-white border-b-gray-700">

                    <div className="flex justify-between mb-4">
                        <h1>Contact Details</h1>
                        <button className="px-2 py-1 text-red-600 rounded-lg border border-red-600   m-2">cancel</button>
                    </div>

                    <div className="flex justify-between">
                        <div>
                            <label>FullName: </label>
                            <input onChange={(e)=>setFullName(e.target.value) } className="border border-black rounded-md" type="text" />
                        </div>

                        <div>
                            <label>Photo URL: </label>
                            <input onChange={ (e)=>setPhotoURL(e.target.value)} className="border border-black rounded-md" type="text" />
                        </div>

                    </div>

                    <button  className="px-2 py-1 text-white rounded-lg bg-red-600 m-2">Update</button>
                    {/* {console.log(fullName,photoURL)} */}
                </div>
            </form>

        </div>
    )
}

export default ProfilePage;
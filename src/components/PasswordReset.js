import { useState } from "react";

const PasswordReset = (props) => {
    const [newPassword, setNewPassword] = useState('');
    const [updatedPassword, setUpdatedPassword] = useState('')
    const [error, setError] = useState('')

    

    const handlePasswordReset = () => {
        if (newPassword !== updatedPassword) {
            setError('password and confirm password does not match')
            setNewPassword('');
            setUpdatedPassword('')
        } else {
            props.changePassword(updatedPassword)
            setError('')
            setNewPassword('');
            setUpdatedPassword('')
        }
    }

    return (
        <div className="w-6/12 m-auto">
            <h1 className="font-bold text-2xl my-4">Change Password</h1>
            <div><input value={newPassword} onChange={(e) =>setNewPassword(e.target.value) } className="border border-gray-300 rounded-md my-2 py-2 px-2 w-10/12" type="password" placeholder="enter new Password..." />  </div>
            <div><input value={updatedPassword} onChange={(e) =>setUpdatedPassword(e.target.value)} className="border border-gray-300 rounded-md my-2 py-2 px-2 w-10/12" type="password" placeholder="congirm Password..." />  </div>
            <h1 className="text-red-700">{error}</h1>
            <div><button onClick={handlePasswordReset} className="bg-blue-500 w-8/12 rounded-2xl my-2 p-2 font-bold text-xl text-white">submit</button></div>

        </div>

    )
}

export default PasswordReset;
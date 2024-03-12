import { useState, useEffect } from "react";
import { auth } from "../config/firebase";
import { signOut, updatePassword } from "firebase/auth";
import PasswordReset from "./PasswordReset";
import { db } from "../config/firebase";
import { Firestore, collection, addDoc, getDocs, updateDoc, doc, deleteDoc, getDoc, setDoc } from "firebase/firestore";
import ExpenseList from "./ExpenseList";

const MainPage = () => {
    const [showUpdatePassword, setShowUpdatePassword] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [total, setTotal] = useState(0);
    const [userId, setUserId] = useState(auth?.currentUser?.uid)


    const [expenseData, setExpenseData] = useState([])

    // const userId = auth?.currentUser?.uid



    const handleSignout = () => {

        // console.log('handle signout')
        signOut(auth).then(() => console.log('signed out')).catch((err) => console.log(err))
    }

    const changePassword = (password) => {
        updatePassword(auth.currentUser, password).then(() => console.log('password changed')).catch((err) => console.log(err))
        setShowUpdatePassword(false)
    }

    const expenses = collection(db, 'expenses')

    const totalExpense = collection(db, 'total-expense')



    const submitHandler = async (e) => {

        e.preventDefault()


        const existingData = expenseData.filter(data => data.name == name)
        console.log(existingData)
        if (existingData.length >= 1) {
            console.log('found')
            // console.log(existingData)
            const document = doc(db, 'expenses', existingData[0].id)

            updateData(document, existingData[0].price)



            console.log(document)

            return
        }


        // const existingTotalExpense = 

        console.log('not returned')
        try {
            const addInput = await addDoc(expenses, {
                name: name,
                description: description,
                price: +price,
                uid: userId
            })
            console.log(addInput)
            getInput()
            setTimeout(() => getTotalExpense(), 1000)


            //TOTAL EXPENSE
            console.log(userId)
            try {
                const existingTotalExpense = await getDoc(doc(db, 'total-expense', userId))
                        
                console.log(!existingTotalExpense.data())
                console.log(userId)
                if (!existingTotalExpense.data()) {
                    try{
                    const setDocument = await setDoc(doc(db, 'total-expense', userId), {
                        total: +price,
                        uid: userId
                    })
                }catch{console.log('no')}
                } else {
                    try{
                    const existingTotalExpenseTotal = existingTotalExpense.data().total;
                    console.log(existingTotalExpenseTotal)

                    const updatedTotalExpense = await updateDoc(doc(db, 'total-expense', userId), {
                        total: +existingTotalExpenseTotal + +price
                    })
                }catch {console.log('no2')}
                }


                console.log('Totalexpense updated')
            } catch {
                console.log('couldnt update')
            }

        } catch {
            console.log('error')
        }

        setName('');
        setDescription('');
        setPrice(0)
    }

    setTimeout(() => {
        setUserId(auth?.currentUser?.uid)
    }, 1000)


    useEffect(() => {
        // console.log(auth?.currentUser)
        // setTimeout(()=>{
        //     setUserId(auth?.currentUser?.uid)
        // },1000)

        console.log('useEffect called')

        // setTimeout(()=>{
        getInput()
        setTimeout(() => getTotalExpense(), 1000)
        // },4000)

    }, [userId])

    const getInput = async () => {
        try {

            const datas = await getDocs(expenses);

            // console.log(datas)

            const filteredData = datas?.docs.map((doc) => (
                { ...doc.data(), id: doc.id }))


            console.log(userId)
            console.log(filteredData)
            const userData = filteredData.filter(data => data.uid == userId)
            console.log(userData)
            setExpenseData(userData)

            //TOTAL EXPENSE


        } catch {
            console.log('error')
        }
    }

    const getTotalExpense = async () => {
        try {
            const totalExpense = await getDoc(doc(db, 'total-expense', userId))
            const totalExpenseData = totalExpense.data().total;
            setTotal(totalExpenseData);
            console.log(totalExpenseData)
        } catch {
            console.log('coudnt update total expense')
        }
    }


    const updateData = async (document, existingPrice) => {
        const docs = await updateDoc(document, { price: +price + +existingPrice })

        console.log('update total expense')
        try {
            const existingTotalExpense = await getDoc(doc(db, 'total-expense', userId))
            const existingTotalExpenseTotal = existingTotalExpense.data().total;
            console.log(existingTotalExpenseTotal)
            const updatedTotalExpense = await updateDoc(doc(db, 'total-expense', userId), {
                total: existingTotalExpenseTotal + +price
            })
            console.log('updatedTotalExpense');
        } catch {
            console.log('couldnt update')
        }

        getInput()
        setTimeout(() => getTotalExpense(), 1000)

    }

    const deleteItem = async (id, price) => {
        const document = doc(db, 'expenses', id)
        const deletedItem = await deleteDoc(document)
        console.log(deletedItem);
        getInput()
        setTimeout(() => getTotalExpense(), 1000)


        //delete existingTotalExpense
        const existingTotalExpense = await getDoc(doc(db, 'total-expense', userId))
        const existingTotalExpenseTotal = existingTotalExpense.data().total;

        await updateDoc(doc(db, 'total-expense', userId), {
            total: +existingTotalExpenseTotal - +price
        })
        console.log('deleted from totalExpense')
    }

    const updatePrice = async (id, price, existingPrice) => {
        const document = doc(db, 'expenses', id)
        const updatedPrice = await updateDoc(document, { price: +price })
        console.log(updatedPrice)
        getInput()
        setTimeout(() => getTotalExpense(), 1000)


        //update TotalExpense
        const existingTotalExpense = await getDoc(doc(db, 'total-expense', userId))
        const existingTotalExpenseTotal = existingTotalExpense.data().total;

        console.log(existingPrice)
        await updateDoc(doc(db, 'total-expense', userId), {
            total: +existingTotalExpenseTotal - +existingPrice + +price
        })
        console.log('updated from totalExpense')

    }



    return (
        <div className="">

            {!showUpdatePassword && <div className="bg-slate-800 flex justify-between">
                <form onSubmit={submitHandler} className="py-4   text-xl mr-12">


                    <label className="mx-2 text-white">name: </label>
                    <select  onChange={(e) => setName(e.target.value)} className="mx-2" value={name}>
                        <option value=''>seleect an option</option>
                        <option value='food'>food</option>
                        <option value='grocery'>grocery</option>
                        <option value='fuel'>fuel</option>
                        <option value='fruits'>fruits</option>
                        <option value='pant'>pant</option>
                        <option value='shirt'>shirt</option>
                        <option value='other expenses'>other expenses</option>
                    </select>

                    <label className="mx-2 text-white">description: </label>
                    <input onChange={(e) => setDescription(e.target.value)} className="mx-2" type="text" value={description}></input>

                    <label className="mx-2 text-white">expense: </label>
                    <input onChange={(e) => setPrice(e.target.value)} className="mx-2" type="number" value={price}></input>


                    <button className="px-2 py-1 text-white rounded-lg bg-red-600 mx-2">Add</button>


                </form>
                <div className="py-4">
                    <button onClick={() => setShowUpdatePassword(true)} className="px-2 py-1 text-red-600 rounded-lg border border-red-600 ml-auto mx-2">Change Password</button>
                    <button onClick={handleSignout} className="px-2 py-1 text-red-600 rounded-lg border border-red-600 ml-auto mx-2">SignOut</button>
                </div>


            </div>}

            {showUpdatePassword && <PasswordReset changePassword={changePassword} />}

            {expenseData && <ExpenseList expenseData={expenseData} deleteItem={deleteItem} updatePrice={updatePrice} total={total} />}
            {/* {console.log(expenseData)} */}
        </div>
    )
}

export default MainPage;
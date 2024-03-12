import { useState } from "react";

const ExpenseList = (props) => {
    const [price, setPrice] = useState(0);



    return (
        <div className="bg-black text-gray-400">
            <ul>
                {/* {props.expenseData.map(data=>console.log(data))} */}
                {props.expenseData.map(data =>
                    <div className="my-2"><ul className="">

                        <div className="flex mx-[15%] border border-black border-b-gray-400 py-2">
                            <div className="mx-4 w-36">{data.name}</div>

                            <div className="mx-4 w-36">{data.description}</div>

                            <div className="mx-4 w-36">{data.price}</div>

                            <div className="mx-4 flex w-3/4">
                                <label className="mx-2">Update price: </label>
                                <input onChange={(e)=>setPrice(e.target.value)} type="number" className="border border-black py-1 text-black"  />
                                <button onClick={() => props.updatePrice(data.id, price, data.price)} className="px-2 py-1 text-white rounded-lg bg-red-600 mx-2">update</button>
                            </div>

                            <div className="px-8 flex">
                                
                                <button onClick={() => props.deleteItem(data.id, data.price)} className="px-2 py-1 text-white rounded-lg bg-red-600 mx-2">delete</button>
                            </div>

                        </div>
                    </ul>

                    </div>)}
                <div><label>Total: </label>{props.total}</div>
            </ul>
        </div>
    )
}

export default ExpenseList;
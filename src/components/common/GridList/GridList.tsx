import React from "react"

type TGridListProps<T>={
    records:T[],
    renderItems:(record:T)=>React.ReactNode
}

const GridList = <T,>({records,renderItems}:TGridListProps<T>) => {
    const List=records.length>0? records?.map((record,index) => {
        return (
          <div className="mb-6" key={index}>
            {renderItems(record)}
          </div>
        );
      }):<h1 className="flex justify-center items-center flex-col mt-20 font-bold text-5xl text-red-500">Data Not Found</h1>
  return (
    <div>{List}</div>
  )
}

export default GridList
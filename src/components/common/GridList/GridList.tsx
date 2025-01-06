import React from "react"
import Lottie from "lottie-react"
import notfound from "./not found.json"

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
      }):<Lottie animationData={notfound} style={{width:"400px"}} className="m-auto mt-10"/>
  return (
    <div>{List}</div>
  )
}

export default GridList
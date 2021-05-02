import React from "react"
import "./PickNumbers.css"

function PickNumbers({pickNumbers}){

    // 로또 추첨 공은 번호 순서에 따라 노란색(1~10번), 파란색(11~20번), 빨간색(21~30번), 회색(31~40번), 초록색(41~45번) 등 총 5가지 색으로 구분돼 있다.
    // console.log(pickNumbers)

    if(pickNumbers.length === 0) return ""

    return (
        <div className="pick_numbers">
            {pickNumbers.map((item, idx) => (
                <div key={idx} className={item <= 10 ? "yellow" : item <= 20 ? "blue" : item <= 30 ? "red" : item <= 40 ? "gray" : "green"}>{item}</div>
            ))}
        </div>
    )
   
}

export default PickNumbers
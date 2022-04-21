// แสดงตัวเลือกสกุลเงินและช่องให้กรอกตัวเลข
// เรียกใช้งาน 2 ครั้ง เป็นสกุลเงินต้นทางและสกุลเงินปลายทาง

import './CurrencyComponent.css'

const CurrencyComponent =(props)=>{

    // เก็บค่าที่ props มา
    const {currencychoice,selectcurrency,changeCurrency,amount,
            onchangecurrency} = props

    return(
        <div className="currency">
            <select value={selectcurrency} onChange={changeCurrency}>
                {currencychoice.map((choice)=>
                    <option key={choice} value={choice}>{choice}</option>
                )}
            </select>
            <input type="number" value={amount}
            onChange={onchangecurrency}/>
        </div>
    )
}

export default CurrencyComponent
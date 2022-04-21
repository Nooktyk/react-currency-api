import { useEffect } from 'react';
import { useState } from 'react';
import CurrencyComponent from './components/CurrencyComponent';
import money from './img/money.png';

function App() {

  const [currencychoice,setCurrencyChoice] = useState([])

  const [fromcurrency,setFromCurrency] = useState("USD")
  const [tocurrency,setToCurrency] = useState("THB")

  const [amount,setAmount] = useState(1)
  const [exchangerate,setExchangeRate] = useState(0)

  const [checkfromcurrency,setCheckFromCurrency] = useState(true)
  let fromamount,toamount
  if(checkfromcurrency){
    fromamount = amount
    toamount = (amount*exchangerate).toFixed(2)
  }else{
    toamount = amount
    fromamount = (amount/exchangerate).toFixed(2)
  }

  useEffect(()=>{
    // ร้องขอการใช้งาน API ด้วย useEffect
    const url = `https://api.exchangerate-api.com/v4/latest/${fromcurrency}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
      setCurrencyChoice([...Object.keys(data.rates)])
      setExchangeRate(data.rates[tocurrency])
    })
  },[fromcurrency,tocurrency])

  const amountFromCurrency =(e)=>{
      setAmount(e.target.value)
      setCheckFromCurrency(true)
  }
  const amountToCurrency =(e)=>{
      setAmount(e.target.value)
      setCheckFromCurrency(false)
  }

  return (
    <div>
      <img src={money} alt="logo" className="money-img"/>
      <h1>แอพแปลงสกุลเงินด้วย API</h1>
      <div className="container">
        <CurrencyComponent currencychoice={currencychoice} 
          selectcurrency={fromcurrency}
          changeCurrency={(e)=>setFromCurrency(e.target.value)}
          amount={fromamount}
          onchangecurrency={amountFromCurrency}/> 
        <div className="equal"> = </div>
        <CurrencyComponent currencychoice={currencychoice}
          selectcurrency={tocurrency}
          changeCurrency={(e)=>setToCurrency(e.target.value)}
          amount={toamount}
          onchangecurrency={amountToCurrency}/>
      </div>
    </div>
  );
}

export default App;

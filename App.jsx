import { useState ,useRef,useEffect} from 'react';
import Die from './Die';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
import Header from './Header';

export default function App() {
  const [dice, setDice] = useState(() => randomNum());

  const btnRef=useRef(null)

  
  const victory =
  dice.every(d => d.isHold) && dice.every(d => d.value === dice[0].value);
  
  useEffect(()=>{
    if(victory){
      btnRef.current.focus();
    }
  },[victory])
  function randomNum() {
    return new Array(10).fill(1).map(() => ({
      value: Math.floor(Math.random() * 7),
      isHold: false,
      id: nanoid(),
    }));
  }
  function holdC(id) {
    setDice(prev =>
      prev.map(data =>
        data.id === id ? { ...data, isHold: !data.isHold } : { ...data }
      )
    );
  }
  const dieEle = dice.map(d => (
    <Die key={d.id} id={d.id} value={d.value} hold={d.isHold} punch={holdC} />
  ));
  function roll() {
    victory
      ? setDice(() => randomNum())
      : setDice(prev =>
          prev.map(data =>
            data.isHold
              ? { ...data }
              : { ...data, value: Math.floor(Math.random() * 7) }
          )
        );
  }

  return (
    <>
      <main>
        <Header />
        {victory && <Confetti />}
        <div aria-live='polite' className="sr-only">
          <p>Congratulation You won the game</p>
        </div>

        <section className="die_box">{dieEle}</section>
        <button className="rollb" onClick={roll} ref={btnRef}>
          {victory ? 'New Game' : 'Roll'}
        </button>
      </main>
    </>
  );
}

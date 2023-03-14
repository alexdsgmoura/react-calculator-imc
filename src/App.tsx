import { useState } from 'react';

import { Level } from './helpers/imc';

import styles from './App.module.css'

import poweredImage from './assets/powered.png'
import leftArrowImage from './assets/leftarrow.png'

import { levels, calculateImc } from './helpers/imc';

import { GridItem } from './components/GridItem';

function App() {
  const [heightField, setHeightField] = useState<number>(0)
  const [weightField, setWeightField] = useState<number>(0)
  const [toShow, setToShow] = useState<Level | null>(null)

  const handlerCalculateButton = () => {
    if (heightField && weightField) {
      setToShow(calculateImc(heightField, weightField))
    } else {
      alert('Preencha todos os campos.')
    }
  }

  const handlerBackButton = () => {
    setToShow(null)
    setHeightField(0)
    setWeightField(0)
  }

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} alt="" />
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC</h1>
          <p>IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela Organização Mundial de Saúde para calcular o peso ideal de cada pessoa.</p>

          <input type="number" placeholder='Digite a sua altura. EX: 1.5 (em métros)' disabled={toShow ? true : false} value={heightField > 0 ? heightField : ''} onChange={e => setHeightField(parseFloat(e.target.value))} />
          <input type="number" placeholder='Digite o seu peso. EX: 70.5 (em kg)' disabled={toShow ? true : false} value={weightField > 0 ? weightField : ''} onChange={e => setWeightField(parseFloat(e.target.value))} />
          
          <button disabled={toShow ? true : false} onClick={handlerCalculateButton}>Calcular</button>
        </div>

        <div className={styles.rightSide}>
          {!toShow &&
            <div className={styles.grid}>
              {levels.map((item, index) => (
                <GridItem key={index} item={item} />
              ))}
            </div>
          }

          {toShow &&
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handlerBackButton}>
                <img src={leftArrowImage} alt="" width="25px" />
              </div>

              <GridItem item={toShow} />
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;

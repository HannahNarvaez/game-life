import React, {useState} from 'react';
import {createUseStyles} from 'react-jss'

const useStyles = createUseStyles({
  grid: {
    gap: '0.3rem',
    height: '98vH',
    display: 'grid',
    position: 'relative',
  },
  box: {
    backgroundColor: '#d2e3eb',
  },
  select: {
    top: 5,
    right: 5,
    position: 'absolute'
  },
  button: {
    top: 5,
    left: 5,
    position: 'absolute',
  },
})

const GameLife = () => {
  const classes = useStyles();
  const [numberOfColumns, setNumberOfColumns] = useState(1);
  const [numberOfBoxes, setNumberOfBoxes] = useState(1);
  const [isHover, setIsHover] = useState();
  const [colors, setColors] = useState([]);
  const handleChange = (e) => {
    setNumberOfColumns(e.target.value);
    setNumberOfBoxes(Math.sqrt(e.target.value));
  };
  const setColumns = {
    gridTemplateColumns: `repeat(${numberOfBoxes}, 1fr)`
  };
  const handleClick = (value) => {
    setIsHover(value);
  }
  const handleMouseOver = (e, value) => {
    e.preventDefault();
    if (e.buttons == 1 || e.buttons == 3) {
      setIsHover(value);
      const arrayTemp = [...colors];
      arrayTemp.push(value);
      setColors([...arrayTemp]);
    }
  }
  const handleClickErase = () => {
    setColors([]);
  }
  return (
    <div className={classes.grid} style={setColumns}>
      {Array.from({length: numberOfColumns}, (_, id) => {
        return (
          <div
            style={{backgroundColor: colors.includes(id) && '#436676'}}
            draggable="false"
            key={`key-${id}`}
            className={classes.box}
            onClick={() => handleClick(id)}
            onMouseOver={(e) => handleMouseOver(e, id)}
          />
        )
      })}
      <select onChange={(e) => handleChange(e)} className={classes.select}>
        {Array.from({length: 50}, (_, index) => (index + 1) ** 2).map((it, id) => {
          return (
            <option
              key={`key-${id}`}
            >
              {it}
            </option>
          )
        })}
      </select>
      <button
        onClick={handleClickErase}
        className={classes.button}
      >
        Borrar Seleccion
      </button>
    </div>
  )
}

export default GameLife;


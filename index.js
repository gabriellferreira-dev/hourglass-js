const n = 21;

const hourglassSize = n % 2 === 0 ? n : n + 1;

const createStr = (size, char) => {
  let str = '';

  for (let i = 0; i < size; i += 1) {
    str += char;
  }

  return str;
};

const createFills = (char, position, initialSize) => {
  const fills = [];
  let fillLength = initialSize;

  for (let i = 1; i <= (hourglassSize - 2) / 2; i += 1) {
    let line = createStr(fillLength, char);
    fills.push(line);
    position === 'top' ? (fillLength -= 2) : (fillLength += 2);
  }
  return fills;
};

const replaceChar = (replaceValue, replaceWith, fills, index) => {
  const line = fills[index]?.replace(replaceValue, replaceWith);
  fills[index] = line;
  return fills;
};

const topFills = createFills('#', 'top', hourglassSize - 4);

const bottomFillsInitSize = topFills[topFills.length - 1].length;
const bottomFills = createFills(' ', 'bottom', bottomFillsInitSize);

const createHourglass = (topFills, bottomFills) => {
  console.log('');
  let i = hourglassSize;

  let fillIndex = 0;

  const fills = [...topFills, ...bottomFills];
  const line = createStr(hourglassSize, '#');
  console.log(line);

  for (let i = 0; i < hourglassSize; i += 1) {
    if (i > 0 && i < hourglassSize - 1) {
      const spaceLength = (hourglassSize - fills[fillIndex].length) / 2 - 2;
      const space = i !== 1 ? createStr(spaceLength, ' ') : '';
      const side = i === 1 ? '##' : `#${space}#`;

      console.log(`${side}${fills[fillIndex]}${side}`);

      fillIndex += 1;
    }
  }
  console.log(line);
};

const startTime = () => {
  let timeOut = false;

  let top = topFills;
  let bottom = bottomFills;

  let fillTopIndex = 0;
  let fillBottomIndex = bottom.length - 1;

  const interval = setInterval(() => {
    timeOut = fillTopIndex === top.length;

    if (timeOut) {
      clearInterval(interval);
      console.log('\n');
      console.log('Tempo esgotado!');
      return;
    }

    createHourglass(top, bottom);

    top = replaceChar('#', ' ', top, fillTopIndex);
    bottom = replaceChar(' ', '#', bottom, fillBottomIndex);

    if (top[fillTopIndex].indexOf('#') === -1) {
      fillTopIndex += 1;
      fillBottomIndex -= 1;
    }
  }, 1000);
};

startTime();

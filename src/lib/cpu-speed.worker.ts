onmessage = () => {
  let speed = 0;

    while(speed < 2 || speed > 5){
      speed = estimateSpeed();
      postMessage(speed);
    }
  };

  const estimateSpeed = () => {
    const speedConstant = 8.9997e-9; //if speed=(c*a)/t, then constant=(s*t)/a and time=(a*c)/s
    const d = new Date();
    const  amount = 150000000;
    let j = 0;
    for (let i = amount; i > 0; i--) {
    j++;
    }
    const newDate = new Date();
    const accnewd = Number(String(newDate.getSeconds()) + '.' + String(newDate.getMilliseconds()));
    const accd = Number(String(d.getSeconds()) + '.' + String(d.getMilliseconds()));
    let di = accnewd - accd;
    if (d.getMinutes() != newDate.getMinutes()) {
    di = 60 * (newDate.getMinutes() - d.getMinutes()) + di;
    }

    const spd = (speedConstant * amount) / di;
    return Math.round(spd * 1000) / 1000;
}
  
  export {};
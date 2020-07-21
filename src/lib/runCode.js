const go = new window.Go();

export async function runGoWasm(rawData) {
  const result = await WebAssembly.instantiate(rawData, go.importObject);
  let oldLog = console.log;
  let stdOut = [];
  console.log = (line) => {stdOut.push(line);};
  await go.run(result.instance);
  console.log = oldLog;
  return stdOut;
}

export async function runJavaScript(code) {
  const newFunc = new Function(`
let wholeCode = async function () {
    ${code}
};
return wholeCode();
`);
  let oldLog = console.log;
  let stdOut = [];
  console.log = (line) => {
    try {
      stdOut.push(JSON.stringify(line)); 
    } catch (err){
      stdOut.push(line); 
    }
  };
  await newFunc();
  console.log = oldLog;
  return stdOut;
}


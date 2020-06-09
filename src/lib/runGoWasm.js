export default async function runGoWasm(rawData) {
  const go = new window.Go();
  const result = await WebAssembly.instantiate(rawData, go.importObject);
  let oldLog = console.log;
  let stdOut = [];
  console.log = (line) => {stdOut.push(line);};
  go.run(result.instance);
  console.log = oldLog;
  return stdOut;
}

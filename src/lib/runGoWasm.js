export default async function runGoWasm(wasmURL) {
  const go = new window.Go();
  const data   = await fetch(wasmURL);
  const result = await WebAssembly.instantiateStreaming(data, go.importObject);
  let oldLog = console.log;
  let stdOut = '';
  console.log = (line) => {stdOut += `${line}\n`;};
  go.run(result.instance);
  console.log = oldLog;
  return stdOut;
}

// import decodeJWT from './decodeJWT';

export const domain = 'http://localhost:5000';

export async function compileCode(code){
  const resp = await fetch(`${domain}/v1/compile`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      code
    })
  });
  const handled = await handleWasmResponse(resp);
  return handled;
}

async function handleWasmResponse(response) {
  if (!response.ok) {
    const json = await response.json();
    if (typeof json.error !== 'undefined') {
      throw json.error;
    }
    throw 'Unknown error occured';
  }
  return await response.arrayBuffer();
}
  
/*
async function handleJSONResponse(response) {
  const json = await response.json();
  if (typeof json.error !== 'undefined') {
    throw json.error;
  } else if (!response.ok) {
    throw 'Unknown error occured';
  }
  return json;
}
*/

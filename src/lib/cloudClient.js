import decodeJWT from './decodeJWT';

export const domain = 'http://localhost:5000';

const jwtKey = 'cloudJWT';

export async function login(email, password){
  const resp = await fetch(`${domain}/v1/auth`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });
  const handled = await handleJSONResponse(resp);
  localStorage.setItem(jwtKey, handled.token);
  return handled;
}

async function refreshToken(){
  const resp = await fetchWithAuth(`${domain}/v1/auth/refresh`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const handled = await handleJSONResponse(resp);
  localStorage.setItem(jwtKey, handled.token);
  return handled;
}

export async function createUser(email, password, firstName, lastName){
  const resp = await fetch(`${domain}/v1/users`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password, 
      firstName,
      lastName
    })
  });
  const handled = await handleJSONResponse(resp);
  return handled;
}

export async function updateUser(firstName, lastName){
  const resp = await fetchWithAuth(`${domain}/v1/users`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstName,
      lastName
    })
  });
  const handled = await handleJSONResponse(resp);
  return handled;
}

export async function updateUserPassword(email, oldPassword, newPassword){
  const resp = await fetch(`${domain}/v1/users/password`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      oldPassword,
      newPassword
    })
  });
  const handled = await handleJSONResponse(resp);
  return handled;
}

export async function updateUserPasswordCode(email, newPassword, code){
  const resp = await fetch(`${domain}/v1/users/password`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      newPassword,
      code
    })
  });
  const handled = await handleJSONResponse(resp);
  return handled;
}

export async function sendEmailVerification(){
  const resp = await fetchWithAuth(`${domain}/v1/users/email/send_verification`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const handled = await handleJSONResponse(resp);
  return handled;
}

export async function verifyEmail(code){
  const resp = await fetchWithAuth(`${domain}/v1/users/email/verify`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      code
    })
  });
  const handled = await handleJSONResponse(resp);
  return handled;
}

export async function compileCode(code){
  const resp = await fetchWithAuth(`${domain}/v1/compile`, {
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

export async function getProducts(){
  const resp = await fetchWithAuth(`${domain}/v1/products`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const handled = await handleJSONResponse(resp);
  return handled;
}

export async function startProductCheckout(productID){
  const resp = await fetchWithAuth(`${domain}/v1/products/${productID}/checkout`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const handled = await handleJSONResponse(resp);
  return handled;
}

export async function getCourses(){
  const resp = await fetchWithAuth(`${domain}/v1/courses`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const handled = await handleJSONResponse(resp);
  return handled;
}

export async function purchaseCourse(courseUUID){
  const resp = await fetchWithAuth(`${domain}/v1/courses${courseUUID}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const handled = await handleJSONResponse(resp);
  return handled;
}

export async function getNextExercise(courseUUID){
  const resp = await fetchWithAuth(`${domain}/v1/courses/${courseUUID}/excersizes/current`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const handled = await handleJSONResponse(resp);
  return handled;
}

export async function submitCodeExercise(courseUUID, moduleUUID, codeUUID){
  const resp = await fetchWithAuth(`${domain}/v1/courses/${courseUUID}/modules/${moduleUUID}/excersizes/${codeUUID}/code`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const handled = await handleJSONResponse(resp);
  return handled;
}

export async function submitMultipleChoiceExercise(courseUUID, moduleUUID, codeUUID){
  const resp = await fetchWithAuth(`${domain}/v1/courses/${courseUUID}/modules/${moduleUUID}/excersizes/${codeUUID}/multiple_choice`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const handled = await handleJSONResponse(resp);
  return handled;
}

export async function submitInformationalExercise(courseUUID, moduleUUID, codeUUID){
  const resp = await fetchWithAuth(`${domain}/v1/courses/${courseUUID}/modules/${moduleUUID}/excersizes/${codeUUID}/informational`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const handled = await handleJSONResponse(resp);
  return handled;
}

export function isLoggedIn(){
  try {
    let token = localStorage.getItem(jwtKey);
    let decodedToken = decodeJWT(token);
    return decodedToken.exp < Date();
  } catch (err){
    return false;
  }
}

async function fetchWithAuth(url, params){
  if (!isLoggedIn()){
    // redirect to login screen
    return;
  }
  let token = localStorage.getItem(jwtKey);
  let decodedToken = decodeJWT(token);
  if (decodedToken.exp < Date() + 600000){
    refreshToken();
  }

  params.headers['Authorization'] = `Bearer ${token}`;
  return await fetch(url, params);
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
  
async function handleJSONResponse(response) {
  const json = await response.json();
  if (typeof json.error !== 'undefined') {
    throw json.error;
  } else if (!response.ok) {
    throw 'Unknown error occured';
  }
  return json;
}

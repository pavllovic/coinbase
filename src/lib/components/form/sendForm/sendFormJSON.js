async function sendFormJSON(form, data) {
  const objData = Object.fromEntries(data);
  // const url = form.getAttribute('action');
  const url = 'https://echo.htmlacademy.ru';
  const method = form.getAttribute('method');

  const options = {
    method: method || 'POST',
    credentials: 'same-origin',
    // mode: 'no-cors',
    body: JSON.stringify(objData),
    headers: {
      // 'Content-Type': 'text/plain',
      // 'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': '*',
    },
  };

  if(this.controller) {
    options.signal = this.controller.signal;
  }

  try {
    const response = await fetch(url, options);
    if(!response.ok) throw new Error('server error');
    return response;
  } catch(err) {
    throw new Error(err.message);
  }
}

export default sendFormJSON;

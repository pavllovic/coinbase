async function sendForm(form, data) {
  const url = form.getAttribute('action');
  const method = form.getAttribute('method');

  const options = {
    method: method || 'POST',
    credentials: 'same-origin',
    // body: new URLSearchParams(data),
    body: data, //send FormData
    headers: {
      // 'Content-Type': 'multipart/form-data', //for file
      // 'Content-Type': 'text/plain',
      'Content-Type': 'application/x-www-form-urlencoded',
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
};

export default sendForm;

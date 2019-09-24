/**
 * verify if token of loggedin user is valid and retrieve his details
 * @param {string} token contain a JWT token
 */
export function verifyUsetToken (token) {
  const encodedURI = encodeURI(`http://localhost:3004/auth/verifytoken`)

  return fetch(encodedURI, {
    method: 'POST',
    headers: {
      'Authorization': `JWT ${token}`,
    }
  })
    .then((data) => data.json())
    .then(res => res)
    .catch((error) => {
      console.warn('---------ERROR----------', error)
      return null
    });
}
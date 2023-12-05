function encrypt() {
  const message = document.getElementById('encryptMessage').value.toUpperCase();
  const rails = parseInt(document.getElementById('rails').value);

  if (!message || isNaN(rails) || rails <= 1) {
    alert('Please enter a valid message and number of rails.');
    return;
  }

  if (rails > message.length) {
    alert('Number of rails cannot be greater than the number of characters in the message.');
    return;
  }

  const encryptedMessage = railFenceEncrypt(message, rails);
  document.getElementById('encryptedResult').innerText = `Encrypted Message: ${encryptedMessage}`;

}

function decrypt() {
  const encryptedMessage = document.getElementById('decryptMessage').value.toUpperCase();
  const rails = parseInt(document.getElementById('railsDecrypt').value);

  if (!encryptedMessage || isNaN(rails) || rails <= 1) {
    alert('Please enter a valid encrypted message and number of rails.');
    return;
  }

  const decryptedMessage = railFenceDecrypt(encryptedMessage, rails);
  document.getElementById('decryptedResult').innerText = `Decrypted Message: ${decryptedMessage}`;
}

function railFenceEncrypt(message, rails) {
  const matrix = Array.from({ length: rails }, () => []);

  let rail = 0;
  let direction = 1;

  for (const char of message) {
    if (char !== ' ') {
      matrix[rail].push(char);
    }

    if (rail === 0) {
      direction = 1;
    } else if (rail === rails - 1) {
      direction = -1;
    }

    rail += direction;
  }

  return matrix.flat().join('');
}

function railFenceDecrypt(encryptedMessage, rails) {
  const matrix = Array.from({ length: rails }, () => []);

  let index = 0;
  for (let row = 0; row < rails; row++) {
    for (let col = 0; col < encryptedMessage.length; col++) {
      if ((col % (2 * (rails - 1)) === row || col % (2 * (rails - 1)) === (2 * (rails - 1) - row)) && index < encryptedMessage.length) {
        matrix[row].push(encryptedMessage[index]);
        index++;
      } else {
        matrix[row].push(' ');
      }
    }
  }

  let decryptedMessage = '';
  for (let col = 0; col < encryptedMessage.length; col++) {
    for (let row = 0; row < rails; row++) {
      if (matrix[row][col] !== ' ') {
        decryptedMessage += matrix[row][col];
      }
    }
  }

  return decryptedMessage;
}

function railFencePattern(length, rails) {
  const pattern = Array(rails).fill(0);
  let rail = 0;
  let direction = 1;

  for (let i = 0; i < length; i++) {
    pattern[rail]++;
    if (rail === 0) {
      direction = 1;
    } else if (rail === rails - 1) {
      direction = -1;
    }
    rail += direction;
  }

  return pattern;
}
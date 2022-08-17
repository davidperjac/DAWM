const jsonwebtoken = require('jsonwebtoken');

const tokenDecode = (token) => {
	try {
		const tokenDecoded = jsonwebtoken.verify(token, process.env.JWT_KEY);
		console.log(tokenDecoded);
		return tokenDecoded;
	} catch {
		return false;
	}
};

module.exports = tokenDecode;

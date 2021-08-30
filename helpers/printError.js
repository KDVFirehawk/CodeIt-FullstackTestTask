/**
 *
 * @param {object} error
 * @param {string} whereFromError =>
 * 	=> class or function where u use this function printError =>
 * 	=> uses for more faster understanding where error happens
 * @returns nothing
 *
 * function created for useful error prints
 */

function printError(error, whereFromError = 'Error: ') {
	if (error.type) {
		return console.log(`\n${whereFromError} => ${JSON.stringify(error)}`);
	}

	console.log(`\n${whereFromError} => ${error}`);
	console.log(error);
}

export default printError;

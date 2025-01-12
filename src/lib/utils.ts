/* utility functions to be used across project */

/*
	Function is used to convert an array of numbers into a
	string that can be used on the next image sizes attribute.
	Values are provided in the order of [mobile, tablet, desktop].
	For example: [100, 50, 25] will become:
	(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw.

	@param {number[]} data - An array of numbers representing image sizes.
	@return {string} A formatted string for image sizes.
*/
export const createImageSrcSizes = (data: number[]) => {
	let string = ``;
	const bps = [`(max-width: 768px)`, `(max-width: 1200px)`, ``];

	if (data.length === 0) {
		// no values have been supplied
		console.log(`no sizes have been provided`);
	} else if (data.length > 3) {
		// too many values have been supplied
		console.log(`to many sizes have been provied, please limit to 3`);
	} else {
		// get last index from array
		const lastIndex = data.length - 1;
		// loop over the array and prepend sizes info based on the array count
		for (let i = 0; i < data.length; i++) {
			// if is last index then we dont need bp data to be prepended
			if (i != lastIndex) {
				string += `${bps[i]} ` + data[i] + `vw, `;
			} else {
				string += data[i] + `vw`;
			}
		}

		return string;
	}
};

/*
 * Function used for calculating the aspect ratio of an image.
 * This comes in handy when trying to work with intrinsic images.
 *
 * @param {number} width - The width of the image.
 * @param {number} height - The height of the image.
 * @return {string} The aspect ratio in the format "width/height".
 */
export const getImageRatio = (width: number, height: number) => {
	for (let num = height; num > 1; num--) {
		if (width % num == 0 && height % num == 0) {
			width = width / num;
			height = height / num;
		}
	}
	const ratio = width + `/` + height;
	return ratio;
};

/*
 * Function used for calculating a percentage fallback for intrinsic images.
 *
 * @param {number} width - The width of the image.
 * @param {number} height - The height of the image.
 * @return {string} The percentage fallback as a string.
 */
export const getRatioFallback = (width: number, height: number) => {
	return (height / width) * 100 + `%`;
};

/*
 * Function to extract size values from a URL query string.
 *
 * @param {string} url - The URL containing the size parameters.
 * @return {Object|null} An object containing width and height values, or null if not found.
 */
export const getSizeValuesFromString = (url: string) => {
	if (!url) {
		return null;
	}

	const urlSplit = url.split("?");

	if (urlSplit.length <= 0) {
		return null;
	}

	const urlParams = new URLSearchParams(urlSplit[1]);
	const widthValue = parseFloat(urlParams.get("width") ?? "0");
	const heightValue = parseFloat(urlParams.get("height") ?? "0");

	return {
		width: widthValue,
		height: heightValue
	};
};

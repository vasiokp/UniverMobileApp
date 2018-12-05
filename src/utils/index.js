export const groupBy = function (xs, key) {
	return xs.reduce((rv, x) => {
		(rv[x[key]] = rv[x[key]] || []).push(x)
		return rv
	}, {})
}

export const capitalize = function (str) {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

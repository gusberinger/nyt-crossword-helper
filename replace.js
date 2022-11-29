const BASE_URL = "https://www.nytimes.com/crosswords/game/daily"

const newUrl = () => {
	const date = new Date()
	const month = date.getMonth() + 1
	const year = date.getFullYear()
	const day = date.getDate()
	return `${BASE_URL}/${year}/${month}/${day}`
}

location.replace(newUrl())

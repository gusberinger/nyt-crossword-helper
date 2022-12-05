const togglePencilMode = () => {
	const disabledPencil = document.getElementsByClassName(
		"xwd__toolbar_icon--pencil"
	)
	const activePencil = document.getElementsByClassName(
		"xwd__toolbar_icon--pencil-active"
	)
	const pencil =
		disabledPencil.length == 0 ? activePencil[0] : disabledPencil[0]
	pencil.parentElement.click()
}

const fetchXWStats = async () => {
	const [year, month, day] = location.href.split("/").slice(6, 9).map(Number)
	const url = `https://xwstats.com/puzzles/${year}-${month}-${day}`
	try {
		const data = await fetch(url)
		const html = await data.text()
		const doc = new DOMParser().parseFromString(html, "text/html")
		const times = doc.getElementsByClassName("times")[0]
		const [difficulty, solveTime, medianSolver] = [...times.children].map(
			(element) => element.children[1].innerText
		)
		const statsText = `This puzzle is rated ${difficulty}. The median solver was ${medianSolver}, in ${solveTime}.`
		const statsDiv = document.createElement("div")
		statsDiv.innerText = statsText
		const bylineNode = document.getElementsByClassName(
			"xwd__details--byline"
		)[0]
		bylineNode.appendChild(statsDiv)
	} catch (error) {
		console.log("XW ERROR", error, error.response)
	}
}

const clearDialogue = () => {
	document.getElementsByClassName("pz-moment__button")[0].click()
}

setTimeout(clearDialogue, 200)
fetchXWStats()
window.addEventListener(
	"keydown",
	(event) => {
		if (event.defaultPrevented) {
			return
		}
		if (event.code == "CapsLock") {
			togglePencilMode()
		}
	},
	true
)

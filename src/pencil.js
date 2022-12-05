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

// auto clear the Ready To Get Started? dialogue if it is not sunday
setTimeout(() => {
	if (new Date().getDay() == 0) return
	document.getElementsByClassName("pz-moment__button")[0].click()
}, 200)

const route = async () => {
	const [year, month, day] = location.href.split("/").slice(6, 9).map(Number)
	const url = `https://xwstats.com/puzzles/${year}-${month}-${day}`
	// console.log()
	try {
		const data = await fetch(url)
		const html = await data.text()
		// const parser = new DOMParser()
		const doc = new DOMParser().parseFromString(html, "text/html")
		const times = doc.getElementsByClassName("times")[0]
		console.log("times: ", times)
		// const difficulty = times
		const [difficulty, solveTime, medianSolver] = [...times.children].map((element) => element.children[1].innerText)
		const statsText = `This puzzle is rated ${difficulty}. The median solver was ${medianSolver}, completing the puzzle in ${solveTime}`
		const statsDiv = document.createElement("div")
		statsDiv.innerText = statsText
		console.log("stats div: ", statsDiv)
		const bylineNode = document.getElementsByClassName("xwd__details--byline")[0]
		bylineNode.appendChild(statsDiv)
		console.log("XW DATA: ", [difficulty, solveTime, medianSolver])


	} catch (error) {
		console.log("XW ERROR", error, error.response)
	}
}

// setTimeout(route, 2000)

route()

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

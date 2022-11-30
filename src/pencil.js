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

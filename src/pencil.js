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

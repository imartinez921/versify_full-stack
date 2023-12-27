export const adjustDropdownPosition = (ref, dropdownPosition) => {
	// Get the viewport dimensions
	const viewportWidth =
		window.innerWidth || document.documentElement.clientWidth;
	const viewportHeight =
		window.innerHeight || document.documentElement.clientHeight;

	// Get the element's dimensions
	const eleWidth = ref.offsetWidth;
	const eleHeight = ref.offsetHeight;

	// Get the current position of the ele
	const eleRect = ref.getBoundingClientRect();
	let newLeft = eleRect.left;
	let newTop = eleRect.top;

	// Check and adjust for left boundary
	if (eleRect.left < 0) {
		newLeft = 0;
	}

	// Check and adjust for right boundary
	if (eleRect.right > viewportWidth) {
		newLeft = viewportWidth - eleWidth;
	}

	// Check and adjust for top boundary
	if ( eleRect.top < 0) {
		newTop = 0;
	}

	// Check and adjust for bottom boundary
	if (eleRect.top + 250 > viewportHeight) {
		newTop = viewportHeight - eleHeight - (.5 * eleHeight);
	}

	// Apply the new position
    debugger
    return newTop;
}

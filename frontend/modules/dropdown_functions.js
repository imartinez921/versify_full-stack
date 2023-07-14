export const freezeScroll = (parentDivIdStr) => {
    const parentDiv = document.getElementById(parentDivIdStr);
    if (parentDiv) {
        parentDiv.style.overflowY = 'hidden';
    }
};
export const permitScroll = (parentDivIdStr) => {
    const parentDiv = document.getElementById(parentDivIdStr);
    if (parentDiv) {
        parentDiv.style.overflowY = 'auto';
    }
};

export const isInViewport = (ele) => {
    const rect = ele.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
            (window.innerWidth || document.documentElement.clientWidth)
    );
};
// Explain isInViewport line by line
export const moveWithinViewport = (left, top, right, bottom) => {
    let nextLeft, nextTop, nextRight, nextBottom;
    if (top < 0) nextTop = Math.abs(top);
    if (left < 0) nextLeft = Math.abs(left);
    if (right > window.innerWidth) nextRight = window.innerWidth - right;
    if (bottom > window.innerHeight) nextBottom = window.innerHeight - bottom;
    return { nextLeft, nextTop, nextRight, nextBottom };
};

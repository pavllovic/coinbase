import { grid, gridMethod }from 'Lib/components/grid/grid.js';

const ReviewsGrid = grid;

ReviewsGrid.prototype = {
  constructor: ReviewsGrid,
  init: gridMethod.init,
  nextCell: gridMethod.nextCell,
  prevCell: gridMethod.prevCell,
  switchFocus: gridMethod.switchFocus,
  focusStart: gridMethod.focusStart,
  focusEnd: gridMethod.focusEnd,
  onKeydown: gridMethod.onKeydown,
  destroy: gridMethod.destroy,
  handleEvent: gridMethod.handleEvent,
};

export default ReviewsGrid;

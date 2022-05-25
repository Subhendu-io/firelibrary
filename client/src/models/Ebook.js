import PropTypes from 'prop-types';

const Post = PropTypes.shape({
  id: PropTypes.number,
  title: PropTypes.string,
  author: PropTypes.string,
  genre: PropTypes.string,
  review: PropTypes.number,
  favorite: PropTypes.number,
});
export default Post;

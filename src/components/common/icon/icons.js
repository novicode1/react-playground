const imagesContext = require.context('./images', false, /\.svg$/);
const icons = imagesContext
  .keys()
	.map(key => ({
		path: key,
		name: key
      .split('/')
      .pop()
      .replace(/\.svg$/, '')
	}))
.reduce((namesMap, image) => {
	namesMap[image.name] = imagesContext(image.path);
	return namesMap;
}, {});

export default icons;
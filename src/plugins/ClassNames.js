const setClass = (classes) => {
  if (!Array.isArray(classes)) {
    classes = [classes]
  }
  try {
    return classes
      .reduce((acc, item) => {
        if (Array.isArray(item)) {
          acc = [...acc, ...item]
        } else if (typeof item === 'object') {
          const keys = Object.keys(item).filter(key => (item[key]))
          acc = [...acc, ...keys]
        } else {
          acc = [...acc, item]
        }
        return acc
      }, [])
      .join(' ')
  }
  catch (e) {
    console.warn('Failed to perform classes conversion:', classes)
    return classes
  }
}
export default setClass;
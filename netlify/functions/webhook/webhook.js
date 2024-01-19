exports.handler = async (event, context) => {
  try {
    console.log(event.body)
    return {
      statusCode: 200
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
const responseAPI = (res, status, data, message) => {
  if (status === 200 || status === 201) {
    return res.status(status).json({ success: true, data, message });
  }

  return res.status(status).json({ success: false, data, message });
}

const FormateData = (status, data, message) => {
  return { status, data, message }
}

export { responseAPI, FormateData };
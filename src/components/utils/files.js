const config = {
  app: "driver",
  baseUrl: "ec2-13-250-38-152.ap-southeast-1.compute.amazonaws.com",
  // baseUrl: "192.168.1.69",
  port: "3000",
  googleMapsApiKey: "AIzaSyDfy2OY2lWRhPV3SMDogt6MBuuKnNStLPE",
};
async function uploadImage(
  object: ?string,
  type: ?string,
  ownerId: ?string,
  uri: ?object
): Promise {
  let uriParts = uri.split(".");
  let fileType = uriParts[uriParts.length - 1];
  let formData = new FormData();
  formData.append("file", {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });
  try {
    let resp = await fetch(
      `http://${config.baseUrl}:3000/fileStorage/upload/${object}/${type}/${ownerId}`,
      {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      }
    );
    let respJson = await resp.json();
    return Promise.resolve(respJson);
  } catch (error) {
    return error;
  }
}

export { uploadImage };

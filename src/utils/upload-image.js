import cloudinary from "./cloudinary"

export const UploadImage = async (file, folder) => {

    const fileBuffer = await file.arrayBuffer();
  
    var mime = file.type; 
    var encoding = 'base64'; 
    var base64Data = Buffer.from(fileBuffer).toString('base64');
    var fileUri = 'data:' + mime + ';' + encoding + ',' + base64Data;

return new Promise(async (resolve, reject) => {

     await cloudinary.uploader.upload(fileUri, {
        invalidate: true,
        resource_type: 'auto',
        folder: folder,
    })
      .then((result) => {
        console.log(result);
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
});
}



export const DeleteImage = async (public_id) => {
    
    return new Promise(async (resolve, reject) => {
        try {
            const result = await cloudinary.uploader.destroy(public_id)
            return resolve(result)
        } catch (error) {
            reject(new Error(error.message))
        }
    })
}
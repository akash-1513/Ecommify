const {v2:cloudinary} = require('cloudinary');
const fs = require('fs')

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async(localFilePath) => {
    try {
        if(!localFilePath) return null
        console.log(localFilePath)
        const response = await cloudinary.uploader
        .upload(
            localFilePath, {
                resource_type: "auto"
            }
        )
        fs.unlinkSync(localFilePath)
        return response
    } catch(error) {
        fs.unlink(localFilePath)
        console.log("File Uploading error")
        throw error
    }
}

const deleteFromCloudinary = async (publicId) => {
    try {
        const response = await cloudinary.uploader.destroy(publicId, {
            resource_type: 'auto'
        })

        console.log(response)

        if(response.result === "ok") {
            return true
        } else {
            return false
        }
    } catch(error) {
        console.log("File Deletion Error");
    }
} 

module.exports = {uploadOnCloudinary, deleteFromCloudinary}
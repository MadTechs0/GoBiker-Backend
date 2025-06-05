const { PutObjectCommand, S3Client, GetObjectCommand, HeadObjectCommand} = require("@aws-sdk/client-s3");
const {
  getSignedUrl,
  S3RequestPresigner,
} = require( "@aws-sdk/s3-request-presigner");
const getPreSignedUrl = async(key, contentId, command) =>{    
    try{ 
        const client = new S3Client({ region:process.env.AWS_REGION});

        if(command == 'get'){
            try{
                const headCommand = new HeadObjectCommand({
                    Bucket: process.env.AWS_BUCKET_NAME, Key: `${key}/${contentId}`
                });
                await client.send(headCommand);
            }catch (error) {
                if (error.name === 'NotFound') {
                    return null;
                }
                throw error;
            }
            command = new GetObjectCommand({ Bucket: process.env.AWS_BUCKET_NAME, Key: `${key}/${contentId}` });
        }
        if(command == 'put'){
            command = new PutObjectCommand({ Bucket: process.env.AWS_BUCKET_NAME, Key: `${key}/${contentId}` });
        }
        const url = getSignedUrl(client, command, { expiresIn: 3600 });
        return url;
        
    }catch(err){
        console.error('Error generating pre-signed URL:', err);
        return err;
    }
}

module.exports = {
    getPreSignedUrl,
}
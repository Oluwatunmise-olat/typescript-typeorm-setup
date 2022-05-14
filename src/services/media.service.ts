import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";

const mediaSpaceUrl = new aws.Endpoint(process.env.AWS_SPACE_ENDPOINT!);
const s3 = new aws.S3({ endpoint: mediaSpaceUrl });

class MediaStorage {
  upload() {
    return multer({
      storage: multerS3({
        s3,
        bucket: process.env.SPACE_NAME!,
        acl: "public-read",
        key: (req, file, cb) => {
          // @ts-ignore
          // TODO:: perform structured uploads
          cb(null, `posts/${file.originalname}`);
        },
      }),
    }).single("media");
  }
}

export default new MediaStorage();

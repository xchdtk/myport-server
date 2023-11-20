import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

AWS.config.update({
  region: 'ap-northeast-2',
  credentials: {
    accessKeyId: 'AKIA6DXMEH6J5FO32FEC',
    secretAccessKey: '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',
  },
});

@Injectable()
export class S3Service {
  async uploadS3File(file: Express.Multer.File, key: string) {
    const upload = await new AWS.S3()
      .putObject({
        Key: key,
        Body: file.buffer,
        Bucket: 'folio-s3/team_images',
      })
      .promise();
  }
}

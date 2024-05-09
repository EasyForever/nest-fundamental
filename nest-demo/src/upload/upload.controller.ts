import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { join } from 'path';
import { zip } from 'compressing';
import { createReadStream } from 'fs';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return { code: 200, message: '上传成功~' };
  }

  @Get('export')
  download(@Res() res: Response) {
    console.log(__dirname);
    res.download(join(__dirname, '../files/1715243808901.png'));
  }

  @Get('stream')
  async down(@Res() res: Response) {
    const url = join(__dirname, '../files/1715243808901.png');
    const tarStream = new zip.Stream();
    await tarStream.addEntry(url);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', 'attachment; filename=xiaoming');

    tarStream.pipe(res);
  }

  @Get('download')
  downloadFile(@Res() res: Response) {
    const file = createReadStream(join(__dirname, '../files/1715246721382.docx'));

    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', 'attachment; filename=xiaoming');

    file.pipe(res);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadService.remove(+id);
  }
}

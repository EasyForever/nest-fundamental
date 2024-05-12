import { Injectable } from '@nestjs/common';
import { CreateSpiderDto } from './dto/create-spider.dto';
import { UpdateSpiderDto } from './dto/update-spider.dto';
import axios from 'axios';
import * as cheerido from 'cheerio';
// import path from 'path';
import * as path from 'path';
import { createWriteStream } from 'fs';

@Injectable()
export class SpiderService {
  create(createSpiderDto: CreateSpiderDto) {
    return 'This action adds a new spider';
  }

  async findAll() {
    let page = 1;
    const limit = 2;
    const urls: string[] = [];

    const getCosplay = async () => {
      const res = await axios.get('https://www.cosplay8.com/list/neicos/' + page);
      // console.log(res.data);

      const $ = cheerido.load(res.data);

      const pageBtn = $('.pagination .page-item').find('.page-link');
      const pageArr = pageBtn
        .map(function () {
          return $(this).text();
        })
        .toArray();

      $('.container .row .col a img').each(function () {
        urls.push($(this).attr('src').split('!')[0]);
      });

      console.log(page, pageArr);

      if (pageArr.includes('下一页') && page < limit) {
        page++;
        await getCosplay();
      }
    };

    await getCosplay();

    console.log(urls);

    this.writeFiles(urls);

    return `cos`;
  }

  writeFiles(urls: string[]) {
    urls.forEach(async (url, index) => {
      const buffer = await axios.get(url, { responseType: 'arraybuffer' });
      const fileName = `${Date.now()}-${index}.jpg`;
      const ws = createWriteStream(path.join(__dirname, '../files', fileName));
      ws.write(buffer.data);
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} spider`;
  }

  update(id: number, updateSpiderDto: UpdateSpiderDto) {
    return `This action updates a #${id} spider`;
  }

  remove(id: number) {
    return `This action removes a #${id} spider`;
  }
}

import superagent from "superagent"
require("superagent-charset")(superagent);
import cheerio from "cheerio"
import path from 'path'
import fs from 'fs'


interface dataArr {
  title: string,
  des: string,
  publish: string,
  time: number
}
class Reptile {
  // 抓取的 url
  private url = "https://www.thepaper.cn/channel_90077";
  private filePath = path.resolve(__dirname, './data/mock.json')

  // 请求 url 获取内容
  async getHtml() {
    const result = await superagent.get(this.url);
    return result.text;
  }

  // 通过传入的 html 过滤到想要的节点
  getJsonInfo(html: string) {
    const $ = cheerio.load(html);
    const item = $(".newsbox").find(".news_li");
    const dataJson: dataArr[] = [];
    item.map((index, ele) => {
      const title = $(ele)
        .find("p")
        .text();
      const describe = $(ele)
        .find("a")
        .text();
      const publishOrg = $(ele)
        .find(".pdtt_trbs")
        .find("a")
        .text();
      dataJson.push({
        title: title.trim(),
        des: describe.trim(),
        publish: publishOrg.trim(),
        time: new Date().getTime()
      });
    });
    return dataJson;
  }

  // 存入到目录 (判断： 当前目录有没有)
  getNewContent(dataJson: dataArr[]) {
    let fileContent = {}
    if (fs.existsSync(this.filePath)){
      console.log('---------')
      fileContent = JSON.parse(fs.readFileSync(this.filePath, "utf-8"));
    }
    return dataJson
  }

  // 写入内容
  writeFile(data: dataArr[]){
    fs.writeFileSync(this.filePath, JSON.stringify(data))
  }

  async init() {
    const html = await this.getHtml();
    const jsonInfo = this.getJsonInfo(html);
    const fileContent = this.getNewContent(jsonInfo);
    this.writeFile(fileContent);
  }

  constructor() {
    this.init();
  }
}

new Reptile()
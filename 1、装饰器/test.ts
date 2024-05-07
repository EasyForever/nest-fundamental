import axios from 'axios'

const Get = (url: string) => {
  return (target: any, key: string | symbol, descriptor: PropertyDescriptor) => {
    console.log(target, key, descriptor)

    const fn = descriptor.value
    axios
      .get(url)
      .then((res) => {
        fn({ data: res, status: 200, success: true })
      })
      .catch((err) => {
        fn({ err, status: 500, success: false })
      })
  }
}

class Controller {
  constructor() {}

  @Get('https://api.apiopen.top/api/getHaokanVideo?page=1&size=10')
  getList(res: any) {
    console.log(res)
  }
}

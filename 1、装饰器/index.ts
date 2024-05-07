const doc: ClassDecorator = (target: any) => {
  console.log(target)
  target.prototype.name = '小明'
}

const propDoc: PropertyDecorator = (target: any, key: string | symbol) => {
  console.log(target, key)
}

const funDoc: MethodDecorator = (target: any, key: string | symbol, descriptor: any) => {
  console.log(target, key, descriptor)
}

@doc
class Xiaoming {
  @propDoc
  name: string

  constructor(name: string) {
    this.name = name
  }

  @funDoc
  getName() {
    return this.name
  }
}

const xiaoming: any = new Xiaoming('xiaoming')

console.log(xiaoming.name)

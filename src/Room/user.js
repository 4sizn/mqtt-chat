export default class User {
  constructor(options) {
    this._id = options.id
    this._name = options.name
    this._parent = this._room = options.parent
  }

  send(msg, to) {
    let obj = {
      sender: this._id,
      msg: msg,
      time : new Date()
    }

    //if send arguments[1] not allowed, send to broadcast
    if (arguments.length > 1) {
     obj =Object.assign({}, obj, { to: to })
    }
    this._parent.send(obj)
  }

  join(room) {
    console.log('join')
    this._parent = this._room = room
    this._parent.join(this);
  }
}
import EventEmitter from 'event-emitter'
import { debug } from 'util';

export default class Room {
  constructor(relay, roomid) {
    this._emitter = new EventEmitter();
    this._client = relay
    this._peers = []
    this._roomid = roomid

    this._listen();
  }

  emit(ev, cb) {
    this._emitter.emit(ev, cb)
  }

  on(ev, cb) {
    this._emitter.on(ev, cb)
  }

  send(opt) {
    if (opt.to) {
      this._client.send('msg', opt, opt.to)
    } else {
      this._client.send('msg', opt)
    }
  }

  _listen() {
    console.log('room maked!!')

    this._client.on('msg', res => {
      this.emit('msg', res)
    });
  }

  join(user) {
    const usr = user
    this._peers.push(usr)

    this._emitter.emit('join', usr)
    this._client._listen(usr._id)
  }
}
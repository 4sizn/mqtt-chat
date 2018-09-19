import EventEmitter from 'event-emitter';

export default class Mqtthelper {
  constructor({ mqtt, topic }) {
    this._emitter = new EventEmitter()
    this._mqtt = mqtt
    this._topic = topic
    this._listen()
  }

  _listen(addtopic) {
    let topic = this._topic
    if (addtopic) {
      topic += '/' + addtopic
    }

    this._mqtt.subscribe(topic).on(message => {
      const evt = message.json
      if (!evt) return;

      this._emitter.emit(evt.name, evt.data)
    })
  }

  on(name, fn) {
    this._emitter.on(name, fn)
  }

  send(name, data, addtopic) {
    console.log(data);
    let topic = this._topic;

    if(addtopic){
      topic += '/' + addtopic
      debugger
    }

    if (this._mqtt.isConnected()) this._mqtt.send(topic, { name, data })
  }
}
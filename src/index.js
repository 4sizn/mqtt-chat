import { connect } from 'rsup-mqtt'
import MqttInterface from './MQTT/index'
import Room from './Room'
import Peer from './Room/user'
import nanoid from 'nanoid'

// css-loader must be remove before make react env
import '../css/style.css'
import { debug } from 'util';

(async () => {
  window.__ENV__ = { apiServer: "https://api.mobizen.tv" }

  const button = document.getElementById('send');
  const mqtt = await connect({ host: 'test.mosquitto.org', port: 8080 })
  const network = new MqttInterface({ mqtt, topic: '/mobizen-rtc' })
  const room = new Room(network, '/roomname')
  const logs = document.getElementsByClassName('logs')[0];
  const roomNameEl = document.getElementsByClassName('header__title')[0];

  window.addEventListener('keyup', (e) => {
    if (e.keyCode === 13)
      button.click();
  })

  button.addEventListener('click', () => {
    console.log('button El clicked')

    const textareaEl = document.querySelector('.textarea')
    const tottextEl = document.querySelector('#to');

    if (textareaEl.value == '') {
      console.log('textarea empty')
      return;
    }

    if (tottextEl.value) {
      debugger
      usr.send(textareaEl.value, tottextEl.value)
    }
    else {
      usr.send(textareaEl.value);
      textareaEl.value = ''
    }
  });

  room.on('join', res => {
    console.log(res._name + " joined in" + room._roomid)
  });

  // room 토픽에 특정 메세지가 오면 다 받는다.
  room.on('msg', res => {
    console.log('receive msg', res)

    const newlog = document.createElement('div')
    newlog.className = 'log'

    const usr = document.createElement('span')
    usr.className = 'log_usr'
    usr.innerHTML = res.sender

    usr.onclick = function (e) {
      e.stopPropagation()
      e.preventDefault();
      const toEl = document.querySelector('#to');
      toEl.value = usr.outerText
    }

    const msg = document.createElement('span')
    msg.className = 'log_msg'
    msg.innerHTML = res.msg

    const date = document.createElement('span')
    date.className = 'log_time'
    date.innerHTML = res.time

    newlog.appendChild(usr)
    newlog.appendChild(msg)
    newlog.appendChild(date)
    logs.appendChild(newlog);
  });
  // user join room
  // test / a lot of user (user[0] messge data / )

  let usr = new Peer({ id: nanoid(6), name: nanoid(6), parent: room });
  usr.join(room)

})()
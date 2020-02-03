/* global figma */
var operators = require('rxjs/operators')
var nanoid = require('nanoid/non-secure')
var rx = require('rxjs')

var $subject = new rx.Subject()

var subscribeOnMessages = function (message) {
  $subject.next(message)
}

var messagePromise = function (value) {
  var id = nanoid()
  var $responseMessage = $subject.pipe(
    operators.filter(function (message) { return message.id === id }),
    operators.map(function (message) { return message.value })
  )
  figma.ui.postMessage({ value: value, id: id })

  return new Promise(function (resolve) {
    $responseMessage.subscribe(resolve)
  })
}

module.exports = {
  subscribeOnMessages: subscribeOnMessages,
  messagePromise: messagePromise
}

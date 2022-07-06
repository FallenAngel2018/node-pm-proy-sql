exports.success = function(req, res, data, message) {
    res.status(200).send({ error:'', body:data, message:message })
}

exports.error = function(req, res, message) {
    res.status(500).send({ error:message, body:'' })
}

exports.success_message = function() {
    return "Operación realizada con éxito"
}
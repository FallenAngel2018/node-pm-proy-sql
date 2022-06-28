exports.success = function(req, res, message) {
    res.status(200).send({ error:'', body:message })
}

exports.error = function(req, res, message) {
    res.status(500).send({ error:message, body:'' })
}
const errHandler = (err,req,res,next) => {
    let status = err.status;
    if([!status || status > 500 || status < 200].includes(status)) status = 500;
    return res.send({
        message : err.message ?? err.stack ,
        error : err.title ?? err.name ?? err.type,
        statusCode : status
    })
}

const err404Handler = (req,res,next) => {
    return res.status(404).send({
        message : ".صفحه مورد نظر یافت نشد",
        error : "Not Found",
        statusCode : 404

    })
}

module.exports = {
    errHandler,
    err404Handler
}
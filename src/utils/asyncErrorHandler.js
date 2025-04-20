import superstruct from 'superstruct';

export function asyncErrorHandler(handler) {
    return async function (req, res) {
        try {
            await handler(req, res);
        } catch (e) {
            handleException(e, res);
        }
    };
}

function handleException(e, res) {
    if (e instanceof superstruct.StructError) {
        return res.status(400).send({
            name: 'BadRequest',
            message: 'Validation failed: ' + e.message,
        });
    }

    // Unknown Error 처리
    res.status(500).send({
        name: 'InternalServerError',
        message: 'Internal server error: ' + e.message,
    });
}

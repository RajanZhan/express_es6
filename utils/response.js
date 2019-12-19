class respose {
    success(data)
    {
        return {
            code:200,
            data,
        }
    }
    
    deny(msg)
    {
        return {
            code:401,
            msg,
        }
    }

    error(msg)
    {
        return {
            code:500,
            msg,
        }
    }


}
module.exports = new  respose();
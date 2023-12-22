const setAccessTokenCookie = (res, accessToken) => {
      res.cookie('accessToken', accessToken, {
            maxAge: 15 * 60 * 1000, //15 minutes
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });
}


const setRefreshTokenCookie = (res, refreshToken) => {
    res.cookie('refreshToken', refreshToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000, //7days
        httpOnly: true,
        secure: true,
        sameSite: 'none',
    });
}

module.exports = {
    setAccessTokenCookie,
    setRefreshTokenCookie
}
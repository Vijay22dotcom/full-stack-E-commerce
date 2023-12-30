const sendjwt=(user,statusCode,res)=>{

    const token =user.getJWTToken()
   

    // OPTION FOR COOKIES

    const option ={
        expires: new Date(
            Date.now() + process.env.JWT_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly:true,
        
    }
    

    res.status(statusCode).cookie("token",token,option).json({
        success:true,
        user,
        token
    })
 
}

module.exports=sendjwt
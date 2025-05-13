const asyncHandler = (requestHandler) =>{
    (req,res,next)=>{
        Promise.resolve().catch((err)=>next(err)).
        catch((err)=> next(err))
    }
}




export {asyncHandler}

